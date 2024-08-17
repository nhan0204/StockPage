import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { CompanySearch } from '../../company';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';

interface CardProps {
    id: string;
    searchResult: CompanySearch;
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<CardProps> = ({ id, searchResult, onPortfolioCreate }) => {
    return (
        <div
            id={id}
            key={id}
            className='hover:scale-105 hover:shadow-xl hover:bg-slate-200 bg-slate-100 container min-h-60 space-y-3 px-4 py-3 rounded-2xl relative transform transition-transform scale-100 duration-100 ease-out'
        >
            <div className='space-y-3'>
                <Link to={`/company/${searchResult.symbol}`} type='button' className='hover:shadow-[0_0_20px_rgba(0,123,255,0.8)]'>
                    <div className='w-16 mt-2'>
                        {typeof searchResult.logo !== "undefined" ? <img className='w-full' alt="" src={searchResult.logo} /> : <span className='w-32 h-32 border-4 border-black'></span>}
                    </div>
                </Link>
                <h5 className='mt-2 text-balance font-semibold overflow-'>
                    {searchResult.name} ({searchResult.symbol})
                </h5>
            </div>

            <div className='space-y-2'>
                <p className=' text-sm text-ballance font-extralight'>
                    {searchResult.exchangeShortName} - {searchResult.stockExchange.substring(6)}
                </p>
                <p className=' text-green-400'>
                    {searchResult.price?.fmpLast} {searchResult.currency} 
                </p>
            </div>
            <AddPortfolio value={searchResult} onPortfolioCreate={onPortfolioCreate} />
        </div>
    )
}

export default Card