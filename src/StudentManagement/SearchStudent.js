import React from "react";
import useForm from "./useForm";

const SearchStudent = () => {
    const {searchValue,handleChangeSearch,handleSearch} =useForm();
    
    return (
        <div className="d-flex justify-content-end py-5 bg-light">
            <input type="text" className="form-control"
            value={searchValue}
            onChange={handleChangeSearch} />
            <button className="btn btn-success" onClick={handleSearch(searchValue)}>Search</button>
        </div>
    );
};

export default SearchStudent;
