import FolderTable from '@/Components/Table/Folder/FolderTable.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from "react";
import FolderCreationModal from "@/Components/Modal/FolderCreationModal.jsx";
import FolderUpdateModal from "@/Components/Modal/FolderUpdateModal.jsx";
import { getParentId } from "@/Utils/urls.js";
import Breadcrumb from "@/Components/Breadcrumb.jsx";
import FileUpdateNameModal from "@/Components/Modal/FileUpdateNameModal.jsx";
import { types } from "@/Utils/folderTableTypes.js";

export default function DashboardTrash({ auth, folders, files }) {
    const [showFolderCreationModal, setShowFolderCreationModal] = useState(false);
    const [showFolderUpdateModal, setShowFolderUpdateModal] = useState(false);
    const [showFileUpdateNameModal, setShowFileUpdateNameModal] = useState(false);

    const parentId = getParentId();

    /**
     * The folder who we need to make actions on. (eg: modify the name)
     */
    const [actionFolder, setActionFolder] = useState(0);

    /**
     * The file we need to make actions on.
     * The ID of the file.
     */
    const [actionFile, setActionFile] = useState(0);

    const onShowFolderCreationModalClose = () => setShowFolderCreationModal(!showFolderCreationModal);
    const onShowFolderUpdateModalClose = () => setShowFolderUpdateModal(!showFolderUpdateModal);
    const onShowFileUpdateNameModalClose = () => setShowFileUpdateNameModal(!showFileUpdateNameModal);

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
            {showFileUpdateNameModal && <FileUpdateNameModal
                file={actionFile}
                user={auth.user}
                show={showFileUpdateNameModal}
                onClose={onShowFileUpdateNameModalClose}
            />}
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <Breadcrumb
                        title='Corbeille'
                        href='/dashboard/trash'
                    />
                }
            >
                <Head title="Corbeille" />

                <div className="flex flex-col justify-center max-w-7xl mx-auto px-8 mt-3 pb-24">
                    <FolderTable
                        folders={folders}
                        files={files}
                        setShowFolderCreationModal={setShowFolderCreationModal}
                        setShowFolderUpdateModal={setShowFolderUpdateModal}
                        setShowFileUpdateNameModal={setShowFileUpdateNameModal}
                        setActionFolder={setActionFolder}
                        setActionFile={setActionFile}
                        folderTableType={types.trash}
                    />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
