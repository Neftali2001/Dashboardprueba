import Form from '@/app/ui/habitaciones/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Habitaciones', href: '/dashboard/habitaciones' },
          {
            label: 'Crear Habitaciones',
            href: '/dashboard/habitaciones/create',
            active: true,
          },
        ]}
      />
      {/* <Form customers={customers} /> */}
    </main>
  );
}