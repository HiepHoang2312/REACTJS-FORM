import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    students: [],
    isLoading: false,
    error: null,
    selectedStudent: {
        id: "",
        name: "",
        phone: "",
        email: "",
    },
    searchValue:"",
};

export const fetchStudent = createAsyncThunk(
    "student/fetchStudent",
    async (params,{getState}) => {
        console.log(getState().student);
        try {
            const {searchValue}=getState().student;
            
            const { data } = await axios.get(
                `https://62ae8ccbb735b6d16a43b5a6.mockapi.io/student`,
                {
                    params: {
                        name: searchValue,
                    },
                }
                );
                console.log(params);
            return { students: data };
        } catch (error) {
            throw error.response.data;
        }

    },
);

export const addStudentAPI = createAsyncThunk(
    "student/addStudent",
    async (student, { dispatch }) => {
        try {
            await axios.post(
                "https://62ae8ccbb735b6d16a43b5a6.mockapi.io/student",
                student,
            );
            dispatch(fetchStudent());
        } catch (error) {
            throw error.response.data;
        }
    },
);

export const deleteStudentAPI = createAsyncThunk(
    "student/deleteStudent",
    async (studentId, { dispatch }) => {
        try {
            await axios.delete(
                `https://62ae8ccbb735b6d16a43b5a6.mockapi.io/student/${studentId}`,
            );
            dispatch(fetchStudent());
        } catch (error) {
            throw error.response.data;
        }
    },
);

export const fetchStudentDetail = createAsyncThunk(
    "student/fetchStudentDetail",
    async (studentId) => {
        try {
            const { data } = await axios.get(
                `https://62ae8ccbb735b6d16a43b5a6.mockapi.io/student/${studentId}`,
            );
            return { selectedStudent: data };
        } catch (error) {
            throw error.response.data;
        }
    },
);

export const updateStudentAPI = createAsyncThunk(
    "student/updateStudent",
    async (student, { dispatch }) => {
        try {
            await axios.put(
                `https://62ae8ccbb735b6d16a43b5a6.mockapi.io/student/${student.id}`,
                student,
            );
            dispatch(fetchStudent());
        } catch (error) {
            throw error.response.data;
        }
    },
);

const studentReducer = createSlice({
    name: "student",
    initialState: initialState,
    reducers: {
        addStudent: (state, { payload }) => {
            state.students.push(payload);
        },
        changeSearch:(state,{ payload })=>{
            state.searchValue=payload;
        }
        
    },
    extraReducers: {
        [fetchStudent.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchStudent.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.students = payload.students;
        },
        [fetchStudent.rejected]: (state, { error }) => {
            state.isLoading = false;
            state.error = error.message;
        },
        [addStudentAPI.rejected]: (state, { error }) => {
            state.isLoading = false;
            state.error = error.message;
        },
        [deleteStudentAPI.rejected]: (state, { error }) => {
            state.isLoading = false;
            state.error = error.message;
        },
        [fetchStudentDetail.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.selectedStudent = payload.selectedStudent;
        },
        
    },
    
});

export const {changeSearch}= studentReducer.actions;

export default studentReducer.reducer;
