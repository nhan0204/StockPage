import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { CompanyRealtimePrice } from '../../../company';
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';
import PortfolioItem from './PortfolioItem/PortfolioItem';

interface PortfolioProps {
    id: string;
    value: CompanyRealtimePrice;
    onPortfolioDelete: (e: SyntheticEvent) => void;
    onDragStart: (e: SyntheticEvent) => void;
    onDragEnter: (e: SyntheticEvent) => void;
    onDragEnd: (e: SyntheticEvent) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ id, value, onPortfolioDelete, onDragStart, onDragEnter, onDragEnd }) => {
    return (
        <div id={id} key={id} className='hover:scale-105 transform scale-100 transition-transform  duration-100 ease-out'
            draggable
            onDragOver={e => e.preventDefault()}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
        >
            <div >
                <h2 className='text-darkCreame ml-2 font-compagnon font-semibold text-lg flex justify-between hover:creame'>
                    <Link className='hover:opacity-70' to={`/company/${value.symbol}/company-profile`} type='button'>
                        {value.symbol}
                    </Link>
                    <DeletePortfolio
                        portfolioValue={value}
                        onPortfolioDelete={onPortfolioDelete}
                    />
                </h2>
            </div>
            <div className='bg-darkCreame w-full container p-3 rounded-lg relative hover:shadow-xl hover:bg-creame'>
                <ul className='font-sans list-disc'>
                    <PortfolioItem monetary={true} label='Ask price' value={value.askPrice} />
                    <PortfolioItem monetary={true} label='Bid price' value={value.bidPrice} />
                    <PortfolioItem monetary={true} label='FMP last' value={value.fmpLast} />
                    <PortfolioItem monetary={true} label='Sale price' value={value.lastSalePrice} />
                    <PortfolioItem monetary={false} label='Bid size' value={value.bidSize} />
                    <PortfolioItem monetary={false} label='Sale size' value={value.lastSaleSize} />
                    <PortfolioItem monetary={false} label='Volume' value={value.volume} />
                    <PortfolioItem monetary={false} label='Saletime' value={value.lastSaleTime} />
                    <PortfolioItem monetary={false} label='Updated' value={value.lastUpdated} />
                </ul>
            </div>
        </div>
    )
}

export default Portfolio