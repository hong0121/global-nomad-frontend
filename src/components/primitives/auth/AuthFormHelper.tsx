import Link from 'next/link';

interface Props {
  mainText: string;
  linkText: string;
  linkUrl: string;
}

export default function AuthFormHelper({ mainText, linkText, linkUrl }: Props) {
  return (
    <p className='flex items-center justify-center gap-1 mt-6 text-gray-400 md:mt-[30px]'>
      {mainText}
      <Link href={linkUrl} className='underline underline-offset-3'>
        {linkText}
      </Link>
    </p>
  );
}
