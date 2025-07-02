import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link, router} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import FolderCreationModal from "@/Components/Modal/FolderCreationModal.jsx";
import FileDropModal from "@/Components/Modal/FileDropModal.jsx";
import { getParentId } from "@/Utils/urls.js";

const mainElements = [
    {
        id: 1,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>,
        text: "Mon Drive",
        href: "/dashboard"
    },
    // {
    //     id: 2,
    //     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //         <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    //     </svg>,
    //     text: "Partagé avec moi",
    //     href: "/shared-with-me"
    // },
    // {
    //     id: 3,
    //     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    //     </svg>,
    //     text: "Récent",
    //     href: "/latest"
    // },
    // {
    //     id: 4,
    //     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //         <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    //     </svg>,
    //     text: "Corbeille",
    //     href: "/trash"
    // }
];

const storageElements = [
    {
        id: 1,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>,
        text: "Gestion du stockage",
        href: "/storage"
    }
];

const settingsElements = [
    {
        id: 1,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>,
        text: "Paramètres",
        href: "/settings"
    },
    {
        id: 2,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>,
        text: "Mon compte",
        href: "/profile"
    },
];

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showFolderCreationModal, setShowFolderCreationModal] = useState(false);
    const [showModalFileDrop, setShowModalFileDrop] = useState(false);

    const parentId = getParentId();

    const onShowFolderCreationModalClose = () => {
        setShowFolderCreationModal(!showFolderCreationModal);
    }

    const onShowModalFileDropClose = () => {
        setShowModalFileDrop(!showModalFileDrop);
    }

  return (
      <>
          {showFolderCreationModal && <FolderCreationModal
              user={user}
              show={showFolderCreationModal}
              onClose={onShowFolderCreationModalClose}
              parentId={parentId}
          />}
          {showModalFileDrop && <FileDropModal
              show={showModalFileDrop}
              onClose={onShowModalFileDropClose}
              userId={user.id}
              parentId={parentId}
          />}
          <div className="flex flex-row">
              <div className={showSidebar ? "h-screen overflow-y-hidden absolute top-0 left-0 z-50 block w-full bg-white border-r-[1px] border-r-gray-100" : "hidden md:block md:w-[300px] lg:w-[400px] bg-white border-r-[1px] border-r-gray-100"}>
                  <div className="flex shrink-0 md:justify-center items-center h-24 border-b-[1px] border-b-gray-100">
                      <Link href="/dashboard" className={"pl-8 md:pl-0"}>
                          <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                      </Link>
                  </div>
                  <div>
                      <div className="mt-3 w-full px-4">
                          <Dropdown>
                              <Dropdown.Trigger>
                                  <PrimaryButton
                                      className="flex justify-center items-center gap-1 w-full bg-gray-100 h-10 text-black"
                                  >
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 font-bold">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                      </svg>
                                      Nouveau
                                  </PrimaryButton>
                              </Dropdown.Trigger>

                              <Dropdown.Content>
                                  <button
                                      className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                      onClick={() => setShowFolderCreationModal(true)}
                                  >
                                      Nouveau dossier
                                  </button>
                                  <button
                                      className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                      onClick={() => setShowModalFileDrop(true)}
                                  >
                                      Importer des fichiers
                                  </button>
                              </Dropdown.Content>
                          </Dropdown>
                      </div>
                      <div className="mt-12 px-4">
                          <div>
                              <h3 className="text-gray-400 text-sm tracking-wider uppercase">Principal</h3>
                          </div>
                          <ul className="flex flex-col mt-4 gap-3">
                              {mainElements.map((el) => {
                                  if (el.href === '/shared-with-me' || el.href === '/latest' || el.href === '/trash') {
                                      return (
                                          <Link
                                              key={el.id}
                                              // href={el.href}
                                              className={router?.page?.url === el.href ? "flex flex-row items-center gap-2 bg-indigo-100 text-indigo-500 ease-in-out duration-150 cursor-pointer px-4 py-3 rounded-lg" : "flex flex-row items-center gap-2 text-gray-600 hover:bg-gray-200 ease-in-out duration-150 cursor-pointer px-4 py-3 rounded-lg"}
                                          >
                                              {el.icon}
                                              <span>{el.text}</span>
                                          </Link>
                                      )
                                  }

                                  return (
                                      <Link
                                          key={el.id}
                                          href={el.href}
                                          className={router?.page?.url === el.href ? "flex flex-row items-center gap-2 bg-indigo-100 text-indigo-500 ease-in-out duration-150 cursor-pointer px-4 py-3 rounded-lg" : "flex flex-row items-center gap-2 text-gray-600 hover:bg-indigo-100 hover:text-indigo-500 ease-in-out duration-150 cursor-pointer px-4 py-3 rounded-lg"}
                                      >
                                          {el.icon}
                                          <span>{el.text}</span>
                                      </Link>
                                  )
                              })}
                          </ul>
                          {/*<div className="mt-4">*/}
                          {/*    <h3 className="text-gray-400 text-sm tracking-wider uppercase">Stockage</h3>*/}
                          {/*</div>*/}
                          {/*<ul className="flex flex-col mt-4 gap-3">*/}
                          {/*    {storageElements.map((el) => {*/}
                          {/*        if (el.href === '/storage') {*/}
                          {/*            return (*/}
                          {/*                <Link*/}
                          {/*                    key={el.id}*/}
                          {/*                    // href={el.href}*/}
                          {/*                    className={router?.page?.url === el.href ? "flex flex-row items-center gap-2 bg-indigo-100 text-indigo-500 ease-in-out duration-150 cursor-pointer px-4 py-3 rounded-lg" : "flex flex-row items-center gap-2 text-gray-600 hover:bg-gray-200 ease-in-out duration-150 cursor-pointer px-4 py-3 rounded-lg"}*/}
                          {/*                >*/}
                          {/*                    {el.icon}*/}
                          {/*                    <span>{el.text}</span>*/}
                          {/*                </Link>*/}
                          {/*            )*/}
                          {/*        }*/}

                          {/*        return (*/}
                          {/*            <Link*/}
                          {/*                key={el.id}*/}
                          {/*                href={el.href}*/}
                          {/*                className={router?.page?.url === el.href ? "flex flex-row items-center gap-2 bg-indigo-100 text-indigo-500 ease-in-out duration-150 cursor-pointer px-4 py-3 rounded-lg" : "flex flex-row items-center gap-2 text-gray-600 hover:bg-indigo-100 hover:text-indigo-500 ease-in-out duration-150 cursor-pointer px-4 py-3 rounded-lg"}*/}
                          {/*            >*/}
                          {/*                {el.icon}*/}
                          {/*                <span>{el.text}</span>*/}
                          {/*            </Link>*/}
                          {/*        )*/}
                          {/*    })}*/}
                          {/*</ul>*/}
                          {/*<div className="mt-4">*/}
                          {/*    <h3 className="text-gray-400 text-sm tracking-wider uppercase">Paramètres</h3>*/}
                          {/*</div>*/}
                          {/*<ul className="flex flex-col mt-4 gap-3">*/}
                          {/*    {settingsElements.map((el) => {*/}
                          {/*        if (el.href === '/settings') {*/}
                          {/*            return (*/}
                          {/*                <Link*/}
                          {/*                    key={el.id}*/}
                          {/*                    // href={el.href}*/}
                          {/*                    className={router?.page?.url === el.href ? "flex flex-row items-center gap-2 bg-indigo-100 text-indigo-500 ease-in-out duration-150 cursor-pointer px-4 py-3 rounded-lg" : "flex flex-row items-center gap-2 text-gray-600 hover:bg-gray-200 ease-in-out duration-150 cursor-pointer px-4 py-3 rounded-lg"}*/}
                          {/*                >*/}
                          {/*                    {el.icon}*/}
                          {/*                    <span>{el.text}</span>*/}
                          {/*                </Link>*/}
                          {/*            )*/}
                          {/*        }*/}

                          {/*        return (*/}
                          {/*            <Link*/}
                          {/*                key={el.id}*/}
                          {/*                href={el.href}*/}
                          {/*                className={router?.page?.url === el.href ? "flex flex-row items-center gap-2 bg-indigo-100 text-indigo-500 ease-in-out duration-150 cursor-pointer px-4 py-3 rounded-lg" : "flex flex-row items-center gap-2 text-gray-600 hover:bg-indigo-100 hover:text-indigo-500 ease-in-out duration-150 cursor-pointer px-4 py-3 rounded-lg"}*/}
                          {/*            >*/}
                          {/*                {el.icon}*/}
                          {/*                <span>{el.text}</span>*/}
                          {/*            </Link>*/}
                          {/*        )*/}
                          {/*    })}*/}
                          {/*</ul>*/}
                      </div>
                  </div>
              </div>
              <div className="w-full min-h-screen bg-gray-50">
                  <nav className="bg-white border-b-[1px] border-b-gray-100">
                      <div className="">
                          <div className="flex justify-between px-8 h-24">
                              <div className="flex">
                                  <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                      {/*<button className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none  justify-center gap-1 border-transparent text-gray-500 hover:text-gray-700 hover:border-indigo-400">*/}
                                      {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">*/}
                                      {/*        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />*/}
                                      {/*    </svg>*/}
                                      {/*    <span>Nouveau</span>*/}
                                      {/*</button>*/}
                                  </div>
                              </div>

                      <div className="hidden lg:flex lg:items-center sm:ms-6">
                          <div className="ms-3 relative">
                              <Dropdown>
                                  <Dropdown.Trigger>
                      <span className="inline-flex rounded-md">
                        <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                        >
                          {user.name}

                            <svg
                                className="ms-2 -me-0.5 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                                          </Dropdown.Trigger>

                                          <Dropdown.Content>
                                              <Dropdown.Link href={route('profile.edit')}>Mon compte</Dropdown.Link>
                                              <Dropdown.Link href={route('logout')} method="post" as="button" onClick={() => localStorage.setItem('breadcrumb', JSON.stringify([]))}>
                                                  Se déconnecter
                                              </Dropdown.Link>
                                          </Dropdown.Content>
                                      </Dropdown>
                                  </div>
                              </div>

                              <div className="-me-2 flex items-center sm:hidden">
                                  <button
                                      onClick={() => setShowSidebar(!showSidebar)}
                                      className="z-50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                  >
                                      <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                          <path
                                              className={!showSidebar ? 'inline-flex' : 'hidden'}
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M4 6h16M4 12h16M4 18h16"
                                          />
                                          <path
                                              className={showSidebar ? 'inline-flex' : 'hidden'}
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M6 18L18 6M6 6l12 12"
                                          />
                                      </svg>
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/*<div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>*/}
                      {/*    <div className="pt-2 pb-3 space-y-1">*/}
                      {/*        /!*<button className="inline-flex items-center pl-4 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out justify-center gap-1 border-transparent text-gray-500">*!/*/}
                      {/*        /!*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">*!/*/}
                      {/*        /!*        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />*!/*/}
                      {/*        /!*    </svg>*!/*/}
                      {/*        /!*    <span>Nouveau</span>*!/*/}
                      {/*        /!*</button>*!/*/}
                      {/*    </div>*/}

                      {/*    <div className="pt-4 pb-1 border-t border-gray-200">*/}
                      {/*        <div className="px-4">*/}
                      {/*            <div className="font-medium text-base text-gray-800">{user.name}</div>*/}
                      {/*            <div className="font-medium text-sm text-gray-500">{user.email}</div>*/}
                      {/*        </div>*/}

                      {/*        <div className="mt-3 space-y-1">*/}
                      {/*            <ResponsiveNavLink href={route('profile.edit')}>Mon compte</ResponsiveNavLink>*/}
                      {/*            <ResponsiveNavLink method="post" href={route('logout')} as="button">*/}
                      {/*                Se déconnecter*/}
                      {/*            </ResponsiveNavLink>*/}
                      {/*        </div>*/}
                      {/*    </div>*/}
                      {/*</div>*/}
                  </nav>

                  {header && (
                      <header className="bg-white shadow">
                          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                      </header>
                  )}

                  <main>{children}</main>
              </div>
          </div>
      </>
  );
}
