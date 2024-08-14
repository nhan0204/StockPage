import React, { SyntheticEvent } from 'react'
import './PortfolioList.css'
import { CompanyRealtimePrice } from '../../../company'
import Portfolio from '../Portfolio/Portfolio';
import { v4 as uuidv4 } from 'uuid';

interface PortfolioListProps {
    portfolioValues: CompanyRealtimePrice[];
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const PortfolioList: React.FC<PortfolioListProps> = ({ portfolioValues, onPortfolioDelete }) => {
    return (
        <section id='portfolio' className='flex flex-col items-center mt-8'>
            <div className='container max-w-sm md:max-w-xl lg:max-w-3xl xl:max-w-6xl'>
                <h2 className='text-2xl font-extrabold font-sans'>Your<br />
                    <span className='font-times text-3xl font-thin '>Portfolio</span>
                </h2>
                <div className='bg-dark rounded-2xl py-4 px-6 mt-4 '>
                    {portfolioValues.length > 0 ? (
                        <div className='group container max-w-sm mx-auto p-0 gap-3 grid grid-cols-1 md:max-w-xl md:grid-cols-3 lg:max-w-3xl lg:grid-cols-4 xl:grid-cols-6 xl:max-w-6xl xl:mt-6 xl:gap-4'>
                            {portfolioValues.map(value =>
                                <Portfolio
                                    id={value.symbol} key={uuidv4()} value={value}
                                    onPortfolioDelete={onPortfolioDelete}
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