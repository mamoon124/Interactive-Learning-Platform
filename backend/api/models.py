from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=255)
    video = models.FileField(upload_to="videos/")  # Upload videos
    duration = models.IntegerField()  # Duration in minutes

    def __str__(self):
        return self.title
