import React from 'react';

interface DataTableProps {
  headers: string[];
  data: string[];
}

const DataTable: React.FC<DataTableProps> = ({ headers, data }) => {
    const formatHostnames = (hostnames: string[]): string => {
        return hostnames.map(hostname => (hostname.length > 25 ? `${hostname.substring(0, 25)}...` : hostname)).join(', ');
    };
    
    
/**
 * format the data, especially for date that will be more readable, UNDEFINED on INTL..
 * @param {header} - The header of the table.
 * @param {itemData} - the item to be formated.
 * @returns {formatedItem} The formated data to be display on the table.
 */
    const dataFormat= (header: string, itemData: string ) => {

        let formatedItem: string;

        /**
         * format the date, especially for date that will be more readable, UNDEFINED on INTL..
         * {undefined} - Insure that the date will be displayed base on the user locale.
         * ex. people with 
         * 'en-GB' expected output 12 July 2024
         * 'en-US' expected output July 12 2024
         * 'ja-JP' will result to Japanese format as well
         */
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat(undefined, { 
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        };
    
        switch(header) {
            case 'Hostnames':
                formatedItem = formatHostnames(itemData.split(', '));
                break;
            case 'Registration Date':
            case 'Expiration Date':
                formatedItem = formatDate(itemData);
                break;
            default:
                formatedItem = itemData;
        }
        return formatedItem;
    }
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
                {dataFormat(headers[index], item)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
