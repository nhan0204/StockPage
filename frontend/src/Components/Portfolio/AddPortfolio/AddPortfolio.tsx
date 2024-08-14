import React, { SyntheticEvent } from 'react';
import { CompanySearch } from '../../../company';

interface AddPortfolioProps {
    value: CompanySearch;
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const AddPortfolio: React.FC<AddPortfolioProps> = ({ value, onPortfolioCreate }) => {
    return (
        <>
            <form className='absolute bottom-3 right-3' onSubmit={onPortfolioCreate}>
                <input readOnly={true} hidden={true} className='hidden' value={JSON.stringify(value.price)}>
                </input>
                <button className='bg-white rounded-full px-2.5 py-1.5 text-sm  hover:bg-slate-300 hover:text-white' type='submit'>Add</button>
            </form>
        </>
    )
}

export default AddPortfolio