import { useState } from "react";

export const useModalController = () => {
    const [openModal, setOpenModal] = useState('');
    return { 
        openModal,
        setOpenModal      
    };
}