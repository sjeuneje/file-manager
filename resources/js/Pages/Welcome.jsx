import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome to File Manager!" />
            <div className="flex justify-center items-center min-h-[100vh] bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                Welcome to File Manager!
            </div>
        </>
    );
}
