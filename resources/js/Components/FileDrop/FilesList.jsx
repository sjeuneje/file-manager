import React from 'react';

export default function FilesList({ files }) {
    const filesArray = Array.isArray(files) ? files : [];

    if (filesArray.length > 0) {
        return (
            <ul className="overflow-scroll max-h-[300px] grid grid-cols-2 gap-4 mb-[20px]">
                {filesArray.map((file, i) => {
                    return (
                        <li
                            key={i}
                            className="border border-indigo-600 bg-indigo-100 text-indigo-600 inline-flex items-center rounded-lg w-[300px] max-w-[300px] h-[50px] p-4"
                        >
                            <span className="overflow-hidden float-left text-ellipsis whitespace-nowrap">{file.name}</span>
                        </li>
                    );
                })}
            </ul>
        );
    } else {
        return <p>Aucun fichier disponible.</p>;
    }
}
