import TextInput from "@/Components/TextInput.jsx";
import Modal from "@/Components/Modal/Modal.jsx";
import {useForm} from "@inertiajs/react";

export default function FolderCreationModal({ user, show, onClose }) {
    const { data, setData, post, errors, processing } = useForm({
        user_id: user.id,
        parent_id: null,
        name: 'Dossier sans titre'
    });

    // console.log(errors);

    const submit = (e) => {
        e.preventDefault();

        post(route('dashboard.folders.create'));

        onClose();
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
            maxWidth="md"
        >
            <form onSubmit={submit} className="w-full px-5 py-5">
                <h1 className="text-2xl mb-6">Nouveau dossier</h1>
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
                        Créer
                    </button>
                </div>
                {/*<InputError className="mt-2" message={errors.folder} />*/}
            </form>
        </Modal>
    )
}
