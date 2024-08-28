import React from 'react'
import { TestDataCompany } from '../../Data/testData/testData';
import { render } from '@testing-library/react';

type CompanyData = typeof TestDataCompany[0];

type config = {
    label: string,
    subTitle: string;
    render: (company: CompanyData) => any;
}

interface RatioListProps {
    configs: config[];
    data: CompanyData;
    className: string;
}

const RatioList: React.FC<RatioListProps> = ({ configs, className, data }) => {

    const renderedCells = configs.map(row =>
        <li className='py-6 truncate'>
            <div className='flex items-center'>
                <div className='flex-1 min-w-0 '>
                    <p className='text-xl font-sans font-extrabold'>{row.label}</p>
                    <p className='text-2xl font-times font-thin'>{row.subTitle}</p>
                </div>

                <div className='inline-flex text-lg font-roboto font-bold'>
                    {row.render(data)}
                </div>
            </div>
        </li>
    )

    return (
        <div className={`${className} bg-slate-100 shadow-xl p-4 rounded-xl`}>
            <ul>
                {renderedCells}
            </ul>
        </div>
    );
};

export default RatioList;