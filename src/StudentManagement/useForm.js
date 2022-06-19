import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { changeSearch } from "../reducers/studentReducer";
import { useDispatch } from "react-redux";
import { validateName,validatePhone,validateEmail } from "./validation";
const useForm = (initialValue) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState(initialValue);
    const [searchValue,setsearchValue]=useState("");
    const handleSearch=()=>{
        dispatch(changeSearch(searchValue));
    }

    
    const handleChangeSearch=(evt)=>{
        setsearchValue(evt.target.value);
    }
    console.log(searchValue);
    const handleChange = (evt) => {
        const { value, name } = evt.target;
        setValues((values) => ({ ...values, [name]: value }));
    };
   
    const { selectedStudent } = useSelector((state) => state.student);

    useEffect(() => {
        setValues(selectedStudent);
    }, [selectedStudent]);

 
    const handleSubmit = (onSuccess, onError, onUpdate) => {
        // return về một function
        let isValid = true;
        const name=values.name;
        const email=values.email;
        const phonenumber=values.phone;
        const namevalidate=/^([A-z ]*)$/g;
        const emailvalidate=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const phonevalidate=/((09|03|07|08|05)+([0-9]{8})\b)/g;

        if (!selectedStudent.id) {
           
                
            return (evt) => {
                evt.preventDefault();
                // Sử lý validation
                // Trường hợp hợp lệ => gọi tới 1 callback onSuccess
                // Trường hợp không hợp lệ => gọi tới 1 callback onError
                // isValid&=require("Họ và tên",name)&&pattern("Họ và tên",name, namevalidate);
                // isValid&=require("email",email)&&pattern("email",email, emailvalidate);
                // isValid&=require("số điện thoại",phonenumber)&&length("số điện thoại",phonenumber,9,12);
                isValid&=validateName("Họ và tên",name,namevalidate);
                isValid&=validateEmail("email",email, emailvalidate);
                isValid&=validatePhone("số điện thoại",phonenumber,9,12,phonevalidate);
                
                if (isValid) {
                    onSuccess(values);
                    setValues({
                        id: "",
                        name: "",
                        phone: "",
                        email: "",
                    });
                } else {
                    onError();
                }
            };
        } else {
            return (evt) => {
                evt.preventDefault();
                
               /*  isValid&=require("Họ và tên",name)&&pattern("Họ và tên",name, namevalidate);
                isValid&=require("email",email)&&pattern("email",email, emailvalidate);
                isValid&=require("số điện thoại",phonenumber)&&length("số điện thoại",phonenumber,9,12); */
                isValid&=validateName("Họ và tên",name,namevalidate);
                isValid&=validateEmail("email",email, emailvalidate);
                isValid&=validatePhone("số điện thoại",phonenumber,9,12);
                
               
                // Sử lý validation
                // Trường hợp hợp lệ => gọi tới 1 callback onSuccess
                // Trường hợp không hợp lệ => gọi tới 1 callback onError
                if (isValid) {
                    onUpdate(values);
                    setValues({
                        id: "",
                        name: "",
                        phone: "",
                        email: "",
                    });
                } else {
                    onError();
                }
            };
        }
    };

    return { values, handleChange, handleSubmit,searchValue,handleSearch ,handleChangeSearch};
};

export default useForm;
