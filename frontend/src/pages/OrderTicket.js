import Header from "../components/Header"
import OrderTicket from "../components/OrderTicket"

export default function OrderTicketPage(){
    return(
        <>
             <Header
                heading="Form Order Ticket"
                paragraph="Please fill out the form below"
                />
            <OrderTicket/>                            
        </>
    ) 
}