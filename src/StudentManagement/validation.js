const length = (name,val, min, max)=>{
    if(val.length < min || val.length > max){
        alert(`độ dài số ${name} không hợp lệ `)
       return false;
    }
    return true;
}
const pattern = (name,val, regex)=>{
    const valid = regex.test(val);
    if(!valid){
       alert(`${name} sai định dạng `);
        return false;
    }
   
    return true;
}
const require=(name,val)=>{
    if(!val)
    {
        alert(`Không được bỏ trống mục ${name}`);
        return false;
    }
    return true;   
}


export const validateName=(name,val,regex)=>{
    return require(name,val)&&pattern(name,val, regex);
}
export const validateEmail=(name,val,regex)=>{
    return require(name,val)&&pattern(name,val, regex);
}
export const validatePhone=(name,val,min,max,regex)=>{
    return require(name,val)&&length(name,val,min,max)&&pattern(name,val,regex);
}

