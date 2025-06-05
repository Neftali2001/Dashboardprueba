import Form from '@/app/ui/customers/create-form';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clientes', href: '/dashboard/customers' },
          {
            label: 'Crear Cliente',
            href: '/dashboard/customers/create',
            active: true,
          },
        ]}
      />
      {/* @ts-ignore */}
      <Form customers={customers} />
    </main>
  );
}