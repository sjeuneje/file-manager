import FolderTable from '@/Components/Table/Folder/FolderTable.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router, useForm} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useEffect, useState} from "react";
import FolderCreationModal from "@/Components/Modal/FolderCreationModal.jsx";
import Dropdown from "@/Components/Dropdown.jsx";
import FolderUpdateModal from "@/Components/Modal/FolderUpdateModal.jsx";
import {useParams} from "react-router";
import {useSearchParams} from "react-router-dom";
import { getParentId } from "@/Utils/urls.js";
import Breadcrumb from "@/Components/Breadcrumb.jsx";

export default function Dashboard({ auth, folders, files }) {
    const [showFolderCreationModal, setShowFolderCreationModal] = useState(false);
    const [showFolderUpdateModal, setShowFolderUpdateModal] = useState(false);

    const parentId = getParentId();

    /**
     * The folder who we need to make actions on. (eg: modify the name)
     */
    const [actionFolder, setActionFolder] = useState(0);

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
                parentId={parentId}
            />}
            {showFolderUpdateModal && <FolderUpdateModal
                folder={actionFolder}
                user={auth.user}
                show={showFolderUpdateModal}
                onClose={onShowFolderUpdateModalClose}
            />}
            <AuthenticatedLayout
                user={auth.user}
                header={<Breadcrumb />}
            >
                <Head title="Mon stockage" />

                <div className="flex flex-col justify-center max-w-7xl mx-auto px-8 mt-3 pb-24">
                    <FolderTable
                        folders={folders}
                        files={files}
                        setShowFolderCreationModal={setShowFolderCreationModal}
                        setShowFolderUpdateModal={setShowFolderUpdateModal}
                        setActionFolder={setActionFolder}
                    />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
