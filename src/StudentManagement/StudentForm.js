import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useForm from "./useForm";
import { addStudentAPI, updateStudentAPI } from "../reducers/studentReducer";

const StudentForm = () => {
    const dispatch = useDispatch();

    const { values, handleChange, handleSubmit } = useForm({
        id: "",
        name: "",
        phone: "",
        email: "",
    });

    const onSuccess = async (values, evt) => {
        await dispatch(addStudentAPI(values)).unwrap();
        alert("Submit Success");
    };
    
    const onError = () => {
        alert("Submit Error");
    };
    const onUpdate = async (values, evt) => {
        await dispatch(updateStudentAPI(values)).unwrap();
        alert("Submit Success");
    };

    return (
        <div>
            <div className="bg-secondary p-3">
                <h2 className="text-white">Thông tin sinh viên</h2>
            </div>
            <form onSubmit={handleSubmit(onSuccess, onError, onUpdate)}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="id">Mã SV</label>
                            <input
                                type="text"
                                name="id"
                                id="id"
                                value={values.id}
                                onChange={handleChange}
                                disabled
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                value={values.phone}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="name">Họ tên</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
