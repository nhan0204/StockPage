import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CompanyRealtimePrice } from '../../../company';
import Portfolio from '../Portfolio/Portfolio';
import './PortfolioList.css';

interface PortfolioListProps {
    portfolioValues: CompanyRealtimePrice[];
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const PortfolioList: React.FC<PortfolioListProps> = ({ portfolioValues, onPortfolioDelete }) => {
    const [portfolioList, setPortfoliosList] = useState<CompanyRealtimePrice[]>([]);

    useEffect(() => {
        setPortfoliosList(portfolioValues);
    }, [portfolioValues])

    const dragPortfolio = useRef<number>(0);
    const dragOverPortfolio = useRef<number>(0);

    const handleSort = () => {
        const portfolioSwapOrder = [...portfolioValues];
        const temp = portfolioSwapOrder[dragPortfolio.current];
        portfolioSwapOrder[dragPortfolio.current] = portfolioSwapOrder[dragOverPortfolio.current];
        portfolioSwapOrder[dragOverPortfolio.current] = temp;
        setPortfoliosList(portfolioSwapOrder);
    }

    return (
        <section id='portfolio' className='flex flex-col items-center mt-8'>
            <div className='container max-w-[95%] md:max-w-xl lg:max-w-3xl xl:max-w-6xl'>
                {/* Title */}
                <h2 className='text-2xl font-extrabold font-sans'>Your<br />
                    <span className='font-times text-3xl font-thin '>Portfolio</span>
                </h2>
                {/* Portfolio List */}
                <div className='bg-dark rounded-2xl py-4 px-6 mt-4'>
                    {portfolioList.length > 0 ? (
                        <div className='container max-w-sm mx-auto p-0 gap-3 grid grid-cols-2 sm:max-w-xl sm:grid-cols-3 lg:max-w-3xl lg:grid-cols-4 xl:grid-cols-6 xl:max-w-6xl xl:mt-6 xl:gap-4'>
                            {portfolioList.map((value, index) =>
                                <Portfolio
                                    id={value.symbol} key={uuidv4()} value={value}
                                    onPortfolioDelete={onPortfolioDelete}
                                    onDragStart={() => dragPortfolio.current = index}
                                    onDragEnter={() => dragOverPortfolio.current = index}
                                    onDragEnd={handleSort}
                                />
                            )}
                        </div>
                    ) : (
                        <p className='text-white'>Your portfolio is empty</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default PortfolioList