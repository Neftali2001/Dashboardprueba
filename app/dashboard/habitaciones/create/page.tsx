import Form from '@/app/ui/habitaciones/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchHabitaciones } from '@/app/lib/data';
 
export default async function Page() {
  const habitaciones = await fetchHabitaciones();
 
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
      <Form habitaciones={habitaciones} />
    </main>
  );
}