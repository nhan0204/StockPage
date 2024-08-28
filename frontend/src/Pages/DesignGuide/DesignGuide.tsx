import React from 'react'
import Tag from '../../Components/Tag/Tag';
import Table from '../../Components/Table/Table';
import { TestDataCompany, testIncomeStatementData } from '../../Data/testData/testData';
import RatioList from '../../Components/RatioList/RatioList';

interface DesignGuideProps { }

const incomeStatementData = testIncomeStatementData;
const companyData = TestDataCompany[0];


const tableConfig = [
    {
        label: 'Year',
        render: (company: any) => company.acceptedDate,
    },
    {
        label: 'Cost of Revenure',
        render: (company: any) => company.costOfRevenue,
    }
]

const ratioConfig = [
    {
        label:  'Release Date',
        subTitle: 'This is company on stock exchange date',
        render: (company: any) => company.ipoDate,
    }
]

const DesignGuide: React.FC<DesignGuideProps> = () => {
    return (
        <>
            <Tag className='ml-40 mt-12' head='Design Guide' tail='There are reusable components  with brief instructions'/>
            {/* <Table className='ml-40 mt-12 max-w-fit ' configs={tableConfig} data={incomeStatementData}/> */}
            <RatioList className='ml-40 mt-12 max-w-[74%]  ' configs={ratioConfig} data={companyData} />
        </>
    );
};

export default DesignGuide;