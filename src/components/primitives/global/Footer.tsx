import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='py-[30px] px-6 border-t border-gray-100 md:py-[60px] md:px-10'>
      <div className='flex flex-wrap justify-between items-center gap-5 md:max-w-[1520px] md:mx-auto md:flex-nowrap'>
        <p className='text-13 font-medium text-gray-400 order-2 md:order-1'>
          ©codeit - 2023
        </p>
        <nav className='flex items-center justify-center gap-6 text-13 font-medium text-gray-600 w-full shrink-0 order-1 md:order-2 md:shrink-1 md:w-auto'>
          <span>Privacy Policy</span>
          <span>∙</span>
          <span>FAQ</span>
        </nav>
        <ul className='flex items-center gap-4 order-3'>
          <li>
            <Image
              src='/images/icons/FacebookIcon.svg'
              width={20}
              height={20}
              alt='페이스북 바로가기'
            />
          </li>
          <li>
            <Image
              src='/images/icons/InstagramIcon.svg'
              width={20}
              height={20}
              alt='인스타그램 바로가기'
            />
          </li>
          <li>
            <Image
              src='/images/icons/YoutubeIcon.svg'
              width={20}
              height={20}
              alt='유튜브 바로가기'
            />
          </li>
          <li>
            <Image
              src='/images/icons/XIcon.svg'
              width={20}
              height={20}
              alt='X 바로가기'
            />
          </li>
        </ul>
      </div>
    </footer>
  );
}
