import AuthFormHelper from '@/src/components/primitives/auth/AuthFormHelper';
import KakaoSignupButton from '@/src/components/pages/signup/KakaoSignupButton';
import SignupForm from '@/src/components/pages/signup/SignupForm';

export default function SignupPage() {
  return (
    <div className='max-w-[640px] mx-auto my-[30px]'>
      <SignupForm />
      <KakaoSignupButton />
      <AuthFormHelper
        mainText='회원이신가요?'
        linkText='로그인하기'
        linkUrl='/login'
      />
    </div>
  );
}
