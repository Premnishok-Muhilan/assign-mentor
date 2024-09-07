API ENDPOINTS

1.Homepage
    GET https://assign-mentor-adq4.onrender.com/api/v1

2.Create mentor
    POST https://assign-mentor-adq4.onrender.com/api/v1/mentor/create-mentor

    sample:
        {
            "mentor_name":"Mentor 15"
        }

3.Create student
    POST https://assign-mentor-adq4.onrender.com/api/v1/student/create-student

    sample:
        {
            "student_name":"Student 5"
        }

4.Assign students to mentor
    POST https://assign-mentor-adq4.onrender.com/api/v1/mentor/:mentor_id/assign-students

    sample:
        { 
            "student_ids": ["66dc04d279c9fcbe64763e77"]
        }


5.Get students assigned to a mentor
    GET https://assign-mentor-adq4.onrender.com/api/v1/mentor/:mentor_id/get-students

6.Get previous mentor ids of a student
    GET https://assign-mentor-adq4.onrender.com/api/v1/student/:student_id/get-previous-mentor-ids

7.Update student's mentor
    PUT https://assign-mentor-adq4.onrender.com/api/v1/student/:student_id/update-mentor

    sample:
        {
            "mentor_id":"66dc04c879c9fcbe64763e75"
        }