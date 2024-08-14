import React, { SyntheticEvent } from 'react'
import { CompanyRealtimePrice } from '../../../company';
import "./DeletePortfolio.css";

interface DeletePortfolioProps {
    portfolioValue: CompanyRealtimePrice;
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const DeletePortfolio: React.FC<DeletePortfolioProps> = ({portfolioValue, onPortfolioDelete: onPortfolioDelte}) => {
  return (
    <div>
        <form onSubmit={onPortfolioDelte} className='relative'>
            <input hidden={true} value={JSON.stringify(portfolioValue)}></input>
            <button type='submit' className='absolute right-1 delete-button'>
                <i className='uil uil-minus'></i>
            </button>
        </form>
    </div>
  )
}

export default DeletePortfolio