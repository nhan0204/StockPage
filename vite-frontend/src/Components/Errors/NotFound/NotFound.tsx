import React from 'react';
import notfound from "./notfound.png";


interface NotFoundProps {
    serverError: string;
}

const NotFound: React.FC<NotFoundProps> = ({ serverError }) => {
    return (
        <div className='p-4 mt-4 lg:mt-12 container mx-auto flex flex-col items-center space-y-5'>
            <img alt="" src={notfound} className='pt-8 px-8'/>
            <p className='mb-4 text-md lg:text-xl xl:text-2xl text-gray-500'>{serverError}</p>
        </div>
    );
};

export default NotFound;