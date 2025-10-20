from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse,  HttpResponseBadRequest
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from .models import Profile, Project
import json
# Create your views here.

def index(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, f"Welcome back, {user.username}!")
            return redirect('dashboard')
        else:
            messages.error(request, "Invalid username or password.")

    return render(request, "index.html")


def signup(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirmPassword")

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect("signup")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already taken.")
            return redirect("signup")

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect("signup")

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        # create profile for new user
        Profile.objects.create(user=user)

        login(request, user)
        messages.success(request, "Account created successfully! Welcome to DevShowcase.")
        return redirect("dashboard")

    return render(request, "signup.html")

def logout_view(request):
    logout(request)
    messages.info(request, "You have been logged out.")
    return redirect("index")

@login_required
def dashboard(request):
    profile, created = Profile.objects.get_or_create(user=request.user)
    context = {"profile": profile}
    return render(request, "dashboard.html", context)

@login_required
def profile_editor(request):
    profile, created = Profile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        profile.full_name = request.POST.get('name')
        profile.headline = request.POST.get('headline')
        profile.bio = request.POST.get('bio')
        profile.photo = request.POST.get('photo')
        profile.email = request.POST.get('email')
        profile.github = request.POST.get('github')
        profile.linkedin = request.POST.get('linkedin')
        profile.twitter = request.POST.get('twitter')
        profile.website = request.POST.get('website')
        profile.skills = request.POST.get('skills')
        profile.save()

        return JsonResponse({'success': True, 'message': 'Profile saved successfully!'})

    return render(request, 'profile-editor.html', {'profile': profile})


def portfolio(request, username):
    """Render the main portfolio page."""
    user = get_object_or_404(User, username=username)
    profile = get_object_or_404(Profile, user=user)
    return render(request, "portfolio.html", {"profile": profile})


def portfolio_data(request, username):
    """Return JSON profile + projects for frontend JS."""
    user = get_object_or_404(User, username=username)
    profile = get_object_or_404(Profile, user=user)
    projects = Project.objects.filter(user=user) 

    data = {
       "name": f"{user.first_name} {user.last_name}".strip() or user.username,
        "headline": profile.headline,
        "bio": profile.bio,
        "photo": profile.photo,
        "email": profile.email,
        "github": profile.github,
        "linkedin": profile.linkedin,
        "twitter": profile.twitter,
        "website": profile.website,
        "skills": profile.skills,
        "projects": [
            {
                "title": p.title,
                "description": p.description,
                "image": p.image,
                "github": p.github,
                "demo": p.demo,
            }
            for p in projects
        ],
    }
    return JsonResponse(data)


@login_required
def projects(request):
    """Render the projects management page."""
    return render(request, "projects.html")


@login_required
def get_projects(request):
    """Return all projects for the logged-in user."""
    projects = Project.objects.filter(user=request.user)
    return JsonResponse([p.to_dict() for p in projects], safe=False)



@login_required
def save_project(request):
    """Create or update a project via AJAX (JSON body)."""
    if request.method != "POST":
        return HttpResponseBadRequest("Invalid request method")

    try:
        # Parse JSON safely
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return HttpResponseBadRequest("Invalid JSON")

    title = data.get("title")
    description = data.get("description", "")
    image = data.get("image") or None
    github = data.get("github") or None
    demo = data.get("demo") or None
    project_id = data.get("id")

    if not title:
        return HttpResponseBadRequest("Title is required")

    # Update existing project
    if project_id:
        try:
            project = Project.objects.get(id=project_id, user=request.user)
        except Project.DoesNotExist:
            return HttpResponseBadRequest("Project not found")

        project.title = title
        project.description = description
        project.image = image
        project.github = github
        project.demo = demo
        project.save()
    else:
        project = Project.objects.create(
            user=request.user,
            title=title,
            description=description,
            image=image,
            github=github,
            demo=demo,
        )

    return JsonResponse({"success": True, "project": project.to_dict()})

@login_required
def delete_project(request, project_id):
    """Delete a project."""
    if request.method != "DELETE":
        return HttpResponseBadRequest("Invalid request method")

    try:
        project = Project.objects.get(id=project_id, user=request.user)
        project.delete()
        return JsonResponse({"success": True})
    except Project.DoesNotExist:
        return HttpResponseBadRequest("Project not found")







