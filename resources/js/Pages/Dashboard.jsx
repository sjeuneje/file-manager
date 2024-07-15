import FolderTable from '@/Components/Table/Folder/FolderTable.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router, useForm} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useState} from "react";
import FolderCreationModal from "@/Components/Modal/FolderCreationModal.jsx";
import Dropdown from "@/Components/Dropdown.jsx";
import FolderUpdateModal from "@/Components/Modal/FolderUpdateModal.jsx";

export default function Dashboard({ auth, folders }) {
    const [showFolderCreationModal, setShowFolderCreationModal] = useState(false);
    const [showFolderUpdateModal, setShowFolderUpdateModal] = useState(false);

    /**
     * The ID of the folder who we need to make actions on. (eg: modify the name)
     */
    const [actionFolderId, setActionFolderId] = useState(0);

    const onShowFolderCreationModalClose = () => {
        setShowFolderCreationModal(!showFolderCreationModal);
    }

    const onShowFolderUpdateModalClose = () => {
        setShowFolderUpdateModal(!showFolderUpdateModal);
    }

    return (
        <>
            {showFolderCreationModal && <FolderCreationModal
                user={auth.user}
                show={showFolderCreationModal}
                onClose={onShowFolderCreationModalClose}
            />}
            {showFolderUpdateModal && <FolderUpdateModal
                user={auth.user}
                show={showFolderUpdateModal}
                onClose={onShowFolderUpdateModalClose}
            />}
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h1 className="text-xl font-bold">Mon Drive</h1>
                }
            >
                <Head title="Mon stockage" />

                <div className="flex flex-col justify-center max-w-7xl mx-auto px-8 mt-3 pb-24">
                    <FolderTable
                        folders={folders}
                        setShowFolderCreationModal={setShowFolderCreationModal}
                    />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
