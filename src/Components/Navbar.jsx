import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Form from './Form';

const Navbar = () => {
    // State to manage the visibility of the modal
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="flex justify-between items-center h-[60px] px-8 border-b border-[#E3E7EC]">
                {/* Title of the Navbar */}
            <Typography variant="h6" component="div" sx={{ color: '#0E1013', fontSize: "18px", fontWeight: 600 }}>
                Webinar
            </Typography>
             {/* Button to open the modal */}
            <button onClick={() => setOpenModal(true)}
                style={{
                    backgroundColor: '#0E51F1',
                    color: '#fff',
                    boxShadow: '0px 8px 20px -8px #0E51F1',
                    borderRadius: "10px",
                    padding: "5px 10px",
                    fontSize: "15px",
                    fontWeight: 600,
                }}
            >
                Add Webinar
            </button>
            {
                openModal && <Form
                    open={openModal}
                    setOpen={setOpenModal}

                />
            }
        </div >
    );
}

export default Navbar;
