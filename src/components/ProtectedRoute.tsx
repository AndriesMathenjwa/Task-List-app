import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/services/firebase'; // Make sure to adjust the import path to your Firebase setup
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login');
            }
        });

        return () => unsubscribe(); 
    }, [router]);

    return <>{children}</>;
};

export default ProtectedRoute;
