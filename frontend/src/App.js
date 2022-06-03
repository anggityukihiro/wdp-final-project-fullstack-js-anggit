import Main from "./pages/Main";
import { Routes, Route, Link, } from "react-router-dom";
import React,{useState,useEffect} from 'react'
import ButtonNav from "./components/Button/ButtonNav";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import LoginPage from "./pages/Login";
import SignupPage from './pages/Signup';
import OrderTicket from "./pages/OrderTicket";
import DetailTicket from "./pages/DetailTicket";
import PrintTicket from "./pages/PrintTicket";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function App() {

    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    useEffect(() => {
        refreshToken();
    },[]);

    const refreshToken = async () => {
        try {
            const respone = await axios.get('http://localhost:5000/token/');
            setToken(respone.data.accessToken);
            const decode = jwt_decode(respone.data.accessToken);
            setName(decode.name);
            setExpire(decode.exp);
        } catch (error) {
          if(error){
			  //alert('Belum Login');
          }
        }
    }	
	const navigate = useNavigate();

    const refreshPage = () => {
		navigate(0);
	  }
  
	const logout = async() => {
		try {
		  await axios.delete('http://localhost:5000/user/logout');
		  navigate("/login");   
		  refreshPage();
		} catch (error) {
		  console.log(error);
		}
	  }	

	const navigation = [
		{ name: 'NEWS', href: '/#news', current: true },
		{ name: 'LAYOUT', href: '/#ticket', current: false },
		{ name: 'PROMOTERS', href: '/#promoters', current: false },
		{ name: 'CONTACT US', href: '/#contactus', current: false },
	  ]
	  
	  function classNames(...classes) {
		return classes.filter(Boolean).join(' ')
	  }	

	let navProfile;
	if(name) {
		navProfile = <Menu as="div" className="ml-3 relative">
							<div>
								<Menu.Button className="flex text-m focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
								<span className="sr-only">Open user menu</span>
								{name}
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
								<Menu.Item>
									{({ active }) => (
									<a
										href="/order-ticket"
										className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
									>
										Order Ticket
									</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
									<a
										href="/detail-ticket"
										className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
									>
										My Ticket
									</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
									<button  
										onClick={logout}
										className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
									>
										Logout
									</button>
									)}
								</Menu.Item>
								</Menu.Items>
							</Transition>
							</Menu>;
	}

	else {
		navProfile = <Link to="/login"><ButtonNav text={'BUY TICKET'} /></Link>;
	}

	return (
        <div>

		<Disclosure as="nav" className="bg-white fixed w-full">
		{({ open }) => (
			<>
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-16">
				<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
					{/* Mobile menu button*/}
					<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
					<span className="sr-only">Open main menu</span>
					{open ? (
						<XIcon className="block h-6 w-6" aria-hidden="true" />
					) : (
						<MenuIcon className="block h-6 w-6" aria-hidden="true" />
					)}
					</Disclosure.Button>
				</div>
				<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
					<div className="flex-shrink-0 flex items-center">
					<img
						className="block lg:hidden h-8 -ml-10"
						src="https://loket-asset-production.s3.ap-southeast-1.amazonaws.com/lp/sdk/prod/uploads/7/logo-pk-black.png"
						alt="Workflow"
					/>
					<img
						className="hidden lg:block h-8 w-auto"
						src="https://loket-asset-production.s3.ap-southeast-1.amazonaws.com/lp/sdk/prod/uploads/7/logo-pk-black.png"
						alt="Workflow"
					/>
					</div>
					<div className="hidden sm:block sm:ml-6">
					<div className="flex space-x-4">
						{navigation.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className={classNames(
							item.current ? 'bg-gray-900 text-white' : ' hover:bg-gray-700 hover:text-white',
							'px-3 py-2 rounded-md text-sm font-medium'
							)}
							aria-current={item.current ? 'page' : undefined}
						>
							{item.name}
						</a>
						))}
					</div>
					</div>
				</div>
				<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						{navProfile}
				</div>
				</div>
			</div>

			<Disclosure.Panel className="sm:hidden">
				<div className="px-2 pt-2 pb-3 space-y-1">
				{navigation.map((item) => (
					<Disclosure.Button
					key={item.name}
					as="a"
					href={item.href}
					className={classNames(
						item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
						'block px-3 py-2 rounded-md text-base font-medium'
					)}
					aria-current={item.current ? 'page' : undefined}
					>
					{item.name}
					</Disclosure.Button>
				))}
				</div>
			</Disclosure.Panel>
			</>
		)}
		</Disclosure>

			<div class="mx-auto w-full justify-center">
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/order-ticket" element={<OrderTicket />} />
					<Route path="/detail-ticket" element={<DetailTicket />} />
					<Route path="/print-ticket" element={<PrintTicket />} />
					<Route path="/" element={<Main />} />
				</Routes>	
			</div>			

			<footer class="text-white body-font bg-indigo-900">
				<div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">Created with <svg
						xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 px-1" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
					</svg> by Anggit Nur Iman
					<p
						class="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 text-center">© 2022 PK ENTERTAINMENT GROUP INDONESIA. ALL RIGHTS RESERVED. 
					</p>
				</div>
   		 	</footer>	
		</div>
		

	);
}


export default App;
