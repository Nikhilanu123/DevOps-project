from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

COURSES_FILE = 'courses.json'

def load_courses():
    if os.path.exists(COURSES_FILE):
        with open(COURSES_FILE, 'r') as f:
            return json.load(f)
    return []

def save_courses(courses):
    with open(COURSES_FILE, 'w') as f:
        json.dump(courses, f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/courses', methods=['GET'])
def get_courses():
    courses = load_courses()
    return jsonify(courses)

@app.route('/api/courses', methods=['POST'])
def add_course():
    data = request.get_json()
    title = data.get('title')
    instructor = data.get('instructor')
    description = data.get('description')

    if not title or not instructor or not description:
        return jsonify({'error': 'All fields are required'}), 400

    courses = load_courses()
    course_id = len(courses) + 1
    new_course = {
        'id': course_id,
        'title': title,
        'instructor': instructor,
        'description': description
    }
    courses.append(new_course)
    save_courses(courses)
    return jsonify(new_course), 201

@app.route('/api/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    courses = load_courses()
    course = next((c for c in courses if c['id'] == course_id), None)
    if not course:
        return jsonify({'error': 'Course not found'}), 404

    courses.remove(course)
    save_courses(courses)
    return jsonify({'message': 'Course deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
