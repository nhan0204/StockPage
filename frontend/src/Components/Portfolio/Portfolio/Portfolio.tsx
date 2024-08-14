import React, { SyntheticEvent } from 'react'
import { CompanyRealtimePrice } from '../../../company'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';

interface PortfolioProps {
    id: string;
    value: CompanyRealtimePrice;
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ id, value,  onPortfolioDelete}) => {
    return (
        <div id={id} key={id} className=''>
            <h2 className='text-darkCreame ml-2 font-compagnon font-semibold text-lg flex justify-between'>
                {value.symbol}
                <DeletePortfolio
                    portfolioValue={value}
                    onPortfolioDelete={onPortfolioDelete}
                />
            </h2>
            <div className='bg-creame w-full container p-3 rounded-lg relative'>
                <ul className='font-sans list-disc'>
                    <li className=' flex justify-between hover:scale-110  hover:font-semibold'>Ask price: <span>{value.askPrice}$</span> </li>
                    <li className=' flex justify-between hover:scale-110  hover:font-semibold'>Bid price: <span>{value.bidPrice}$</span> </li>
                    <li className=' flex justify-between hover:scale-110  hover:font-semibold'>FMP last: <span>{value.fmpLast}$</span> </li>
                    <li className=' flex justify-between hover:scale-110  hover:font-semibold'>Sale price: <span>{value.lastSalePrice}$</span> </li>
                    <li className=' flex justify-between hover:scale-110  hover:font-semibold'>Ask size: <span>{value.askSize}</span> </li>
                    <li className=' flex justify-between hover:scale-110  hover:font-semibold'>Bid size: <span>{value.bidSize}</span> </li>
                    <li className=' flex justify-between hover:scale-110  hover:font-semibold'>Sale size: <span>{value.lastSaleSize}</span> </li>
                    <li className=' flex justify-between hover:scale-110  hover:font-semibold'>Volume: <span>{value.volume}</span> </li>
                </ul>  
            </div>    
        </div>
    )
}

export default Portfolio