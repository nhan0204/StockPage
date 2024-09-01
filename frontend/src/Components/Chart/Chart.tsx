import React, { useMemo, useState } from 'react'
import { CompanyWeeklyDividend } from '../../company';
import ReactApexChart from 'react-apexcharts';
import { formatStockData } from '../../Helpers/StockDataFormatting';

interface ChartProps {
    className: string;
    stockData: any;
}

const Chart: React.FC<ChartProps> = ({ className, stockData }) => {

    const seriesData = useMemo(() => formatStockData(stockData), [stockData]);

    return (
        <div className={`${className}`}>
            <ReactApexChart
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