import {router, useForm} from "@inertiajs/react";
import Modal from "@/Components/Modal/Modal.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function FileUpdateNameModal({ user, show, onClose, file }) {
    const { data, setData, patch, errors, processing } = useForm({
        id: file.id,
        user_id: user.id,
        name: file.name
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('dashboard.files.update_name'));

        onClose();
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
        >
            <form onSubmit={submit} className="w-full px-5 py-5">
                <h1 className="text-2xl mb-6">Modifier fichier</h1>
                <TextInput
                    id="file"
                    type="text"
                    className="block w-full mb-6"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    autoComplete="Fichier sans titre"
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
                {/*<InputError className="mt-2" message={errors.file} />*/}
            </form>
        </Modal>
    )
}
