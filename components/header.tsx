import { MouseEvent, useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Button, CircularProgress, Container, Divider, Menu, MenuItem, Typography } from '@mui/material';
import Link from '../mui/Link';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { user } = session ?? {};
  const { name, image } = user ?? {};
  const loading = status === "loading";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenuClickHandle = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  function signInHandle(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    signIn();
  }

  function avatarMenu() {
    if (!open) return null;

    return (
      <>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <Container>
            <Typography component="p">Signed in as</Typography>
            <Typography className="font-medium truncate" component="p">{name}</Typography>
          </Container>
          <Divider className='pt-1' />
          <Box className="md:hidden">
            <MenuItem
              LinkComponent={Link}
              onClick={handleClose}
            >
              <Link href="/dashboard" className='text-gray-800'>Dashboard</Link>
            </MenuItem>
            <MenuItem
              onClick={handleClose}
            >
              <Link href="/" className='text-gray-800'>Home</Link>
            </MenuItem>
          </Box>
          <MenuItem
            LinkComponent="a"
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              router.push('');
              signOut();
            }}
          >Logout</MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <header className='shadow-md border-gray-200 px-4 lg:px-6 py-2 bg-white ml-4 mr-4 mt-2 rounded-lg'>
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Typography
          component={Link}
          href="/asas"
          variant='h4'
          fontFamily="monospace"
          fontWeight="600"
          className='text-primary-500 cursor-pointer no-underline'
        >Randomista</Typography>

        <div className="flex items-center lg:order-2">
          {loading && <CircularProgress color='success' size={64} />}
          {(!session && !loading) && (
            <a
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-md px-4 lg:px-8 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              href={`/api/auth/signin`}
              onClick={signInHandle}
            >
              Sign in
            </a>
          )}
          {session?.user && (
            <Box className="md:flex justify-center gap-2 pr-8 hidden">
              <Button LinkComponent={Link} href="/" variant='text' className='text-primary-500'>Home</Button>
              <Button LinkComponent={Link} href="/dashboard" variant='text' className='text-primary-500'>Dashboard</Button>
            </Box>
          )}

          {session?.user && (
            <Box
              onClick={openMenuClickHandle}
              className="flex mx-auto max-w-screen-xl"
            >
              <div className="mr-4 mt-1">
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
                    />
                  )}
              </div>
            </Box>
          )}
          {avatarMenu()}
        </div>
      </div>
    </header>
  );
}
