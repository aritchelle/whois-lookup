import React from 'react';

interface DataTableProps {
  headers: string[];
  data: string[];
}

const DataTable: React.FC<DataTableProps> = ({ headers, data }) => {
    const formatHostnames = (hostnames: string[]): string => {
        return hostnames.map(hostname => (hostname.length > 25 ? `${hostname.substring(0, 25)}...` : hostname)).join(', ');
      };
  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-2">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            {data.map((item, index) => (
              <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {headers[index] === 'Hostnames' ? formatHostnames(item.split(', ')) : item}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
