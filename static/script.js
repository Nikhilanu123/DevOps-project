document.addEventListener('DOMContentLoaded', function() {
    const courseForm = document.getElementById('course-form');
    const coursesContainer = document.getElementById('courses');

    function displayCourses() {
        fetch('/api/courses')
            .then(response => response.json())
            .then(courses => {
                coursesContainer.innerHTML = '';
                courses.forEach(course => {
                    const courseDiv = document.createElement('div');
                    courseDiv.className = 'course';
                    courseDiv.innerHTML = `
                        <h3>${course.title}</h3>
                        <p><strong>Instructor:</strong> ${course.instructor}</p>
                        <p>${course.description}</p>
                        <button onclick="deleteCourse(${course.id})">Delete</button>
                    `;
                    coursesContainer.appendChild(courseDiv);
                });
            })
            .catch(error => console.error('Error fetching courses:', error));
    }

    function addCourse(title, instructor, description) {
        fetch('/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, instructor, description }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                displayCourses();
            }
        })
        .catch(error => console.error('Error adding course:', error));
    }

    window.deleteCourse = function(courseId) {
        fetch(`/api/courses/${courseId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                displayCourses();
            }
        })
        .catch(error => console.error('Error deleting course:', error));
    };

    courseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('course-title').value;
        const instructor = document.getElementById('course-instructor').value;
        const description = document.getElementById('course-description').value;
        addCourse(title, instructor, description);
        courseForm.reset();
    });

    displayCourses();
});
