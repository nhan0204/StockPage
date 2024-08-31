import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { CompanyCashflowStatement } from '../../company';
import { getCashflowStatement } from '../../Services/api';
import { formatDate } from '../../Utils/Helpers/DateFormatting';
import { formatLargeMonetaryNumber } from '../../Utils/Helpers/NumberFormatting';
import Spinner from '../Spinner/Spinner';
import Table from '../Table/Table';
import Tag from '../Tag/Tag';

const configs = [
    {
      label: "Date",
      render: (company: CompanyCashflowStatement) =>  formatDate(company.date),
    },
    {
      label: "Operating Cashflow",
      render: (company: CompanyCashflowStatement) => formatLargeMonetaryNumber(company.operatingCashFlow),
    },
    {
      label: "Investing Cashflow",
      render: (company: CompanyCashflowStatement) => formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
    },
    {
      label: "Financing Cashflow",
      render: (company: CompanyCashflowStatement) => formatLargeMonetaryNumber(
          company.netCashUsedProvidedByFinancingActivities
        ),
    },
    {
      label: "Cash At End of Period",
      render: (company: CompanyCashflowStatement) => formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
    },
    {
      label: "CapEX",
      render: (company: CompanyCashflowStatement) => formatLargeMonetaryNumber(company.capitalExpenditure),
    },
    {
      label: "Issuance Of Stock",
      render: (company: CompanyCashflowStatement) => formatLargeMonetaryNumber(company.commonStockIssued),
    },
    {
      label: "Free Cash Flow",
      render: (company: CompanyCashflowStatement) => formatLargeMonetaryNumber(company.freeCashFlow),
    },
  ];

interface CashflowStatementProps {} 

const CashflowStatement: React.FC<CashflowStatementProps> = () => {
    const ticker = useOutletContext<string>();
    const [cashflowStatement, setCashflowStatement] = useState<CompanyCashflowStatement[]>();

    useEffect(() => {
        const getCompanyCashflowStatement =  async() => {
            const result = await getCashflowStatement(ticker);

            if (typeof result === 'string') {
                throw new Error(`Failed to get cashflow statement: ${result}`);
            } else if(Array.isArray(result.data)) {
                setCashflowStatement(result.data);
            }
        }

        getCompanyCashflowStatement();
    }, [ticker]);

    return (
        <div className='flex flex-col px-0 mx-auto lg:max-w-5xl xl:max-w-[88%] mt-8'>
            <Tag head='Cashflow' tail='Statement' className='ml-8'/>
            {cashflowStatement ? (
                <Table className='ml-6 mt-4 mb-8' configs={configs} data={cashflowStatement}/>
            ) : (
                <Spinner/>
            )}
        </div>
    );
};

export default CashflowStatement;