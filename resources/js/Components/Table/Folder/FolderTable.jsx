import {router, useForm, usePage} from "@inertiajs/react";
import DeleteFolder from "@/Components/Table/Folder/Partials/DeleteFolder.jsx";
import UpdateFolderName from "@/Components/Table/Folder/Partials/UpdateFolderName.jsx";
import {useParams} from "react-router";

export default function FolderTable({ folders, files, setShowFolderCreationModal, setShowFolderUpdateModal, setActionFolder }) {
    const user = usePage().props.auth.user;

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
                                            onDoubleClick={() => window.location.search = "parent_id=" + folder.id}
                                            key={folder.id}
                                            className="cursor-pointer border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted hover:bg-indigo-100 transition ease-in-out duration-150"
                                        >
                                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                <div className="flex flex-row items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
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
                                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 hover:bg-indigo-300 rounded-full">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="h-4 w-4"
                                                        >
                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                            <polyline points="7 10 12 15 17 10"></polyline>
                                                            <line x1="12" x2="12" y1="15" y2="3"></line>
                                                        </svg>
                                                        <span className="sr-only">Download</span>
                                                    </button>
                                                    <UpdateFolderName
                                                        folder={folder}
                                                        setActionFolder={setActionFolder}
                                                        setShowFolderUpdateModal={setShowFolderUpdateModal}
                                                    />
                                                    <button
                                                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 hover:bg-indigo-300 rounded-full"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                        </svg>
                                                    </button>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
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
                                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 hover:bg-indigo-300 rounded-full">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="h-4 w-4"
                                                        >
                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                            <polyline points="7 10 12 15 17 10"></polyline>
                                                            <line x1="12" x2="12" y1="15" y2="3"></line>
                                                        </svg>
                                                        <span className="sr-only">Download</span>
                                                    </button>
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
