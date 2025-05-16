import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';

import { Suspense } from 'react';


export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Columna Izquierda: Login */}
        <div className="w-full md:w-1/2 p-8 flex flex-col space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-24">
              <AcmeLogo />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Bienvenido</h1>
          </div>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>

        {/* Columna Derecha: Panel Visual */}
        <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-primarycolor text-white p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Buenos trabajos</h2>
          <p className="text-lg mb-2">estan esperandote</p>
          <p className="text-lg font-semibold mb-4">Registrate ahora!</p>
          <img src="/Img6.png" alt="compu" className="w-1/2" />
        </div>
      </div>
    </main>
  );
}


// import AcmeLogo from '@/app/ui/acme-logo';
// import LoginForm from '@/app/ui/login-form';
// import { Suspense } from 'react';
 
// export default function LoginPage() {
//   return (
//     <main className="flex items-center justify-center md:h-screen">
//       <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
//         <div className="flex h-20 w-full items-end rounded-lg p-3 md:h-36"style={{ backgroundColor: '#005a53' }}>
//           <div className="w-32 text-white md:w-36">
//             <AcmeLogo />
//           </div>
//         </div>
//         <Suspense>
//           <LoginForm />
//         </Suspense>
//       </div>
//     </main>
//   );
// }