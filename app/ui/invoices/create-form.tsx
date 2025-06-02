'use client';
import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { useState } from 'react';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  // Estado para permitir campos adicionales de niños
  const [permitirNinos, setPermitirNinos] = useState(false);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        {/* Título en Español */}
        <div className="mb-4">
          <label htmlFor="titulo_es" className="mb-2 block text-sm font-medium">
            Título en Español
          </label>
          <input
            id="titulo_es"
            name="titulo_es"
            type="text"
            placeholder="Ingrese el título en Español"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm placeholder:text-gray-500"
            required
          />
        </div>

        {/* Título en Inglés */}
        <div className="mb-4">
          <label htmlFor="titulo_en" className="mb-2 block text-sm font-medium">
            Title in English
          </label>
          <input
            id="titulo_en"
            name="titulo_en"
            type="text"
            placeholder="Enter the title in English"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm placeholder:text-gray-500"
            required
          />
        </div>

        {/* Descripción en Español */}
        <div className="mb-4">
          <label htmlFor="descripcion_es" className="mb-2 block text-sm font-medium">
            Descripción en Español
          </label>
          <textarea
            id="descripcion_es"
            name="descripcion_es"
            placeholder="Ingrese la descripción en Español"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm placeholder:text-gray-500"
            required
          />
        </div>

        {/* Descripción en Inglés */}
        <div className="mb-4">
          <label htmlFor="descripcion_en" className="mb-2 block text-sm font-medium">
            Description in English
          </label>
          <textarea
            id="descripcion_en"
            name="descripcion_en"
            placeholder="Enter the description in English"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm placeholder:text-gray-500"
            required
          />
        </div>

        {/* Tipo de habitación */}
        <div className="mb-4">
          <label htmlFor="tipo" className="mb-2 block text-sm font-medium">
            Tipo de habitación
          </label>
          <select
            id="tipo"
            name="tipo"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm"
            required
          >
            <option value="suite">Suite</option>
            <option value="doble">Doble</option>
            <option value="individual">Individual</option>
          </select>
        </div>

        {/* Número de habitaciones */}
        <div className="mb-4">
          <label htmlFor="cantidad" className="mb-2 block text-sm font-medium">
            Número de habitaciones
          </label>
          <input
            id="cantidad"
            name="cantidad"
            type="number"
            placeholder="Ingrese el número de habitaciones"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm"
            required
          />
        </div>

        {/* Identificación de habitaciones */}
        <div className="mb-4">
          <label htmlFor="ids" className="mb-2 block text-sm font-medium">
            Identificación de habitaciones
          </label>
          <textarea
            id="ids"
            name="ids"
            placeholder="Ingrese los IDs de las habitaciones (separados por coma)"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm"
            required
          />
        </div>

        {/* Tipo de vista */}
        <div className="mb-4">
          <label htmlFor="vista" className="mb-2 block text-sm font-medium">
            Tipo de vista
          </label>
          <select
            id="vista"
            name="vista"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm"
            required
          >
            <option value="mar">Vista al mar</option>
            <option value="ciudad">Vista a la ciudad</option>
            <option value="piscina">Vista a la piscina</option>
          </select>
        </div>

        {/* Tamaño de la habitación */}
        <div className="mb-4">
          <label htmlFor="tamano" className="mb-2 block text-sm font-medium">
            Tamaño de la habitación (en m²)
          </label>
          <input
            id="tamano"
            name="tamano"
            type="number"
            placeholder="Ingrese el tamaño en m²"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm"
            required
          />
        </div>

        {/* Capacidad de la habitación */}
        <div className="mb-4">
          <label htmlFor="adultos" className="mb-2 block text-sm font-medium">
            Número de adultos
          </label>
          <input
            id="adultos"
            name="adultos"
            type="number"
            placeholder="Ingrese la cantidad de adultos"
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm"
            required
          />
        </div>

        {/* Switch para permitir niños */}
        <div className="mb-4">
          <label htmlFor="permitir_ninos" className="flex items-center">
            <input
              type="checkbox"
              id="permitir_ninos"
              name="permitir_ninos"
              onChange={(e) => setPermitirNinos(e.target.checked)}
              className="mr-2"
            />
            ¿Permitir niños?
          </label>
        </div>

        {/* Capacidad de niños */}
        {permitirNinos && (
          <>
            <div className="mb-4">
              <label htmlFor="ninos" className="mb-2 block text-sm font-medium">
                Número de niños
              </label>
              <input
                id="ninos"
                name="ninos"
                type="number"
                placeholder="Ingrese la cantidad de niños"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="edad_min" className="mb-2 block text-sm font-medium">
                Edad mínima
              </label>
              <input
                id="edad_min"
                name="edad_min"
                type="number"
                placeholder="Edad mínima"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="edad_max" className="mb-2 block text-sm font-medium">
                Edad máxima
              </label>
              <input
                id="edad_max"
                name="edad_max"
                type="number"
                placeholder="Edad máxima"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm"
              />
            </div>
          </>
        )}

        {/* Imágenes */}
        <div className="mb-4">
          <label htmlFor="imagenes" className="mb-2 block text-sm font-medium">
            Subir imágenes de la habitación
          </label>
          <input
            id="imagenes"
            name="imagenes"
            type="file"
            multiple
            className="block w-full rounded-md border border-gray-200 py-2 text-sm"
            required
          />
        </div>

        {/* Imagen principal */}
        <div className="mb-4">
          <label htmlFor="imagen_principal" className="mb-2 block text-sm font-medium">
            Seleccionar imagen principal
          </label>
          <select
            id="imagen_principal"
            name="imagen_principal"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm"
            required
          >
            <option value="imagen1">Imagen 1</option>
            <option value="imagen2">Imagen 2</option>
            <option value="imagen3">Imagen 3</option>
          </select>
        </div>

      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/habitaciones"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Guardar habitación</Button>
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
//           <label htmlFor="amount" className="mb-2 block text-sm font-medium">
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
//           </div>
//         </div>

//         {/* Invoice Status */}
//         <fieldset>
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
//         </fieldset>
//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/invoices"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancelar
//         </Link>
//         <Button type="submit">Crear Factura</Button>
//       </div>
//     </form>
    
//   );
   
// }
