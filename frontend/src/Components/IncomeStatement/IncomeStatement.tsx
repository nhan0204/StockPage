import React from 'react' 
import Tag from '../Tag/Tag';

interface IncomeStatementProps {} 

const IncomeStatement: React.FC<IncomeStatementProps> = () => {
    return (
        <>
            <Tag head='Income' tail='Statement' className='ml-8'/>
        </>
    );
};

export default IncomeStatement;