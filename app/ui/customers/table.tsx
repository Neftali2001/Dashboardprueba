import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Clientes
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Correo
                </th>
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  Cantidad
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Estado
                </th> */}
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.email}
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </td> */}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}






// import Image from 'next/image';
// import { lusitana } from '@/app/ui/fonts';
// import Search from '@/app/ui/search';
// import {
  
//   CustomersTableType,
//   FormattedCustomersTable,
// } from '@/app/lib/definitions';

// export default async function CustomersTable({
//   customers,
  
// }: {
//   customers: FormattedCustomersTable[];
// }) {console.log('Customer image URLs:', customers.map(c => c.image_url));
//   return (
//     <div className="w-full">
//       <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
//         Clientes
//       </h1>
//       <Search placeholder="Buscar Clientes..." />
//       <div className="mt-6 flow-root">
//         <div className="overflow-x-auto">
//           <div className="inline-block min-w-full align-middle">
//             <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
//               <div className="md:hidden">
//                 {customers?.map((customer) => (
//                   <div
//                     key={customer.id}
//                     className="mb-2 w-full rounded-md bg-white p-4"
//                   >
//                     <div className="flex items-center justify-between border-b pb-4">
//                       <div>
//                         <div className="mb-2 flex items-center">
//                           <div className="flex items-center gap-3">
//                             <Image
//                               src={customer.image_url}
//                               className="rounded-full"
//                               alt={`${customer.name}'s profile picture`}
//                               width={28}
//                               height={28}
//                             />
//                             <p>{customer.name}</p>
//                           </div>
//                         </div>
//                         <p className="text-sm text-gray-500">
//                           {customer.email}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex w-full items-center justify-between border-b py-5">
//                       <div className="flex w-1/2 flex-col">
//                         <p className="text-xs">Pendiente</p>
//                         <p className="font-medium">{customer.total_pending}</p>
//                       </div>
//                       <div className="flex w-1/2 flex-col">
//                         <p className="text-xs">Pagado</p>
//                         <p className="font-medium">{customer.total_paid}</p>
//                       </div>
//                     </div>
//                     <div className="pt-4 text-sm">
//                       <p>{customer.total_invoices} Facturas</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <table className="hidden min-w-full rounded-md text-gray-900 md:table">
//                 <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
//                   <tr>
//                     <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
//                       Nombre
//                     </th>
//                     <th scope="col" className="px-3 py-5 font-medium">
//                       Correo
//                     </th>
//                     <th scope="col" className="px-3 py-5 font-medium">
//                       Total Facturas
//                     </th>
//                     <th scope="col" className="px-3 py-5 font-medium">
//                       Total Pendiente
//                     </th>
//                     <th scope="col" className="px-4 py-5 font-medium">
//                       Total Pagado
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-gray-200 text-gray-900">
//                   {customers.map((customer) => (
//                     <tr key={customer.id} className="group">
//                       <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
//                         <div className="flex items-center gap-3">
//                           <Image
//                             src={customer.image_url}
//                             className="rounded-full"
//                             alt={`${customer.name}'s profile picture`}
//                             width={28}
//                             height={28}
//                           />
//                           <p>{customer.name}</p>
//                         </div>
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
//                         {customer.email}
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
//                         {customer.total_invoices}
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
//                         {customer.total_pending}
//                       </td>
//                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
//                         {customer.total_paid}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
