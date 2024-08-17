import React from 'react';
import { Link } from 'react-router-dom';

interface CompanyFinderItemProps {
    id: string;
    ticker: string;
}

const CompanyFinderItem: React.FC<CompanyFinderItemProps> = ({ id, ticker }) => {
    return (
        <Link
            id={id}
            key={id}
            reloadDocument
            to={`/company/${ticker}`}   
            type='button'
        >
            {ticker}
        </Link>
    );
};

export default CompanyFinderItem;