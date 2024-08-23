import React from 'react'
import Tag from '../../Components/Tag/Tag';
import Table from '../../Components/Table/Table';
import { TestDataCompany, testIncomeStatementData } from '../../Components/Table/testData/testData';

interface DesignGuideProps { }

const data = testIncomeStatementData;

const config = [
    {
        label: 'Year',
        render: (company: any) => company.acceptedDate,
    },
    {
        label: 'Cost of Revenure',
        render: (company: any) => company.costOfRevenue,
    }
]

const DesignGuide: React.FC<DesignGuideProps> = () => {
    return (
        <>
            <Tag className='ml-40 mt-12' head='Design Guide' tail='There are reusable components  with brief instructions'/>
            <Table className='mx-auto max-w-fit' configs={config} data={data}/>
        </>
    );
};

export default DesignGuide;