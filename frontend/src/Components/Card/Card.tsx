import React, { SyntheticEvent } from 'react'
import { CompanySearch } from '../../company'
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
            className='group-hover:blur-sm hover:!blur-none bg-slate-100 w-full container space-y-3 px-4 py-3 rounded-2xl relative '
        >
            <div className='space-y-3'>
                <div className='w-16 mt-2'>
                    {typeof searchResult.logo !== "undefined" ? <img className='w-full' alt="" src={searchResult.logo} /> : <span className='w-32 h-32 border-4 border-black'></span>}
                </div>
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