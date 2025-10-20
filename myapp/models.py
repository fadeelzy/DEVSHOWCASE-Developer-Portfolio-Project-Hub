from django.db import models
from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=150, blank=True, null=True)
    headline = models.CharField(max_length=150, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    photo = models.URLField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    skills = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    demo = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"

    def to_dict(self):
        """Return a dictionary version of the project for JSON responses."""
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "image": self.image,
            "github": self.github,
            "demo": self.demo,
        }