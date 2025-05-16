import CustomersTable from '@/app/ui/customers/table';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  const rawCustomers = await fetchCustomers();

  const customers = rawCustomers.map((row: any) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    image_url: row.image_url || '/default-avatar.png',
    total_invoices: row.total_invoices ?? 0,
    total_pending: row.total_pending ?? 0,
    total_paid: row.total_paid ?? 0,
  }));

  return (
    <main>
      {/* <Breadcrumbs
  breadcrumbs={[
    { label: 'Clientes', href: '/dashboard/customers' },
    {
      // label: 'Listado de clientes',
      href: '/dashboard/customers/list',
      active: true,
    },
  ]}
/> */}

      <CustomersTable customers={customers} />
    </main>
  );
}
