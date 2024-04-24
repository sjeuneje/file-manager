import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bienvenue dans File Manager</h2>}
        >
            <Head title="Accueil" />

            <div className="flex justify-center mt-24">
                <h1 className="text-2xl">Bienvenue dans File Manager</h1>
            </div>
        </AuthenticatedLayout>
    );
}
