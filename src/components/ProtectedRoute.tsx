import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { LOGIN_ROUTE } from '@/constants/routes';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push(LOGIN_ROUTE);
            }
        });

        return () => unsubscribe();
    }, [router]);

    return <>{children}</>;
};

export default ProtectedRoute;
