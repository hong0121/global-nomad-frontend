import Link from 'next/link';
import React from 'react';

const gnbMenu = [
  { href: '/login', text: '로그인' },
  { href: '/signup', text: '회원가입' },
];

export default function LoggingInGnb() {
  return (
    <ul className='flex items-center gap-[10px] md:gap-3'>
      {gnbMenu.map(({ href, text }) => (
        <li key={href}>
          <Link
            href={href}
            className='block py-2 px-3 text-14 font-medium md:py-3 md:px-4'
          >
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
