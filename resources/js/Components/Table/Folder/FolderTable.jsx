import {router, useForm, usePage} from "@inertiajs/react";
import MainFolderTable from "@/Pages/Dashboard/MainFolderTable.jsx";

export default function FolderTable({
    folders,
    files,
    setShowFolderCreationModal,
    setShowFolderUpdateModal,
    setShowFileUpdateNameModal,
    setActionFolder,
    setActionFile,
    folderTableType = {
        dataType: 'default'
    }
}) {
    const user = usePage().props.auth.user;

    const breadcrumb = JSON.parse(localStorage.getItem('breadcrumb'));

    if (!breadcrumb) {
        localStorage.setItem('breadcrumb', JSON.stringify([]));
    }

    if (!window.location.href.includes('parent_id')) {
        localStorage.setItem('breadcrumb', JSON.stringify([]));
    }


    const handleFolderNavigation = (folder) => {
        if (breadcrumb) {
            breadcrumb.push({
                name: folder.name,
                id: folder.id
            });

            localStorage.setItem('breadcrumb', JSON.stringify(breadcrumb));
        }

        window.location.search = "parent_id=" + folder.id;
    }

    switch (folderTableType.dataType) {
        case 'default':
            return (
                <MainFolderTable
                    user={user}
                    folders={folders}
                    files={files}
                    setShowFolderCreationModal={setShowFolderCreationModal}
                    setShowFolderUpdateModal={setShowFolderUpdateModal}
                    setShowFileUpdateNameModal={setShowFileUpdateNameModal}
                    setActionFolder={setActionFolder}
                    setActionFile={setActionFile}
                />
            )
    }
}
