import React from 'react';
import { Link } from 'react-router-dom';
import CompanyLogo from '../../CompanyLogo/CompanyLogo';

interface CompanyFinderItemProps {
    id: string;
    ticker: string;
}

const CompanyFinderItem: React.FC<CompanyFinderItemProps> = ({ id, ticker }) => {
    return (
        <div className='max-h-10 flex items-center gap-1 bg-slate-700 max-w-22 py-1 px-3 rounded-full cursor-pointer hover:opacity-80 hover:scale-125 transform transition-transform scale-100 duration-200 ease-in-out'>
            <CompanyLogo className='w-6' ticker={ticker}/>
            <Link
                id={id}
                key={id}
                reloadDocument
                to={`/company/${ticker}/company-profile`}   
                type='button'
                className='text-lg text-white '
            >
                {ticker}
            </Link>
        </div>
    );
};

export default CompanyFinderItem;