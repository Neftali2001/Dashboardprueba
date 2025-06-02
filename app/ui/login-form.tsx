'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="rounded-lg bg-gray-50 p-6 space-y-6 shadow">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Iniciar Sesión</h1>
        <p className="text-sm text-gray-500">Por favor inicie sesión para continuar</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Correo"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            minLength={6}
          />
          <div className="text-sm text-right">
            <Link href="/forgot-password" className="text-emerald-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </div>

      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <Button
        type="submit"
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
        aria-disabled={isPending}
      >
        Iniciar sesión
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>

      {errorMessage && (
        <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
          <ExclamationCircleIcon className="h-5 w-5" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Divider */}
      {/* <div className="flex items-center justify-between">
        <hr className="w-full border-gray-300" />
        <span className="mx-2 text-gray-400 text-sm">o</span>
        <hr className="w-full border-gray-300" />
      </div> */}

      {/* Social Buttons */}
      {/* <div className="flex flex-col gap-3">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <FaGoogle className="text-red-500" />
          Iniciar con Google
        </Button>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <FaFacebook className="text-blue-600" />
          Iniciar con Facebook
        </Button>
      </div> */}

      {/* <p className="text-sm text-center text-gray-500">
        ¿No tienes cuenta?{' '}
        <Link href="/signup" className="text-emerald-700 hover:underline">
          Regístrate
        </Link>
      </p> */}
    </form>
  );
}







// 'use client';
 
// import { lusitana } from '@/app/ui/fonts';
// import {
//   AtSymbolIcon,
//   KeyIcon,
//   ExclamationCircleIcon,
// } from '@heroicons/react/24/outline';
// import { ArrowRightIcon } from '@heroicons/react/20/solid';
// import { Button } from '@/app/ui/button';
// import { useActionState } from 'react';
// import { authenticate } from '@/app/lib/actions';
// import { useSearchParams } from 'next/navigation';
 
// export default function LoginForm() {
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
//   const [errorMessage, formAction, isPending] = useActionState(
//     authenticate,
//     undefined,
//   );
 
//   return (
//     <form action={formAction} className="space-y-3">
//       <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
//         <h1 className={`${lusitana.className} mb-3 text-2xl`}>
//           Porfavor inicie sesion para continuar.
//         </h1>
//         <div className="w-full">
//           <div>
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="Ingrese email"
//                 required
//               />
//               <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <label
//               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
//               htmlFor="password"
//             >
//               Contraseña
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="password"
//                 type="password"
//                 name="password"
//                 placeholder="Ingrese Contraseña"
//                 required
//                 minLength={6}
//               />
//               <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//         </div>
//         <input type="hidden" name="redirectTo" value={callbackUrl} />
//         <Button className="mt-4 w-full" aria-disabled={isPending}>
//           Iniciar sesion <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
//         </Button>
//         <div
//           className="flex h-8 items-end space-x-1"
//           aria-live="polite"
//           aria-atomic="true"
//         >
//           {errorMessage && (
//             <>
//               <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
//               <p className="text-sm text-red-500">{errorMessage}</p>
//             </>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// }