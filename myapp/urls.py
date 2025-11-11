from django.urls import path 
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.signup, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('profile-editor/', views.profile_editor, name='profile_editor'),
    
    # Dashboard-prefixed portfolio URLs
    path("dashboard/portfolio/<str:username>/", views.portfolio, name="portfolio"),
    path("dashboard/api/portfolio/<str:username>/", views.portfolio_data, name="portfolio_data"),
    
    path('projects/', views.projects, name='projects'), 
    path("projects/api/", views.get_projects, name="get_projects"),
    path("projects/save/", views.save_project, name="save_project"),
    path("projects/delete/<int:project_id>/", views.delete_project, name="delete_project"),
]