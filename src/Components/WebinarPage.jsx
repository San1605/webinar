import React, { useContext, useState } from 'react'
import WebinarCard from './WebinarCard';
import Form from './Form';
import { webinarContext } from '../Context/GlobalContext.jsx';

const WebinarPage = () => {
     // Use the context to get state and setter functions
    const { setWebinarList, filteredList, setFilteredList } = useContext(webinarContext)
     // Local state for managing modal visibility and selected webina
    const [showModal, setShowModal] = useState(false);
    const [selectedWebinar, setSelectedWebinar] = useState({});

    // Function to delete a webinar card
    const deleteCard = (webinar) => {
        console.log(webinar, 'webinae')
        const arr = filteredList?.filter((item) => item.id !== webinar.id)
        setWebinarList(arr);
        setFilteredList(arr)
    }

     // Function to edit a webinar card
    const editCard = (webinar) => {
        setSelectedWebinar(webinar);
        setShowModal(true);
    }

    return (
        <>
         {/* Main container for the page */}
            <div className="p-4 sm:p-4 md:p-6 overflow-y-auto h-[calc(100vh_-_60px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                    {filteredList?.map((webinar, index) => (
                        <div key={index} className="flex justify-center">
                            <WebinarCard
                                webinar={webinar}
                                deleteCard={() => deleteCard(webinar)}
                                editCard={() => editCard(webinar)}
                            />
                        </div>
                    ))}
                </div>
            </div>

  {/* Conditionally render the Form component as a modal */}
            {showModal && (
                <Form
                    open={showModal}
                    setOpen={setShowModal}
                    webinarData={selectedWebinar}
                    setWebinarList={setWebinarList}
                />
            )}
        </>
    )
}

export default WebinarPage