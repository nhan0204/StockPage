import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { CompanyRealtimePrice, CompanySearch } from '../../company';
import { searchCompanies, searchCompanyLogo, searchCompanyPrice } from '../../api';
import Search from '../../Components/Search/Search';
import PortfolioList from '../../Components/Portfolio/PortfolioList/PortfolioList';
import CardList from '../../Components/CardList/CardList';

interface SearchPageProps { }

const SearchPage: React.FC<SearchPageProps> = () => {
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [portfolioValues, setPortfolioValues] = useState<CompanyRealtimePrice[]>([]);
    const [severError, setServerError] = useState<string>("");

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const result = await searchCompanies(search);

        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {

            const companies = await Promise.all(
                result.data.map(async (company) => {
                    company.logo = await searchCompanyLogo(company.symbol);
                    company.price = await searchCompanyPrices(company.symbol);
                    return company;
                })
            );

            setSearchResult(companies);
        }

    }

    const searchCompanyPrices = async (symbol: string) => {
        const prices = await searchCompanyPrice(symbol);

        if (typeof prices === 'string') {
            setServerError(prices)
            return undefined;
        } else if (Array.isArray(prices.data)) {
            return prices.data[0];
        }
    }

    const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        try {
            const newPortfolio = JSON.parse(e.target[0].value);

            if (portfolioValues.find(value => value.symbol === newPortfolio.symbol))
                return;

            const updatedPortfolio = [...portfolioValues, newPortfolio];
            setPortfolioValues(updatedPortfolio);
        } catch (error) {
            console.log("Failed to add new portfolio", error);
        }
    }

    const onPortfolioDelete = (e: any) => {
        e.preventDefault();

        try {
            const portfolio = JSON.parse(e.target[0].value);
            const removePortfolio = portfolioValues.filter(value => value.symbol !== portfolio.symbol);
            setPortfolioValues(removePortfolio);
        } catch (error) {
            console.log("Failed to remove portfolio", error);
        }
    }
    return (
        <>
            <Search
                search={search}
                onSearchSubmit={onSearchSubmit}
                handleSearchChange={handleSearchChange}
            />

            <PortfolioList
                portfolioValues={portfolioValues}
                onPortfolioDelete={onPortfolioDelete}
            />

            <CardList
                searchResults={searchResult}
                onPortfolioCreate={onPortfolioCreate}
            />
        </>
    );
};

export default SearchPage;