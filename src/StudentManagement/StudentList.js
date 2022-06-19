import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteStudentAPI,
    fetchStudent,
    fetchStudentDetail,
} from "../reducers/studentReducer";

const StudentList = () => {
    const { students,searchValue } = useSelector((state) => state.student);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchStudent());
    }, []);
    useEffect(() => {
        dispatch(fetchStudent());
    }, [searchValue]);

    const handleDelete = (studentId) => {
        dispatch(deleteStudentAPI(studentId));
    };
    const selectStudent = (studentId) => {
        dispatch(fetchStudentDetail(studentId));
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Mã SV</th>
                    <th>Họ tên</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => {
                    return (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.phone}</td>
                            <td>{student.email}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => selectStudent(student.id)}
                                    className="btn btn-success"
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default StudentList;
