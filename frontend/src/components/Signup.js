import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    //console.log(signupState.username);  
    try {
      await axios.post('http://localhost:5000/user/register',{
        name:signupState.name,
        phone_number:signupState.phone_number,
        email:signupState.email,
        password:signupState.password,
        conf_password:signupState.conf_password
      });
      navigate("/login");
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.message);
      }
    }

    //createAccount()
  }

  //handle Signup API Integration here
  // const createAccount=()=>{

  // }

    return(
        <form className="mt-8" onSubmit={handleSubmit}>
        <div class="justify-center items-center mx-auto w-3/4 sm:w-1/3">
        <p class="item-center justify-center mx-auto bg-red-600 text-white text-center">{msg}</p>
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}