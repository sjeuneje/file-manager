import {useForm} from "@inertiajs/react";

export default function DeleteFile({ fileId, userId }) {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        wasSuccessful
    } = useForm({
        id: fileId,
        user_id: userId
    });

    const onDelete = (e) => {
        e.preventDefault();

        destroy(route('dashboard.files.soft_delete'));
    }

    return (
        <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 hover:bg-indigo-300 rounded-full"
            onClick={onDelete}
            disabled={processing}
        >
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
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" x2="10" y1="11" y2="17"></line>
                <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
            <span className="sr-only">Delete</span>
        </button>
    )
}
