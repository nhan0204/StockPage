import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { CompanyBalanceSheet } from '../../company';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormatting';
import { getBalanceSheet } from '../../Services/api';
import RatioList from '../RatioList/RatioList';
import Spinner from '../Spinner/Spinner';
import Tag from '../Tag/Tag';

const configs = [
    {
        label: "Total Assets",
        subTitle: "The combined value of everything the company owns, including both current and non-current assets.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalAssets),
    },
    {
        label: "Current Assets",
        subTitle: "The value of assets expected to be converted into cash within a year.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalCurrentAssets),
    },
    {
        label: "Total Cash",
        subTitle: "The liquid cash reserves the company holds.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.cashAndCashEquivalents),
    },
    {
        label: "Property & equipment",
        subTitle: "The value of the company’s physical assets such as buildings, machinery, and equipment.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.propertyPlantEquipmentNet),
    },
    {
        label: "Intangible Assets",
        subTitle: "Non-physical assets like patents and trademarks.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.intangibleAssets),
    },
    {
        label: "Long Term Debt",
        subTitle: "The amount the company owes that is due after one year.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.longTermDebt),
    },
    {
        label: "Total Debt",
        subTitle: "The sum of the company’s short-term and long-term debt obligations.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.otherCurrentLiabilities),
    },
    {
        label: "Total Liabilities",
        subTitle: "The total amount the company owes to others, including all current and non-current liabilities.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalLiabilities),
    },
    {
        label: "Current Liabilities",
        subTitle: "The company’s obligations that are due within one year.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalCurrentLiabilities),
    },
    {
        label: "Long-Term Debt",
        subTitle: "The portion of the company’s debt that is due after one year.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.longTermDebt),
    },
    {
        label: "Long-Term Income Taxes",
        subTitle: "The deferred tax obligations that the company must pay in the future.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.otherLiabilities),
    },
    {
        label: "Stakeholder's Equity",
        subTitle: "The residual interest in the assets of the company after deducting liabilities.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalStockholdersEquity),
    },
    {
        label: "Retained Earnings",
        subTitle: "The accumulated earnings retained by the company rather than paid out as dividends.",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.retainedEarnings),
    },
];


interface BalanceSheetProps { }

const BalanceSheet: React.FC<BalanceSheetProps> = () => {
    const ticker = useOutletContext<string>();
    const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet>();

    useEffect(() => {
        const getCompanyBalanceSheet = async () => {
            const result = await getBalanceSheet(ticker);

            if (typeof result === 'string') {
                throw new Error(`Failed to get company balance sheet ${result}`);
            } else if (Array.isArray(result.data)) {
                setBalanceSheet(result.data[0]);
            }
        }

        getCompanyBalanceSheet();
    }, [ticker]);

    return (
        <div className='flex flex-col px-0 mx-auto lg:max-w-5xl xl:max-w-[88%] mt-4'>
            <Tag head='Balance' tail='Sheet' className='ml-8' />
            {balanceSheet ? (
                <RatioList className='mt-4 mb-8 ml-5' configs={configs} data={balanceSheet} />
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default BalanceSheet;