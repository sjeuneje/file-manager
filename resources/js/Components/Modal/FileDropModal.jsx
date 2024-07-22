import Modal from "@/Components/Modal/Modal.jsx";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import FilesList from "@/Components/FileDrop/FilesList.jsx";
import {useForm} from "@inertiajs/react";

export default function FileDropModal({ show, onClose, userId, parentId = null }) {
    const [files, setFiles] = useState([]);

    const { data, setData, post, errors, processing } = useForm({
        user_id: userId,
        parent_id: parentId,
        files: null,
    });

    const handleChange = (file) => {
        setFiles(prevFiles => [...prevFiles, ...file]);
    };

    const submit = (e) => {
        e.preventDefault();

        data.files = files;

        post(route('dashboard.files.create'));

        onClose();
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
        >
            <form
                className="w-full px-5 py-5"
                onSubmit={submit}
            >
                <h1 className="text-2xl mb-6">Importer des fichiers</h1>
                {files.length === 0 ? (
                    <FileUploader
                        handleChange={handleChange}
                        name="file"
                        multiple={true}
                        label="Télécharger ou glisser des fichiers ici"
                        classes="w-full fileuploader--adddons"
                        required
                    />
                ) : (
                    <FilesList files={files} />
                )}
                <div className="flex md:justify-end w-full justify-center md:gap-5 md:pr-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-indigo-600 px-3 py-2 rounded-3xl hover:bg-indigo-100 transition ease-in-out duration-150"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="text-indigo-600 px-3 py-2 rounded-3xl hover:bg-indigo-100 transition ease-in-out duration-150"
                        onSubmit={submit}
                    >
                        Importer
                    </button>
                </div>
            </form>
        </Modal>
    );
}
