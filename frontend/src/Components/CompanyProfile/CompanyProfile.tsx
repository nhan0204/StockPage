import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { CompanyKeyMetrics } from '../../company';
import { getKeyMetrics } from '../../Services/api';
import { formatLargeNonMonetaryNumber, formatRatio } from '../../Utils/Helpers/NumberFormatting';
import RatioList from '../RatioList/RatioList';
import SectorFilings from '../SectorFilingsFinder/SectorFilingsFinder';

interface CompanyProfileProps { }

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) => formatLargeNonMonetaryNumber(company.marketCapTTM),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => formatRatio(company.currentRatioTTM),
    subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => formatRatio(company.roeTTM),
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) => formatRatio(company.returnOnTangibleAssetsTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Free Cashflow Per Share",
    render: (company: CompanyKeyMetrics) => formatRatio(company.freeCashFlowPerShareTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Book Value Per Share TTM",
    render: (company: CompanyKeyMetrics) => formatRatio(company.bookValuePerShareTTM),
    subTitle:
      "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
  },
  {
    label: "Divdend Yield TTM",
    render: (company: CompanyKeyMetrics) => formatRatio(company.dividendYieldTTM),
    subTitle: "Shows how much a company pays each year relative to stock price",
  },
  {
    label: "Capex Per Share TTM",
    render: (company: CompanyKeyMetrics) => formatRatio(company.capexPerShareTTM),
    subTitle:
      "Capex is used by a company to aquire, upgrade, and maintain physical assets",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) => formatRatio(company.grahamNumberTTM),
    subTitle:
      "This is the upperbouind of the price range that a defensive investor should pay for a stock",
  },
  {
    label: "PE Ratio",
    render: (company: CompanyKeyMetrics) => formatRatio(company.peRatioTTM),
    subTitle:
      "This is the upperbouind of the price range that a defensive investor should pay for a stock",
  },
];


const CompanyProfile: React.FC<CompanyProfileProps> = () => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();

  useEffect(() => {
    const getKeyMetricsRatio = async () => {
      const result = await getKeyMetrics(ticker);
  
      if (typeof result === 'string') {
        throw new Error('Failed to get key metrics');
      } else if (Array.isArray(result.data)) {
        setCompanyData(result.data[0]);
      }
    }

    getKeyMetricsRatio();
  }, [ticker]);

  return (
    <div className='mx-auto lg:mt-4 xl:ml-28 lg:max-w-5xl xl:max-w-full  h-full flex flex-col px-0 '>
      <SectorFilings ticker={ticker} className='ml-5  overflow-auto' />
      { companyData && <RatioList className='ml-5 my-12' configs={tableConfig} data={companyData!}/>}
    </div>
  );
};

export default CompanyProfile;