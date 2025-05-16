export default function customers() {
  return <p>Pagina de clientes</p>;
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
