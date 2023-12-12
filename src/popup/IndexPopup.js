import { useState } from "react";
import PaymentPopup from "./PaymentPopup";
import CardPopup from "./CardPopup";

function IndexPopup(){
    const [paymentPopupIsOpen, setPaymentPopupIsOpen] = useState(false);
    const [cardPopupIsOpen, setCardPopupIsOpen] = useState(false);

    const openPaymentPopup =() =>{
        setPaymentPopupIsOpen(true);
    }
    const openCardPopup =() =>{
        setCardPopupIsOpen(true);
    }
    const closePaymentPopup =() =>{
        setPaymentPopupIsOpen(false);
    }
    const closeCardPopup =() =>{
        setCardPopupIsOpen(false);
        setPaymentPopupIsOpen(false);
    }

    return(
        <>
        <PaymentPopup paymentPopupIsOpen={paymentPopupIsOpen} closePaymentPopup={closePaymentPopup}/>
        <CardPopup/>
        </>
    )
};
export default IndexPopup;