from django.urls import path
from .views import get_progress, home , get_courses

urlpatterns = [
    path("", home, name="home"),  # Base URL response
    path("progress/", get_progress, name="get_progress"),
    path("Courses/", get_courses, name = "get_courses"),
]
