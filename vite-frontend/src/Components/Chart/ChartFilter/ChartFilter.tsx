import React from 'react'
import ChartFilterItem from './ChartFilterItem/ChartFilterItem';
import { chartConfigs } from '../ChartConfigs';

interface ChartFilterProps {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<any>>;
}

const ChartFilter: React.FC<ChartFilterProps> = ({filter, setFilter}) => {
    return (
        <ul className='flex absolute top-2 left-8 z-40 space-x-4'>
            {Object.keys(chartConfigs).map(config =>
                <ChartFilterItem
                    key={config}
                    text={config}
                    active={filter === config}
                    onClick={() => setFilter(config)} 
                />
            )}
        </ul>
    );
};

export default ChartFilter;