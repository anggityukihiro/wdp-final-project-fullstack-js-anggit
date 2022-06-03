import React,{useState,useEffect,forwardRef, useRef} from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { detailticketFields } from "../constants/formFields";
import QRCode from "react-qr-code";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

const fields=detailticketFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function PrintTicket(){
  const [name, setName] = useState('');
  const [userid, setUserID] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [price, setPrice] = useState('');
    const [voucher_name, setVoucherName] = useState('');
    const [voucher_price, setVoucherPrice] = useState('');
    const [event_price, setEventPrice] = useState('');
    const [payment_method, setPaymentMethod] = useState('');
    const [id_ticket, setTicketID] = useState('');
    const [event_location, setEventLocation] = useState('');
    const [event_time, setEventTime] = useState('');
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
    setEventLocation(ticket.event.location);
    setEventTime(ticket.event.time);
  }

  getTicket();

  const ref = useRef();

  const ComponentToPrint = forwardRef((props, ref) => {
    return <div ref={ref}>

<section class="text-gray-600 body-font">
    <div class="container px-5 py-10 mx-auto flex flex-wrap">

    <div class="rounded-lg overflow-hidden items-center mx-auto justify-center sm:mt-0">
        <QRCode value={id_ticket} />
      </div>

      <div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
        <div class="w-full sm:p-4 px-4 mb-6">
          <h1 class="mb-2 text-gray-900 mt-10 text-3xl">{name}</h1>
          <div class="leading-relaxed">{id_ticket}</div>
        </div>
        <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
          <h2 class="title-font font-medium text-3xl text-gray-900">20-B</h2>
          <p class="leading-relaxed">Seat Number</p>
        </div>
        <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
          <h2 class="title-font font-medium text-3xl text-gray-900">South</h2>
          <p class="leading-relaxed">Gate</p>
        </div>
        <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
          <h2 class="title-font font-medium text-3xl text-gray-900">{event_location}</h2>
          <p class="leading-relaxed">City</p>
        </div>
        <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
          <h2 class="title-font font-medium text-3xl text-gray-900">{event_time}</h2>
          <p class="leading-relaxed">Open Gate</p>
        </div>
      </div>

      </div>
    </section>     

    <h1 class="mx-auto justify-center text-center text-xl">PAYMENT COMPLETED</h1>

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

      <div class="mx-auto items-center w:full my-10">
      <PrintContextConsumer>
          {({ handlePrint }) => (
            <button onClick={handlePrint}>Print this out!</button>
          )}
        </PrintContextConsumer>
      </div>

    </div>

    </div>;
  });
  

  return(

    <div>
      <ReactToPrint content={() => ref.current}>
      <ComponentToPrint ref={ref} />
      </ReactToPrint>
    </div>

  )
}