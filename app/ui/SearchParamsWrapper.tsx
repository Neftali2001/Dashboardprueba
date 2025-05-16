// app/ui/customers/SearchParamsWrapper.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import CustomersTable from 'app/ui/customers/table';

export default function SearchParamsWrapper({ customers }: { customers: any[] }) {
  const searchParams = useSearchParams();
  const search = searchParams.get('q') ?? '';

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return <CustomersTable customers={filteredCustomers} />;
}
