import Header from "../components/Header"
import DetailTicket from "../components/DetailTicket"

export default function OrderTicketPage(){
    return(
        <>
             <Header
                heading="Detail Ticket"
                paragraph="Please finish payment soon"
                />
            <DetailTicket/>                            
        </>
    ) 
}