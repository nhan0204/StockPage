import React from 'react' 
import Tag from '../Tag/Tag';

interface BalanceSheetProps {} 

const BalanceSheet: React.FC<BalanceSheetProps> = () => {
    return (
        <>
            <Tag head='Balance' tail='Sheet' className='ml-8'/>
            
        </>
    );
};

export default BalanceSheet;