import { useEffect, useState } from "react";
import axios from "axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState("123"); // Replace with actual user ID

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/Courses/")
    .then(response => {
      console.log("Fetched courses:", response.data); // Debugging
      setCourses(response.data);
    })
      .catch(error => console.error("Error fetching courses:", error));
  }, []);

  // Function to track video watch time and send it to the backend
  const handleVideoProgress = (courseId, event) => {
    const watchedMinutes = Math.floor(event.target.currentTime / 60); // Convert seconds to minutes

    axios.post("http://127.0.0.1:8000/api/update-progress/", {
      userId: userId, // Replace with actual logged-in user ID
      courseId: courseId,
      minutesWatched: watchedMinutes,
    })
    .catch(error => console.error("Error updating progress:", error));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-primary">Courses</h1>
      {courses.map((course) => (
        <div key={course.id} className="card p-3 mb-3">
          <h3>{course.title}</h3>
          <video
            controls
            onTimeUpdate={(e) => handleVideoProgress(course.id, e)}
          >
            <source src={`http://127.0.0.1:8000/media/${course.video}`} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
}
