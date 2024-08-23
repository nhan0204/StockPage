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
        <th key={config.label}>
            {config.label}
        </th>
    );

    const renderRows = data.map((company: any) =>
        <tr key={company.cik}>
            {configs.map((value: any) =>
                <td>{value.render(company)}</td>
            )}
        </tr>
    )

    return (
        <div className={className}>
            <table>
                <thead>{renderHeaders}</thead>
                <tbody>{renderRows}</tbody>
            </table>
        </div>
    );
};

export default Table;