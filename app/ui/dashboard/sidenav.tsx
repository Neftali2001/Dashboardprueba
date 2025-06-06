import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { auth,signOut } from '@/auth';

export default async function SideNav() {

  
  const session = await auth();
   const userImage = session?.user?.image|| '/usuario.png';
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-primaryGreen p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        
        <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-bg-primaryGreen md:flex-none md:justify-start md:p-2 md:px-3">
        
            {/* <PowerIcon className="w-6" /> */}
                {userImage && (
            <img
            src={userImage}
            alt="Foto de perfil"
            className="h-8 w-8 rounded-full object-cover"
             />
             )}
            <div className="hidden md:block">Cerrar sesión</div>
          </button>
          
        </form>
      </div>
    </div>
  );
}
