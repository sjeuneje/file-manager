import {router, useForm} from "@inertiajs/react";
import Modal from "@/Components/Modal/Modal.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function FolderUpdateModal({ user, show, onClose, folder }) {
    const { data, setData, patch, errors, processing } = useForm({
        id: folder.id,
        user_id: user.id,
        name: folder.name
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('dashboard.folders.update'));

        onClose();
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
        >
            <form onSubmit={submit} className="w-full px-5 py-5">
                <h1 className="text-2xl mb-6">Modifier dossier</h1>
                <TextInput
                    id="folder"
                    type="text"
                    className="block w-full mb-6"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    autoComplete="Dossier sans titre"
                />
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
                    >
                        Modifier
                    </button>
                </div>
                {/*<InputError className="mt-2" message={errors.folder} />*/}
            </form>
        </Modal>
    )
}
