import { useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import PageError from '@/pages/sys/error/PageError';
import { useUserToken } from '@/store/userStore';

import { useRouter } from '../hooks';

type Props = {
  children: React.ReactNode;
};
export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { accessToken, expiresIn } = useUserToken();
  console.log('accessToken', accessToken, expiresIn);
  const isTokenExpired = Date.now() > new Date(expiresIn!).getTime();
  console.log('token expired', isTokenExpired);

  const check = useCallback(() => {
    if (!accessToken || isTokenExpired) {
      router.replace('/login');
    }
  }, [router, accessToken, isTokenExpired]);

  useEffect(() => {
    check();
  }, [check]);

  return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}
