'use client';
import Link from 'next/link';
import { useActionState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

// Debes definir esta función en tu lógica
import { createCustomer, State } from '@/app/lib/actions';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCustomer, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            Nombre
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Ej. Juan"
            required
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Apellido */}
        <div className="mb-4">
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
            Apellido
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Ej. Pérez"
            required
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Correo electrónico */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            required
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Teléfono */}
        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Ej. +52 123 456 7890"
            required
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Documento de identidad */}
        <div className="mb-4">
          <label htmlFor="documentId" className="mb-2 block text-sm font-medium">
            Documento de identidad
          </label>
          <input
            id="documentId"
            name="documentId"
            type="text"
            placeholder="Ej. DNI, pasaporte"
            required
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Dirección */}
        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Dirección
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Calle, número, ciudad"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Errores */}
        {state.message && (
          <p className="mt-2 text-sm text-red-500">
            {state.message}
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Registrar Cliente</Button>
      </div>
    </form>
  );
}








// 'use client';
// import { CustomerField } from '@/app/lib/definitions';
// import Link from 'next/link';

// import {
//   CheckIcon,
//   ClockIcon,
//   CurrencyDollarIcon,
//   UserCircleIcon,
// } from '@heroicons/react/24/outline';
// import { Button } from '@/app/ui/button';
// import { createInvoice, State } from '@/app/lib/actions';
// import { useActionState } from 'react';

// export default function Form({ customers }: { customers: CustomerField[] }) {
//    const initialState: State = { message: null, errors: {} };
//    const [state, formAction] = useActionState(createInvoice, initialState);
   
//   return (
    
//    <form action={formAction}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         {/* Customer Name */}
//         <div className="mb-4">
//           <label htmlFor="customer" className="mb-2 block text-sm font-medium">
//             Elija cliente
//           </label>
//           <div className="relative">
//             <select
//               id="customer"
//               name="customerId"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               defaultValue=""
//               required
//               aria-describedby="customer-error"
//             >
//               <option value="" disabled>
//                 Seleccione un cliente
//               </option>
//               {customers.map((customer) => (
//                 <option key={customer.id} value={customer.id}>
//                   {customer.name}
//                 </option>
                
//               ))}
              
//             </select>
            
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//           <div id="customer-error" aria-live="polite" aria-atomic="true">
//         {state.errors?.customerId &&
//           state.errors.customerId.map((error: string) => (
//             <p className="mt-2 text-sm text-red-500" key={error}>
//               {error}
//             </p>
//           ))}
//       </div>
//         </div>

//         {/* Invoice Amount */}
//         <div className="mb-4">
//           {/* <label htmlFor="amount" className="mb-2 block text-sm font-medium">
//             Elige una cantidad
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                 id="amount"
//                 name="amount"
//                 type="number"
//                 step="0.01"
//                 placeholder="Ingrese el monto"
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 required
//               />
//               <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div> */}
//         </div>

//         {/* Invoice Status */}
//         {/* <fieldset>
//           <legend className="mb-2 block text-sm font-medium">
//            Establezca el estado de la factura
//           </legend>
//           <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   id="pending"
//                   name="status"
//                   type="radio"
//                   value="pending"
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                   required
//                 />
//                 <label
//                   htmlFor="pending"
//                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
//                 >
//                   Pendiente <ClockIcon className="h-4 w-4" />
//                 </label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   id="paid"
//                   name="status"
//                   type="radio"
//                   value="paid"
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                   required
//                 />
//                 <label
//                   htmlFor="paid"
//                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
//                 >
//                   Pagado <CheckIcon className="h-4 w-4" />
//                 </label>
//               </div>
//             </div>
//           </div>
//         </fieldset> */}
//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/customers"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancelar
//         </Link>
//         <Button type="submit">Crear Clientes</Button>
//       </div>
//     </form>
    
//   );
   
// }