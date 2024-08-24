import React from 'react';

type config = {
    label: string;
    render: (company: any) => void;
}

interface TableProps {
    configs: config[];
    data: any;
    className: string;
}

const Table: React.FC<TableProps> = ({ configs, data, className }) => {

    const renderHeaders = configs.map((config: config) =>
        <th className='p-4 text-white text-left text-md font-semibold font-roboto  tracking-wider' key={config.label}>
            {config.label}
        </th>
    );

    const renderRows = data.map((company: any) =>
        <tr key={company.cik}>
            {configs.map((value: any) =>
                <td className='p-3 '>{value.render(company)}</td>
            )}
        </tr>
    )

    return (
        <div className={`${className} bg-white shadow-xl rounded-xl overflow-hidden `}>
            <table className='max-w-fit'>
                <thead className='bg-dark'>
                    <tr className='rounded-t-xl'>{renderHeaders}</tr>
                </thead>
                <tbody className='w-[80%] border-t-0 border-2 border-gray-50'>{renderRows}</tbody>
            </table>
            
        </div>
    );
};

export default Table;