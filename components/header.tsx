import { MouseEvent, useState, useRef } from 'react';
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useOnClickOutside } from '../hooks/useClickOutside';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { useRouter } from 'next/router';
export default function Header() {
  const { data: session, status } = useSession();

  const clickRef = useRef(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { user } = session ?? {};
  const { name, image } = user ?? {};
  const loading = status === "loading";


  function signInHandle(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    signIn();
  }

  function avatarMenu() {
    if (!open) return null;

    return (
      <div ref={clickRef} className="mt-1 fixed z-10 sm:right-4 md:right-auto bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Signed in as</div>
          <div className="font-medium truncate">{name}</div>
        </div>
        <nav>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
            </li>
            <li>
              <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
            </li>
          </ul>
          <div className="py-1">
            <a
              href={`/api/auth/signout`}
              onClick={(e) => {
                e.preventDefault();
                signOut();
                router.push('');
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >Sign out</a>
          </div>
        </nav>
      </div>
    );
  }

  function openMenuClickHandle() {
    setOpen(!open);
  }

  useOnClickOutside(clickRef, () => setOpen(false));

  if (loading) return null;

  return (
    <header className='shadow-md border-gray-200 px-4 lg:px-6 py-2 bg-white ml-4 mr-4 mt-2 rounded-lg'>
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <span className="self-center text-3xl font-semibold whitespace-nowrap text-primary-900">Flowbite</span>
        <div className="flex items-center lg:order-2">
          {!session && (
            <a
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-md px-4 lg:px-8 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              href={`/api/auth/signin`}
              onClick={signInHandle}
            >
              Sign in
            </a>
          )}
          {session?.user && (
            <>
              {session?.user && (
                <span className="flex mx-auto max-w-screen-xl">
                  <div className="mr-4 mt-1" onClick={openMenuClickHandle}>
                    {image
                      ? (
                        <Image
                          width={68}
                          height={68}
                          className="w-16 h-16 p-1 cursor-pointer rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                          src={image}
                          alt="User dropdown"
                        />
                      ) : (
                        <AccountCircleIcon
                          sx={{ width: 64, height: 64, color: 'gray' }}
                          className="cursor-pointer rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                        />)}

                    {avatarMenu()}
                  </div>
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
