import React from "react";
import SearchStudent from "./SearchStudent";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";

const StudentManagement = () => {
    return (
        <div className="container">
            <h1 className="text-center my-3">Student Management</h1>
            <StudentForm />
            <SearchStudent />
            <StudentList />
        </div>
    );
};

export default StudentManagement;
