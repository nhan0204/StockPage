import React from 'react';
import { v4 as uuidv4 } from 'uuid';

type config = {
    label: string,
    subTitle?: string;
    render: (company: any) => any;
}

interface RatioListProps {
    configs: config[];
    data: any;
    className: string;
}

const RatioList: React.FC<RatioListProps> = ({ configs, className, data }) => {

    const renderedCells = configs.map(config => 
        <li id={uuidv4()} key={uuidv4()} className='truncate flex-1 bg-white shadow-xl p-6 rounded-xl hover:bg-dark hover:text-white hover:scale-105 transform transform-translate scale-100 duration-200 ease-in-out'>
            <div className='flex items-center'>
                <div className='flex-1 min-w-0 '>
                    <p className='lg:text-xl font-serif font-bold'>{config.label}</p>
                    <p className='lg:text-sm font-sans font-extralight hidden lg:flex'>{config.subTitle}</p>
                </div>

                <div className='inline-flex lg:text-xl font-roboto font-bold'>
                    {config.render(data)}
                </div>
            </div>
        </li>
    )


    return (
        <div className={`${className} xl:max-w-[92%]`}>
            <ul className='flex flex-col gap-8'>
                {renderedCells}
            </ul>
        </div>
    );
};

export default RatioList;