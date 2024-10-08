import React, { SyntheticEvent } from 'react';
import { v4 as uuidv4 } from "uuid";
import { CompanySearch } from '../../company';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';

interface CardListProps {
    searchResults: CompanySearch[];
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList: React.FC<CardListProps> = ({ searchResults, onPortfolioCreate }) => {
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center mt-10 h-auto'>
                {searchResults.length > 0  ?
                    (
                        <div className='container mx-auto p-0 gap-4 grid grid-cols-1 max-w-[86%] sm:max-w-fit md:max-w-xl md:grid-cols-3 lg:max-w-3xl lg:grid-cols-4 xl:grid-cols-6 xl:max-w-6xl xl:mt-6 xl:gap-4'>
                            {searchResults.map(result =>
                                <Card
                                    id={result.symbol}
                                    key={uuidv4()}
                                    searchResult={result}
                                    onPortfolioCreate={onPortfolioCreate}
                                />
                            )}
                        </div>
                    ) : (
                        <Spinner/>
                    )}
            </div>
        </div>

    )
}

export default CardList