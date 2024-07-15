import {useForm} from "@inertiajs/react";

export default function FolderUpdateModal({ user, show, onClose }) {
    const { data, setData, patch, errors, processing } = useForm({
        user_id: user.id,
        name: 'Dossier sans titre'
    });
}
