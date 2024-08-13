import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className='h-screen w-screen overflow-hidden '>
            <Navbar />
            <div className="w-full h-[calc(100%_-_60px)]">
                {children}
            </div>
        </div>
    );
}

export default Layout;
