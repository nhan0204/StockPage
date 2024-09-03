import React from 'react';
import './Description.css';

interface DescriptionProps {
    description: string;
    className: string;
}

const Description: React.FC<DescriptionProps> = ({ description, className }) => {
    return (
        <div className={className}>
            <div id='collapse' className='max-w-sm lg:max-w-xl xl:max-w-5xl rounded-xl h-fit'>
                <input id="toggle" type="checkbox" className='hidden'></input>
                <label 
                    id="head" 
                    htmlFor="toggle" 
                    className='relative block px-4 py-3 xl:px-5 xl:py-4 bg-white rounded-xl shadow-xl font-bold text-lg'
                >
                    Description
                </label>
                <div id="content" className='max-h-52 xl:max-h-64 rounded-b-xl block border-t-0 border-2 border-black'>
                    <span className='bg-transparent p-4 text-balance block'>{description}</span>
                </div>
            </div>
        </div>
    );
};

export default Description;