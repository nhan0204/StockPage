import React from 'react' 
import Tag from '../Tag/Tag';

interface HistoricalDividendProps {} 

const HistoricalDividend: React.FC<HistoricalDividendProps> = () => {
    return (
        <>
            <Tag head='Historical' tail='Dividend' className='ml-8'/>
        </>
    );
};

export default HistoricalDividend;