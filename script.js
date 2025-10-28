document.addEventListener('DOMContentLoaded', function() {
    const courseForm = document.getElementById('course-form');
    const coursesContainer = document.getElementById('courses');
    let courses = JSON.parse(localStorage.getItem('courses')) || [];

    function displayCourses() {
        coursesContainer.innerHTML = '';
        courses.forEach((course, index) => {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'course';
            courseDiv.innerHTML = `
                <h3>${course.title}</h3>
                <p><strong>Instructor:</strong> ${course.instructor}</p>
                <p>${course.description}</p>
                <button onclick="deleteCourse(${index})">Delete</button>
            `;
            coursesContainer.appendChild(courseDiv);
        });
    }

    function addCourse(title, instructor, description) {
        courses.push({ title, instructor, description });
        localStorage.setItem('courses', JSON.stringify(courses));
        displayCourses();
    }

    window.deleteCourse = function(index) {
        courses.splice(index, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
        displayCourses();
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
