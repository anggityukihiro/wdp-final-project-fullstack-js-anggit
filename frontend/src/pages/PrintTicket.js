import Header from "../components/Header"
import PrintTicket from "../components/PrintTicket"

export default function OrderTicketPage(){
    return(
        <>
             <Header
                heading="DETAIL TICKET"
                paragraph="Here your online ticket, you can print dude 😎"
                />
            <PrintTicket/>                            
        </>
    ) 
}