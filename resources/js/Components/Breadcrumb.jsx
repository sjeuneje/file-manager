import { getSiteUrl } from "@/Utils/urls.js";

export default function Breadcrumb({
    title = 'Mon drive',
    href = '/dashboard'
}) {
    const breadcrumb = JSON.parse(localStorage.getItem('breadcrumb'));
    const basePath = window.location.protocol + '//' + window.location.hostname + '/dashboard';

    const handleBackNavigation = (destination) => {
        let newBreadcrumb = [];
        const indexOfDestination = breadcrumb.indexOf(destination);

        breadcrumb.map((el) => {
            if (breadcrumb.indexOf(el) <= indexOfDestination) {
                newBreadcrumb.push(el);
            }
        })

        localStorage.setItem('breadcrumb', JSON.stringify(newBreadcrumb));

        window.location.href = basePath + "?parent_id=" + destination.id;
    }

    return (
        <section className="flex flex-wrap items-center gap-6">
            <h1
                className="text-xl font-bold cursor-pointer"
                onClick={() => window.location.href = getSiteUrl() + href}
            >
                {title}
            </h1>
            {breadcrumb.map((el, i) => {
                return (
                    <div
                        className="flex items-center gap-5"
                        key={i}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <p
                            onClick={() => breadcrumb.at(-1) !== el ? handleBackNavigation(el) : ""}
                            className={breadcrumb.at(-1) !== el ? "text-gray-400 cursor-pointer" : "text-gray-400"}
                        >
                            {el.name}
                        </p>
                    </div>
                )
            })}
        </section>
    )
}
