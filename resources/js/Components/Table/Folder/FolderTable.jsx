import {router, useForm, usePage} from "@inertiajs/react";
import DeleteFolder from "@/Components/Table/Folder/Partials/DeleteFolder.jsx";
import UpdateFolderName from "@/Components/Table/Folder/Partials/UpdateFolderName.jsx";
import {useParams} from "react-router";
import DeleteFile from "@/Components/Table/File/DeleteFile.jsx";
import UpdateFileName from "@/Components/Table/File/UpdateFileName.jsx";
import DownloadFolder from "@/Components/Table/Folder/Partials/DownloadFolder.jsx";

export default function FolderTable({
    folders,
    files,
    setShowFolderCreationModal,
    setShowFolderUpdateModal,
    setShowFileUpdateNameModal,
    setActionFolder,
    setActionFile
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

    if (folders.length < 1 && files.length < 1) {
        return (
            <div className="flex flex-col justify-center items-center w-full">
                <h3 className="text-center mb-2 mt-12">Il semblerait que ce dossier soit vide...</h3>
                <div>
                    <button
                        type="submit"
                        className="cursor-pointer text-gray-900 hover:text-gray-800 underline"
                        onClick={() => setShowFolderCreationModal(true)}
                    >
                        Stocker un nouveau dossier maintenant
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="border rounded-lg w-full">
                <div className="relative w-full overflow-auto">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&amp;_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[200px]">
                                        Nom
                                    </th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                        Dernière modification
                                    </th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                        Propriétaire
                                    </th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                        Taille
                                    </th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[200px]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="[&amp;_tr:last-child]:border-0">
                                {folders.map((folder) => {
                                    return (
                                        <tr
                                            onDoubleClick={() => handleFolderNavigation(folder)}
                                            key={folder.id}
                                            className="cursor-pointer border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted hover:bg-indigo-100 transition ease-in-out duration-150"
                                        >
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                <div className="flex flex-row items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-indigo-600">
                                                        <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                                                    </svg>
                                                    <p className="max-w-[300px] overflow-hidden float-left text-ellipsis whitespace-nowrap">
                                                        {folder.name}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{new Date(folder.updated_at).toLocaleDateString()}</td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{folder.owner.name}</td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{(folder.size / (1024 * 1024)).toFixed(2)} MB</td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                <div className="flex items-center">
                                                    <DownloadFolder
                                                        folder={folder}
                                                        setActionFolder={setActionFolder}
                                                        // setShowFolderUpdateModal={}
                                                    />
                                                    <UpdateFolderName
                                                        folder={folder}
                                                        setActionFolder={setActionFolder}
                                                        setShowFolderUpdateModal={setShowFolderUpdateModal}
                                                    />
                                                    {/*<button*/}
                                                    {/*    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 hover:bg-indigo-300 rounded-full"*/}
                                                    {/*>*/}
                                                    {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">*/}
                                                    {/*        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />*/}
                                                    {/*    </svg>*/}
                                                    {/*</button>*/}
                                                    <DeleteFolder
                                                        folderId={folder.id}
                                                        userId={user.id}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {files.map((file) => {
                                    return (
                                        <tr key={file.id} className="cursor-pointer border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted hover:bg-indigo-100 transition ease-in-out duration-150">
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                <div className="flex flex-row items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-indigo-400">
                                                        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                                                        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                                                    </svg>
                                                    <p className="max-w-[300px] overflow-hidden float-left text-ellipsis whitespace-nowrap">
                                                        {file.name}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{new Date(file.updated_at).toLocaleDateString()}</td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{file.owner.name}</td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{(file.size / (1024 * 1024)).toFixed(2)} MB</td>
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                <div className="flex items-center">
                                                    <UpdateFileName
                                                        file={file}
                                                        setActionFile={setActionFile}
                                                        setShowFileUpdateNameModal={setShowFileUpdateNameModal}
                                                    />
                                                    <DeleteFile
                                                        fileId={file.id}
                                                        userId={user.id}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
