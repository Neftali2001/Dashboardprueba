import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { CreateClientes } from '@/app/ui/customers/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
 
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
 
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Clientes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscando Clientes..." />
        <CreateClientes  />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
      {/* @ts-ignore */}
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
         
      </div>
    </div>
  );
}


// import { Suspense } from 'react';
// import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';
// import SearchParamsWrapper from '@/app/ui/SearchParamsWrapper';

// export default async function Page() {
//   const rawCustomers = await fetchCustomers();

//   const customers = rawCustomers.map((row: any) => ({
//     id: row.id,
//     name: row.name,
//     email: row.email,
//     image_url: row.image_url
//       ? `/customers/${row.image_url}`
//       : '/customers/default-avatar.png',
//     total_invoices: row.total_invoices ?? 0,
//     total_pending: row.total_pending ?? 0,
//     total_paid: row.total_paid ?? 0,
//   }));

//   return (
//     <main>
//       <Breadcrumbs
//         breadcrumbs={[
//           { label: 'Dashboard', href: '/dashboard' },
//           { label: 'Clientes', href: '/dashboard/customers', active: true },
//         ]}
//       />
//       <Suspense fallback={<div>Cargando tabla de clientes...</div>}>
//         <SearchParamsWrapper customers={customers} />
//       </Suspense>
//     </main>
//   );
// }
