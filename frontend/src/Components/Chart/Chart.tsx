import React, { useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { formatStockData } from '../../Helpers/StockDataFormatting';
import ChartFilter from './ChartFilter/ChartFilter';
import { ChartFilterKeys } from './ChartConfigs';

interface ChartProps {
    className: string;
    stockData: any;
}

const Chart: React.FC<ChartProps> = ({ className, stockData }) => {
    const [filter, setFilter] = useState<ChartFilterKeys>("1W");
    const seriesData = useMemo(() => formatStockData(filter, stockData), [stockData, filter]);

    return (
        <div className={`${className} relative`}>
            <ChartFilter filter={filter} setFilter={setFilter}/>
            <ReactApexChart
                className='mt-2 mb-8'
                options={
                    {
                        chart: {
                            type: 'candlestick',
                            height: 350,
                        },
                        title: {
                            text: '',
                            align: 'left',
                        },
                        xaxis: {
                            type: 'datetime',
                        },
                        yaxis: {
                            tooltip: { enabled: true }
                        },
                    }
                }
                type="candlestick"
                series={
                    [
                        {data: seriesData}
                    ]
                }
            />
        </div>
    );
};

export default Chart;