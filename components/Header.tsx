/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';

const Header: React.FC = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    const [session, loading] = useSession();
    let leftMenu = null;
    let compactMenu = null;
    let rightMenu = null;

    if (loading) {
        leftMenu = null;
        rightMenu = (
            <div className="flex ">
                <p>Validating session ...</p>
            </div>
        );
    }

    if (!session) {
        leftMenu = (
            <div className="flex-col lg:flex lg:flex-row">
                <Link href="/about">
                    <a className="btn btn-ghost btn-sm rounded-btn">A Propos</a>
                </Link>
                <Link href="/blog">
                    <a className="btn btn-ghost btn-sm rounded-btn">Blog</a>
                </Link>
                <Link href="/kittens">
                    <a className="btn btn-ghost btn-sm rounded-btn">Nos Chatons</a>
                </Link>
            </div>
        );
        rightMenu = (
            <div className="flex">
                <Link href="/api/auth/signin">
                    <a className="btn btn-ghost btn-sm rounded-btn">Connexion</a>
                </Link>
            </div>
        );
        compactMenu = (
            <>
                <li>
                    <Link href="/about">
                        <a>A Propos</a>
                    </Link>
                </li>
                <li>
                    <Link href="/blog">
                        <a className="">Blog</a>
                    </Link>
                </li>
                <li>
                    <Link href="/kittens">
                        <a className="">Nos Chatons</a>
                    </Link>
                </li>

                <li>
                    <Link href="/api/auth/signin">
                        <a className="">Connexion</a>
                    </Link>
                </li>
            </>
        );
    }

    if (session) {
        leftMenu = (
            <div className="flex">
                <Link href="/about">
                    <a className="btn btn-ghost btn-sm rounded-btn">A Propos</a>
                </Link>
                <Link href="/blog">
                    <a className="btn btn-ghost btn-sm rounded-btn">Blog</a>
                </Link>
                <Link href="/kittens">
                    <a className="btn btn-ghost btn-sm rounded-btn">Nos Chatons</a>
                </Link>
                <Link href="/drafts">
                    <a className="btn btn-ghost btn-sm rounded-btn">Brouillons</a>
                </Link>
            </div>
        );
        rightMenu = (
            <div className="flex flex-col items-end text-right lg:flex-row lg:text-left">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="btn btn-sm btn-ghost rounded-btn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link href="/create">
                                <a className="">Nouveau Post</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/data">
                                <a className="">Nouvelles Données</a>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/*  <div className="my-auto text-xs align-bottom">{session.user.name}</div> */}
                <a
                    className="btn btn-ghost btn-sm rounded-btn"
                    role="link"
                    tabIndex={0}
                    onClick={() => signOut()}
                    onKeyPress={() => signOut()}>
                    <div className="">Déconnexion</div>
                </a>
            </div>
        );
        compactMenu = (
            <>
                <li>
                    <Link href="/about">
                        <a>A Propos</a>
                    </Link>
                </li>
                <li>
                    <Link href="/blog">
                        <a>Blog</a>
                    </Link>
                </li>
                <li>
                    <Link href="/kittens">
                        <a>Nos Chatons</a>
                    </Link>
                </li>
                <li>
                    <Link href="/drafts">
                        <a>Brouillons</a>
                    </Link>
                </li>
                <li>
                    <Link href="/create">
                        <a>Ajouter Post</a>
                    </Link>
                </li>
                <li>
                    <Link href="/data">
                        <a>Ajouter Données</a>
                    </Link>
                </li>
                <li>
                    <a
                        role="link"
                        tabIndex={0}
                        onClick={() => signOut()}
                        onKeyPress={() => signOut()}>
                        <div className="">Déconnexion</div>
                    </a>
                </li>
            </>
        );
    }

    return (
        <nav className="fixed z-20 w-full shadow-lg navbar bg-primary text-base-content">
            <div className="px-2 mx-2 navbar-start">
                <div className="flex-1">
                    <Link href="/">
                        <a className="text-sm font-bold sm:text-lg">Les Petits Chatons</a>
                    </Link>
                </div>
            </div>

            <div className="hidden px-2 mx-2 navbar-center lg:flex">{leftMenu}</div>
            <div className="navbar-end">
                <div className="hidden px-2 mx-2 lg:flex">{rightMenu}</div>
                <div className="flex-none lg:hidden">
                    <div className="dropdown dropdown-end">
                        <button id="nav" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                        <div className="w-64 dropdown-content bg-base-200 rounded-box">
                            <ul className="shadow-lg text-neutral menu bg-base-100 rounded-box">
                                {compactMenu}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
