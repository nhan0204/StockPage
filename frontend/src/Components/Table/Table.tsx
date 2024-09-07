import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Table.css';

type config = {
    label: string;
    render: (company: any) => any;
}

interface TableProps {
    configs: config[];
    data: any;
    className: string;
}

const Table: React.FC<TableProps> = ({ configs, data, className }) => {

    const renderHeaders = configs.map((config: config) =>
        <th className={`whitespace-normal lg:whitespace-nowrap p-4 text-white text-left text-sm lg:text-md font-semibold font-roboto  tracking-wider`} key={config.label}>
            {config.label}
        </th>
    );

    const renderRows = data.map((company: any) => 
        <tr key={`${company.cik}-${uuidv4()}`} className='whitespace-nowrap hover:cursor-pointer hover:font-bold hover:bg-slate-200 hover:shadow-white hover:shadow-lg transition-color duration-75 ease'>
            {configs.map((config: config) =>
                <td className='px-5 py-4 lg:py-3 lg:px-3 xl:py-4 xl:px-5  min-w-fit' key={uuidv4()}>
                    {config.render(company)}
                </td>
            )}
        </tr>
    )

    return (
        <div id='table' className={`${className} bg-white shadow-xl rounded-xl overflow-x-auto `}>
            <table className='w-full'>
                <thead className='bg-slate-400'>
                    <tr className='rounded-t-xl'>{renderHeaders}</tr>
                </thead>
                <tbody>{renderRows}</tbody>
            </table>
            
        </div>
    );
};

export default Table;