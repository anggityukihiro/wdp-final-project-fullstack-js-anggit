import React,{useState,useEffect} from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Input from './Input';
import { useNavigate } from "react-router-dom";
import { detailticketFields } from "../constants/formFields"
import FormCheck from "./FormCheck";

const fields=detailticketFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function OrderTicket(){
  const [name, setName] = useState('');
  const [userid, setUserID] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [ticket_id, setTicketID] = useState('');
    const [price, setPrice] = useState('');
    const [voucher_name, setVoucherName] = useState('');
    const [voucher_price, setVoucherPrice] = useState('');
    const [event_price, setEventPrice] = useState('');
    const [payment_method, setPaymentMethod] = useState('');
    const [status_ticket, setStatusTicket] = useState('');
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

  const axiosJWT = axios.create({
    headers: {'Authorization': 'Bearer '+token}
  });
  
  axiosJWT.interceptors.request.use(async(config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()){
      const respone = await axios.get('http://localhost:5000/token');
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

  const getTicket = async() => {
    const respone = await axiosJWT.get('http://localhost:5000/tickets/'+userid,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    const ticket = respone.data;
    setPrice(ticket.price);
    setTicketID(ticket.id_ticket);
    setVoucherName(ticket.voucher.voucher_code);
    setVoucherPrice(ticket.voucher.cut_price);
    setEventPrice(ticket.event.price);
    setPaymentMethod(ticket.payment_method.name +' - '+ticket.payment_method.account_number);
    setStatusTicket(ticket.status);

    if(status_ticket == 'completed') {
      navigate("/print-ticket"); 
      refreshPage();        
    }
    
  }

  getTicket();

  // const getTicket=async(e)=>{

  //   e.preventDefault();

  //   try {

  //     const respone = await axiosJWT.get('http://localhost:5000/tickets/sda4234234',{
  //       headers:{
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     const ticket = respone.data;
  //     console.log(ticket);
  //     setPrice(ticket.price);
  //     setVoucherName(ticket.voucher.voucher_code);
  //     setVoucherPrice(ticket.voucher.cut_price);
  //     setEventPrice(ticket.event.price);
  //     setPaymentMethod(ticket.payment_method.name +' - '+ticket.payment_method.account_number);
  //     setStatusTicket(ticket.status);      
      
  //   } catch (error) {

  //     if(error.response){
  //       navigate("/order-ticket");
  //       refreshPage();
  //     }

  //   }
    
  // }

  const [confirmticketState,setconfirmticketState]=useState(fieldsState);

  const handleChange=(e)=>{
      setconfirmticketState({...confirmticketState,[e.target.id]:e.target.value})
  }
  const [msg, setMsg] = useState('');
  
  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
          await axiosJWT.put('http://localhost:5000/tickets',{
            headers:{
              Authorization: `Bearer ${token}`
            },
            ticket_id:ticket_id,
            proof_payment:confirmticketState.proof_payment,
          });
          navigate("/detail-ticket");
          refreshPage();
        } catch (error) {
          if(error.response){
            setMsg(error.response.data.message);
          }
        }
  
  }

  let statusTicket;
  let formConfirmation;

  if(status_ticket == 'unpaid') {
    statusTicket = 'Waiting For Payment';
    formConfirmation = <div class="flex">
      <div>
      {
              fields.map(field=>
                      <Input className="z-0"
                          key={field.id}
                          handleChange={handleChange}
                          value={confirmticketState[field.id]}
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

      </div>
      <div>
        <FormCheck handleSubmit={handleSubmit} text="Submit" />
      </div>
    </div>;
  }

  else{
    statusTicket = 'Please wait, your payment on verification';
    formConfirmation = '';
  }

  return(

    <div>

    <form className="mt-8" onSubmit={handleSubmit}>
    <div class="justify-center mx-auto items-center mx-auto w-3/4 sm:w-1/3">

    <img src="https://static.thenounproject.com/png/1358445-200.png" alt="Waiting Payment" class="mx-auto -mt-5"></img>

    <p class="item-center justify-center mx-auto text-center mb-10 font-bold">{statusTicket}</p>

    <p class="item-center justify-center mx-auto bg-red-600 text-white text-center">{msg}</p>

    {formConfirmation}

    </div>
  </form>

    <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 mt-5 pb-10">
      
      <div class="p-2 sm:w-1/2 w-full">
        <div class="bg-gray-100 rounded flex p-4 h-full items-center">
        <svg class="h-6 w-6 text-indigo-500 mr-4"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="15" y1="5" x2="15" y2="7" />  <line x1="15" y1="11" x2="15" y2="13" />  <line x1="15" y1="17" x2="15" y2="19" />  <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" /></svg>
          <span class="title-font font-medium">Ticket Price</span>
        </div>
      </div>
      <div class="py-2 sm:w-1/2 w-full">
        <div class="bg-gray-100 rounded h-full items-center">
          <span class="title-font font-medium float-right py-4 px-4">Rp {event_price},-</span>
        </div>
      </div>

      <div class="p-2 sm:w-1/2 w-full">
        <div class="bg-gray-100 rounded flex p-4 h-full items-center">
        <svg class="h-6 w-6 text-indigo-500 mr-4" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="19" y1="5" x2="5" y2="19" />  <circle cx="6.5" cy="6.5" r="2.5" />  <circle cx="17.5" cy="17.5" r="2.5" /></svg>
        <span class="title-font font-medium">Discount Voucher</span>
        </div>
      </div>
      <div class="py-2 sm:w-1/2 w-full">
        <div class="bg-gray-100 rounded h-full items-center">
          <span class="title-font font-medium float-right py-4 px-4">{voucher_name} (-Rp {voucher_price})</span>
        </div>
      </div>

      <div class="p-2 sm:w-1/2 w-full">
        <div class="bg-gray-100 rounded flex p-4 h-full items-center">
        <svg class="h-6 w-6 text-indigo-500 mr-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="title-font font-medium">Payment Method</span>
        </div>
      </div>
      <div class="py-2 sm:w-1/2 w-full">
        <div class="bg-gray-100 rounded h-full items-center">
          <span class="title-font font-medium float-right py-4 px-4">{payment_method}</span>
        </div>
      </div>


      <div class="p-2 sm:w-1/2 w-full">
        <div class="bg-gray-100 rounded flex p-4 h-full items-center">
        <svg class="h-6 w-6 text-indigo-500 mr-4"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />  <path d="M12 3v3m0 12v3" /></svg>
          <span class="title-font font-medium">Total Nominal</span>
        </div>
      </div>
      <div class="py-2 sm:w-1/2 w-full">
        <div class="bg-gray-100 rounded h-full items-center">
          <span class="title-font font-medium float-right py-4 px-4 font-bold">Rp {price},-</span>
        </div>
      </div>

      <div class="p-2 sm:w-1/2 w-full">
        <div class="bg-gray-100 rounded flex p-4 h-full items-center">
        <svg class="h-6 w-6 text-indigo-500 mr-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="title-font font-medium">Status Payment</span>
        </div>
      </div>
      <div class="py-2 sm:w-1/2 w-full">
        <div class="bg-gray-100 rounded h-full items-center">
          <span class="title-font font-medium float-right py-4 px-4 font-bold">{status_ticket}</span>
        </div>
      </div>


     </div>
  </div>
  )
}