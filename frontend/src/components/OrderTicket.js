import React,{useState,useEffect,Component} from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Input from './Input';
import { useNavigate } from "react-router-dom";
import { ordertikcetFields } from "../constants/formFields"
import FormAction from "./FormAction";
import AsyncSelect from 'react-select/async';

const fields=ordertikcetFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function OrderTicket(){
  const [name, setName] = useState('');
  const [userid, setUserID] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();

    const refreshPage = () => {
      navigate(0);
    }
    
    useEffect(() => {
        refreshToken();
    },[]);

    const refreshToken = async () => {
        try {
            const respone = await axios.get('http://localhost:5000/token/');
            setToken(respone.data.accessToken);
            const decode = jwt_decode(respone.data.accessToken);
            setName(decode.name);
            setUserID(decode._id);
            setExpire(decode.exp);
        } catch (error) {
          if(error){
            navigate("/login"); 
            refreshPage();
          }
        }
    }

  const axiosJWT = axios.create();  

  axiosJWT.interceptors.request.use(async(config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()){
      const respone = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Bearer ${respone.data.accessToken}`;
      setToken(respone.data.accessToken);
      const decode = jwt_decode(respone.data.accessToken);
      setName(decode.name);
      setUserID(decode._id);
      setExpire(decode.exp);
    }
    return(config);
  }, (error) => {
    return Promise.reject(error);
  });

  const getEvents = async() => {
    const respone = await axiosJWT.get('http://localhost:5000/events',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    const events = respone.data;
    return events
  }

  const getPaymentMethod = async() => {
    const respone = await axiosJWT.get('http://localhost:5000/payment-methods',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    const payment_methods = respone.data;
    return payment_methods
  }

  const [orderticketState,setorderticketState]=useState(fieldsState);

  const handleChange=(e)=>{
      setorderticketState({...orderticketState,[e.target.id]:e.target.value})
  }

  const [items, setItems] = useState([]);
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  
  // handle selection
  const handleChangeSelect = value => {
    setSelectedValue(value);
  }  

  // handle input change event
  const handleInputChange = value => {
    setValue(value);
  };  

  const [msg, setMsg] = useState('');
  
  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
          await axiosJWT.post('http://localhost:5000/tickets',{
            headers:{
              Authorization: `Bearer ${token}`
            },
            user_id:userid,
            voucher_id:orderticketState.voucher_id,
            event_id:orderticketState.event_id,
            payment_method_id:orderticketState.payment_method_id,
          });
          navigate("/");
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
    <div class="justify-center items-center mx-auto w-3/4 sm:w-1/3">
    <p class="item-center justify-center mx-auto bg-red-600 text-white text-center">{msg}</p>

    <div className="mt-5">
        <AsyncSelect
          cacheOptions
          defaultOptions
          value={orderticketState['event_id']}
          getOptionLabel={e => e.name}
          getOptionValue={e => e.id}
          loadOptions={getEvents}
          onChange={handleChangeSelect}
          onInputChange={handleInputChange}    
          placeholder={'Choose Event'}
          isRequired={true}
        />
    </div>

    <div className="mt-5">
        <AsyncSelect
          cacheOptions
          defaultOptions
          value={orderticketState['payment_method_id']}
          getOptionLabel={e => e.name}
          getOptionValue={e => e.id}
          loadOptions={getPaymentMethod}
          onChange={handleChangeSelect}
          onInputChange={handleInputChange}    
          placeholder={'Choose Payment Method'}
          isRequired={true}
        />
    </div>

    {
            fields.map(field=>
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={orderticketState[field.id]}
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

      <FormAction handleSubmit={handleSubmit} text="Order Ticket" />
    </div>
  </form>
  )
}