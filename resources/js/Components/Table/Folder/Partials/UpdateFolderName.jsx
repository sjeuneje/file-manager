import {useForm} from "@inertiajs/react";

export default function UpdateFolderName({ folderId, userId }) {

    // const {
    //     data,
    //     setData,
    //     patch,
    //     processing,
    //     reset,
    //     errors,
    //     wasSuccessful
    // } = useForm({
    //     id: folderId,
    //     user_id: userId,
    //     name: ''
    // });
    //
    // const onUpdateName = (e) => {
    //     e.preventDefault();
    //
    //     patch(route('dashboard.folders.update'));
    // }

    return (
        <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 hover:bg-indigo-300 rounded-full"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
        </button>
    )
}
