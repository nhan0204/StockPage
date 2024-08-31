import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { CompanyIncomeStatement } from '../../company';
import { getIncomeStatement } from '../../Services/api';
import { formatDate } from '../../Utils/Helpers/DateFormatting';
import { formatLargeMonetaryNumber, formatRatio } from '../../Utils/Helpers/NumberFormatting';
import Table from '../Table/Table';
import Tag from '../Tag/Tag';

const tableConfig = [
    {
        label: 'Date',
        render: (company: CompanyIncomeStatement) => formatDate(company.date),
    },
    {
        label: 'Revenue',
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.revenue),
    },
    {
        label: "Cost Of Revenue",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.costOfRevenue),
    },
    {
        label: "Depreciation",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.depreciationAndAmortization),
    },
    {
        label: "Operating Income",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.operatingIncome),
    },
    {
        label: "Income Before Taxes",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.incomeBeforeTax),
    },
    {
        label: "Net Income",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.netIncome),
    },
    {
        label: "Net Income Ratio",
        render: (company: CompanyIncomeStatement) => formatRatio(company.netIncomeRatio),
    },
    {
        label: "Earnings Per Share",
        render: (company: CompanyIncomeStatement) =>  formatRatio(company.eps),
    },
    {
        label: "Earnings Per Diluted",
        render: (company: CompanyIncomeStatement) => formatRatio(company.epsdiluted),
    },
    {
        label: "Gross Profit Ratio",
        render: (company: CompanyIncomeStatement) => formatRatio(company.grossProfitRatio),
    },
    {
        label: "Opearting Income Ratio",
        render: (company: CompanyIncomeStatement) => formatRatio(company.operatingIncomeRatio),
    },
    {
        label: "Income Before Taxes Ratio",
        render: (company: CompanyIncomeStatement) => formatRatio(company.incomeBeforeTaxRatio),
    },
]

interface IncomeStatementProps { }

const IncomeStatement: React.FC<IncomeStatementProps> = () => {
    const ticker = useOutletContext<string>();
    const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>();

    useEffect(() => {
        const getCompanyIncomeStatement = async () => {
            const result = await getIncomeStatement(ticker);

            if (typeof result === 'string') {
                throw new Error('Failed to get income statement');
            } else if (Array.isArray(result.data)) {
                setIncomeStatement(result.data);
            }
        }

        getCompanyIncomeStatement();
    }, [ticker]);

    return (
        <div className='flex flex-col px-0 mx-auto lg:max-w-5xl xl:max-w-[81vw] mt-4'>
            <Tag head='Income' tail='Statement' className='ml-5' />
            {incomeStatement && <Table className='ml-4 mt-8 my-12' configs={tableConfig} data={incomeStatement} />}
        </div>
    );
};

export default IncomeStatement;