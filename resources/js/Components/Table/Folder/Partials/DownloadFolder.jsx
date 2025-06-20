import {useForm} from "@inertiajs/react";

export default function DownloadFolder({
    folder,
    user
}) {

    const { data, setData, post, errors, processing } = useForm({
        id: folder.id,
        user_id: user.id
    });

    const sendDownloadRequest = (e) => {
        e.preventDefault();
        window.location.href = route('download.folder', data);
    };

    return (
        <button onClick={sendDownloadRequest} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 hover:bg-indigo-300 rounded-full">
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
    )
}
