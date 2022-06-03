import React,{useState,useEffect,Component} from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Input from './Input';
import { useNavigate } from "react-router-dom";
import { orderticketFields } from "../constants/formFields"
import FormAction from "./FormAction";
import AsyncSelect from 'react-select/async';

const fields=orderticketFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function OrderTicket(){
  const [name, setName] = useState('');
  const [userid, setUserID] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [ticket_id, setTicketID] = useState('');
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

  const axiosJWT2 = axios.create({
    headers: {'Authorization': 'Bearer '+token}
  });

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

  const [payment_method_id, setPaymentMethodID] = useState('');
  const [event_id, setEventID] = useState('');
  const [voucher_id, setVoucherID] = useState('');

  // handle selection
  const handleChangePaymentMethod = value => {
    setPaymentMethodID(value);
  }  

  // handle selection
  const handleChangeEvent = value => {
    setEventID(value);
  }  

  const getTicket = async() => {
    try {
      const respone = await axiosJWT.get('http://localhost:5000/tickets/'+userid,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      const ticket = respone.data;
      setTicketID(ticket.id_ticket);    
    } catch (error) {
      if(error){
			  //alert('Sudah pesan tiket');
          }      
    }
  }

  getTicket();

  if(ticket_id){    
    navigate("/detail-ticket"); 
    refreshPage();
  }

  const [msg, setMsg] = useState('');
  
  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
          await axiosJWT2.post('http://localhost:5000/tickets',{
            user_id:userid,
            event_id:event_id,
            payment_method_id:payment_method_id,
            voucher_id:voucher_id,
          });
          navigate("/detail-ticket");
          refreshPage();
        } catch (error) {
          if(error.response){
            setMsg(error.response.data.message);
          }
        }
  
  }

  // const handleCheck=async(e)=>{
  //   e.preventDefault();
  //   try {
  //       const respone = await axiosJWT.post('http://localhost:5000/voucher-verification',{
  //         headers:{
  //           Authorization: `Bearer ${token}`
  //         },
  //         voucher_id:orderticketState.voucher_id
  //       });

  //       const get_data_voucher = respone.data;
  //       console.log(get_data_voucher)

  //     } catch (error) {
  //       if(error.respone){
  //         setMsg(error.respone.data.message);
  //       }
  //     }

  // const respone = await axiosJWT.get('http://localhost:5000/payment-methods',{
  //   headers:{
  //     Authorization: `Bearer ${token}`
  //   }
  // });
  // const payment_methods = respone.data;
  // console.log(payment_methods);

//}


  return(
    <form className="mt-8" onSubmit={handleSubmit}>
    <div class="justify-center items-center mx-auto w-3/4 sm:w-1/3">
    <p class="item-center justify-center mx-auto bg-red-600 text-white text-center">{msg}</p>
    
    <div className="mt-5">
        <AsyncSelect
          cacheOptions
          defaultOptions
          value={event_id}
          getOptionLabel={e => e.name}
          getOptionValue={e => e._id}
          loadOptions={getEvents}
          onChange={handleChangeEvent}
          placeholder={'Choose Event'}
          isRequired={true}
        />
    </div>
    
    <div className="mt-5">
        <AsyncSelect
          cacheOptions
          defaultOptions
          value={payment_method_id}
          getOptionLabel={e => e.name}
          getOptionValue={e => e._id}
          loadOptions={getPaymentMethod}
          onChange={handleChangePaymentMethod}
          placeholder={'Choose Payment Method'}
          isRequired={true}
        />
    </div>
    
    <div>
      {
              fields.map(field=>
                      <Input
                          handleChange={(e)=>setVoucherID(e.target.value)}
                          value={voucher_id}
                          labelText={field.labelText}
                          labelFor={field.labelFor}
                          name={field.name}
                          type={field.type}
                          isRequired={field.isRequired}
                          placeholder={field.placeholder}
                  />
              
              )
          }
      </div>
      
      <FormAction handleSubmit={handleSubmit} text="Order Ticket" />
    </div>
  </form>
  )
}