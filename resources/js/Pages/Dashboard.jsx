import FolderTable from '@/Components/Table/Folder/FolderTable.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router, useForm} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useState} from "react";
import FolderCreationModal from "@/Components/Modal/FolderCreationModal.jsx";
import Dropdown from "@/Components/Dropdown.jsx";

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
                header={
                    <h1 className="text-xl font-bold">Mon Drive</h1>
                }
            >
                <Head title="Mon stockage" />

                <div className="flex flex-col justify-center max-w-7xl mx-auto px-8 mt-3 pb-24">
                    {/*{folders.length > 0 && <div className="flex w-full justify-end mb-3">*/}
                    {/*    <PrimaryButton*/}
                    {/*        className="flex items-center gap-1"*/}
                    {/*        onClick={() => setShowFolderCreationModal(true)}*/}
                    {/*    >*/}
                    {/*        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">*/}
                    {/*            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />*/}
                    {/*        </svg>*/}
                    {/*        Nouveau*/}
                    {/*    </PrimaryButton>*/}
                    {/*</div>}*/}
                    {/*<div>*/}
                    {/*    <h2 className="text-2xl mb-5">Mon stockage</h2>*/}
                    {/*</div>*/}
                    <FolderTable
                        folders={folders}
                        setShowFolderCreationModal={setShowFolderCreationModal}
                    />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
