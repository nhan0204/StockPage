import React from 'react' 
import Tag from '../Tag/Tag';

interface CashflowStatementProps {} 

const CashflowStatement: React.FC<CashflowStatementProps> = () => {
    return (
        <>
            <Tag head='Cashflow' tail='Statement' className='ml-8'/>
        </>
    );
};

export default CashflowStatement;