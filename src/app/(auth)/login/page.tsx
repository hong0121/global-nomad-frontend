import LoginForm from '@/src/components/pages/login/LoginForm';
import AuthFormHelper from '@/src/components/primitives/auth/AuthFormHelper';

export default function LoginPage() {
  return (
    <div className='max-w-[640px] mx-auto my-[30px]'>
      <LoginForm />
      <AuthFormHelper
        mainText='회원이 아니신가요?'
        linkText='회원가입하기'
        linkUrl='/signup'
      />
    </div>
  );
}
