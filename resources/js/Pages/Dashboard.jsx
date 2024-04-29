import FolderTable from '@/Components/Table/Folder/FolderTable.jsx';
import Table from '@/Components/Table/Folder/FolderTable.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router, useForm} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Modal from "@/Components/Modal/Modal.jsx";
import {useState} from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import FolderCreationModal from "@/Components/Modal/FolderCreationModal.jsx";

export default function Dashboard({ auth, folders }) {
    const [showFolderCreationModal, setShowFolderCreationModal] = useState(false);

    const onShowFolderCreationModalClose = () => {
        setShowFolderCreationModal(!showFolderCreationModal);
    }

    return (
        <>
            {showFolderCreationModal && <FolderCreationModal
                user={auth.user}
                show={showFolderCreationModal}
                onClose={onShowFolderCreationModalClose}
            />}
            <AuthenticatedLayout
                user={auth.user}
            >
                <Head title="Accueil" />

                <div className="flex justify-center mt-24">
                    <h1 className="text-2xl">Bienvenue dans <span className="border-b-2 border-b-indigo-500 pb-1">File Manager</span></h1>
                </div>

                <div className="flex flex-col justify-center max-w-7xl mx-auto px-8 mt-24 pb-24">
                    <div className="flex w-full justify-end mb-3">
                        <PrimaryButton
                            className="flex items-center gap-1"
                            onClick={() => setShowFolderCreationModal(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Nouveau
                        </PrimaryButton>
                    </div>
                    <FolderTable
                        folders={folders}
                    />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
