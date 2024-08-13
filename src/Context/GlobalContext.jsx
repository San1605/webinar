import { createContext, useState } from "react";
import { webinarCards } from "../Utils/Config";

// Create a Context object for webinars
export const webinarContext = createContext();


export function ContextProvider({ children }) {
    // Initialize state for the list of webinars and the filtered list
    const [webinarList, setWebinarList] = useState(webinarCards);
    const [filteredList, setFilteredList] = useState(webinarCards);

    return (
        <webinarContext.Provider
            value={{
                // State and setter functions for webinar list
                webinarList: webinarList,
                setWebinarList: setWebinarList,
                filteredList: filteredList,
                setFilteredList: setFilteredList
            }}
        >
            {children} 
        </webinarContext.Provider>
    );
}
