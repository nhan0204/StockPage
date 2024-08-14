import React, { SyntheticEvent } from 'react';
import { v4 as uuidv4 } from "uuid";
import { CompanySearch } from '../../company';
import Card from '../Card/Card';

interface CardListProps {
    searchResults: CompanySearch[];
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList: React.FC<CardListProps> = ({ searchResults, onPortfolioCreate }) => {
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center mt-10 h-auto'>
                {searchResults.length > 0 ?
                    (
                        <div className='group container max-w-sm mx-auto p-0 gap-3 grid grid-cols-1 md:max-w-xl md:grid-cols-3 lg:max-w-3xl lg:grid-cols-4 xl:grid-cols-6 xl:max-w-6xl xl:mt-6 xl:gap-4'>
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
                        <p>No Result Found</p>
                    )}
            </div>
        </div>

    )
}

export default CardList