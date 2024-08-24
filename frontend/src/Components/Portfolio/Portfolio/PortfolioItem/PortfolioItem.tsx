import React from 'react' 
import { formatLargeMonetaryNumber, formatLargeNonMonetaryNumber } from '../../../../Helpers/NumberFormatting';

interface PortfolioItemProps {
    label: string;
    value: number;
    monetary: boolean;
} 

const PortfolioItem: React.FC<PortfolioItemProps> = ({label, value, monetary}) => {
    return (
        <li className=' flex justify-between hover:scale-110  hover:font-semibold'>
            {label}: 
            <span>{monetary ? formatLargeMonetaryNumber(value) : formatLargeNonMonetaryNumber(value)}</span> 
        </li>
    );
};

export default PortfolioItem;