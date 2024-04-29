import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Modal from "@/Components/Modal/Modal.jsx";
import {useState} from "react";
import {useForm} from "@inertiajs/react";

export default function DeleteFolder({ folderId }) {
    const [showModal, setShowModal] = useState(false);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        id: null
    });

    const onSubmit = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => setShowModal(!showModal),
            // onError: () => passwordInput.current.focus(),
            // onFinish: () => reset(),
        });
    }

    return (
        <>
            <Modal show={showModal} onClose={() => setShowModal(!showModal)}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    )
}
