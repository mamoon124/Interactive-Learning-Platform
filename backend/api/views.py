from .models import Course  # Import the Course model
from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def update_progress(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data.get("userId")
        course_id = data.get("courseId")
        minutes_watched = data.get("minutesWatched")

        # TODO: Save the progress to the database

        return JsonResponse({"message": "Progress updated!"})

    return JsonResponse({"error": "Invalid request"}, status=400)

def home(request):
    return HttpResponse("<h1>Welcome to the Backend API</h1><p>Go to /api/progress/ to see progress data.</p>")


def get_progress(request):
    # Example: Fetch progress data (in real case, get from database)
    progress_data = {"progress": 50}  # Assume the user has completed 70% of the course
    return JsonResponse(progress_data)
def get_courses(request):
    courses = Course.objects.all().values("id", "title", "video", "duration")
    return JsonResponse(list(courses), safe=False)
