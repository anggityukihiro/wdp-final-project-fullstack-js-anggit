import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }
    const [msg, setMsg] = useState('');
    
    const navigate = useNavigate();

    const refreshPage = () => {
      navigate(0);
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/user/login',{
              email:loginState.email,
              password:loginState.password
            });
            navigate("/order-ticket");
            refreshPage();
          } catch (error) {
            if(error.response){
              setMsg(error.response.data.message);
            }
          }
       // authenticateUser();

    //Handle Login API Integration here
    //const authenticateUser = () =>{

    }

    return(
        <form className="mt-8" onSubmit={handleSubmit}>
        <div class="justify-center items-center mx-auto w-3/4 sm:w-1/3 pb-10">
        <p class="item-center justify-center mx-auto bg-red-600 text-white text-center">{msg}</p>
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="Login"/>
        
        </div>

      </form>
    )
}