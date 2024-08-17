import React from 'react';
import notfound from "./notfound.png";


interface NotFoundProps {
    serverError: string;
}

const NotFound: React.FC<NotFoundProps> = ({ serverError }) => {
    return (
        <div className='mt-8 container mx-auto flex flex-col items-center space-y-5'>
            <img alt="" src={notfound} />
            <p className='text-xl xl:text-2xl text-gray-500'>{serverError}</p>
        </div>
    );
};

export default NotFound;