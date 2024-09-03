import React from 'react';
import Table from '../../Components/Table/Table';
import Tag from '../../Components/Tag/Tag';
import { testIncomeStatementData } from '../../Data/testData';

interface DesignGuideProps { }

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

// const ratioConfig = [
//     {
//         label:  'Release Date',
//         subTitle: 'This is company on stock exchange date',
//         render: (company: any) => company.ipoDate,
//     },
//     {
//         label: 'Full-time employees', 
//         subTitle: 'Amount of consistent employees', 
//         render: (company: any) => company.fullTimeEmployees,
//     },
//     {
//         label: 'Marketcap',
//         subTitle: 'Market capicitance',
//         render: (company: any) => company.mktCap,
//     }
// ]

const DesignGuide: React.FC<DesignGuideProps> = () => {
    return (
        <>
            <Tag className='ml-40 mt-12' head='Design Guide' tail='There are reusable components  with brief instructions'/>
            <Table className='ml-40 mt-12 max-w-fit' configs={tableConfig} data={testIncomeStatementData}/>
            {/* <RatioList className='ml-40 mt-12 max-w-[80%]' configs={ratioConfig} data={companyData} /> */}
            
        </>
    );
};

export default DesignGuide;