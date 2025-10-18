import Logo from '@/assets/images/logo.svg?react';

export default function LoggedOutHeader() {
  return (
    <>
      <Logo className="text-red-500" />
      {/* <img src={Logo} alt="" /> */}
    </>
  );
}
