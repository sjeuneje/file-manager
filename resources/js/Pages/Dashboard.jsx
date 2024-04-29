import FolderTable from '@/Components/Table/FolderTable';
import Table from '@/Components/Table/FolderTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, folders }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bienvenue dans File Manager</h2>}
        >
            <Head title="Accueil" />

            <div className="flex justify-center mt-24">
                <h1 className="text-2xl">Bienvenue dans <span className="border-b-2 border-b-indigo-500 pb-1">File Manager</span></h1>
            </div>

            <div className="flex justify-center max-w-7xl mx-auto px-8 mt-24 pb-24">
                <FolderTable
                    folders={folders}
                />
            </div>
        </AuthenticatedLayout>
    );
}
