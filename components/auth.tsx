import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Auth = ({ children }) => {
    const [session, loading] = useSession();
    const hasUser = !!session?.user;
    const router = useRouter();
    useEffect(() => {
        if (!loading && !hasUser) {
            router.push('/login');
        }
    }, [loading, hasUser]);
    if (loading || !hasUser) {
        return <div>Waiting for session...</div>;
    }
    return children;
};
export default Auth;
