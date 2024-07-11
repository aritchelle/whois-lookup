"use client"

import { useState, useEffect } from 'react';
import WhoisForm from './components/WhoisForm';
import DataTable from './components/DataTable';


interface WhoisData {
  domainName: string;
  registrarName: string;
  createdDate: string;
  expiresDate: string;
  nameServers: {
    hostNames: string[];
  };
  registrant?: { 
    name: string
  };
  technicalContact?: { 
    name: string
  };
  administrativeContact?: { 
    name: string
  };
  contactEmail?: string;
}

const Home = () => {
  const [domain, setDomain] = useState<string | null>(null);
  const [data, setData] = useState<WhoisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [infoType, setInfoType] = useState<string>('domain');


  useEffect(() => {
    const fetchData = async () => {
      if (!domain) return;

      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const res = await fetch(`/api/whois?domain=${domain}&outputFormat=JSON`);
        const result = await res.json();

        if (res.ok) {
          setData(result.WhoisRecord);
        } else {
          setError(result.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [domain]);

  const handleLookup = (formData: { domain: string; infoType: string }) => {
    setDomain(formData.domain);
    setInfoType(formData.infoType);
  };

  const calculateDomainAge = (createdDate: string) => {
    const now = new Date();
    const created = new Date(createdDate);
    const diff = new Date(now.getTime() - created.getTime());

    const years = diff.getUTCFullYear() - 1970;
    const months = diff.getUTCMonth();
    const days = diff.getUTCDate() - 1;

    let age = "";
    if (years > 0) age += `${years} year${years > 1 ? 's' : ''}, `;
    if (months > 0) age += `${months} month${months > 1 ? 's' : ''}, `;
    if (days > 0) age += `${days} day${days > 1 ? 's' : ''}`;
    return age.trim().replace(/,\s*$/, '');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Whois Lookup</h1>
      <WhoisForm onSubmit={handleLookup} />
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div>
          <h2 className="text-xl font-bold mt-4">{infoType == 'domain' ?  'Domain Information' : 'Contact Information' }</h2>
          {infoType === 'domain' && (
            <DataTable
              headers={[
                'Domain Name',
                'Registrar',
                'Registration Date',
                'Expiration Date',
                'Estimated Domain Age',
                'Hostnames'
              ]}
              data={[
                data.domainName,
                data.registrarName,
                data.createdDate,
                data.expiresDate,
                calculateDomainAge(data.createdDate),
                data.nameServers.hostNames.join(', ').substring(0, 25)
              ]}
            />
          )}
          {infoType === 'contact' && (
            <DataTable
              headers={[
                'Registrant Name',
                'Technical Contact Name',
                'Administrative Contact Name',
                'Contact Email'
              ]}
              data={[
                data.registrant?.name || '-',
                data.technicalContact?.name || '-',
                data.administrativeContact?.name || '-',
                data.contactEmail || '-'
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
