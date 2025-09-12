import KakaoLoginButton from '@/src/components/pages/login/KakaoLoginButton';
import LoginForm from '@/src/components/pages/login/LoginForm';
import AuthFormHelper from '@/src/components/primitives/auth/AuthFormHelper';

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <KakaoLoginButton />
      <AuthFormHelper
        mainText='회원이 아니신가요?'
        linkText='회원가입하기'
        linkUrl='/signup'
      />
    </>
  );
}
