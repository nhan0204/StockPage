import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { getCompanyLogo, getCompanyPrice, searchCompanies } from '../../api';
import { CompanyRealtimePrice, CompanySearch } from '../../company';
import CardList from '../../Components/CardList/CardList';
import PortfolioList from '../../Components/Portfolio/PortfolioList/PortfolioList';
import Search from '../../Components/Search/Search';
import Spinner from '../../Components/Spinner/Spinner';
import NotFound from '../../Components/Errors/NotFound/NotFound';

interface SearchPageProps { }

const SearchPage: React.FC<SearchPageProps> = () => {
    const [search, setSearch] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [portfolioValues, setPortfolioValues] = useState<CompanyRealtimePrice[]>([]);
    const [serverError, setServerError] = useState<string>("");


    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setIsSearching(false);
    }
    
    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        setIsSearching(true);
        setSearchResult([]);
        setServerError("");

        const result = await searchCompanies(search);

        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            const companies = await Promise.all(
                result.data.map(async (company) => {
                    company.logo = await getCompanyLogo(company.symbol);
                    company.price = await searchCompanyPrices(company.symbol);
                    return company;
                })
            );

            setSearchResult(companies);
        }

    }

    const searchCompanyPrices = async (symbol: string) => {
        const prices = await getCompanyPrice(symbol);

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

    useEffect(() => {
        if (isSearching) {
            setSearchResult([]);
        }
    },[isSearching])

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

            {isSearching ? (
                serverError ?
                    <NotFound serverError={serverError}/>:
                    searchResult ? 
                        <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate}/> :
                        <Spinner/>
            ) : (
                <></>
            )}
        </>
    );
};

export default SearchPage;