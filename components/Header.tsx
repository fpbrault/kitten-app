import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';

const Header: React.FC = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    const [session, loading] = useSession();

    let left = (
        <div className="font-bold text-blue-700 text-md lg:flex-grow">
            <Link href="/blog">
                <a className="px-2 py-2 mt-4 mr-2 rounded lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">
                    Blog
                </a>
            </Link>
            <Link href="/kittens">
                <a className="px-2 py-2 mt-4 mr-2 rounded lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">
                    Kittens
                </a>
            </Link>
        </div>
    );

    let right = null;

    if (loading) {
        left = (
            <div className="font-bold text-blue-700 text-md lg:flex-grow">
                <Link href="/blog">
                    <a className="px-2 py-2 mt-4 mr-2 rounded lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">
                        Blog
                    </a>
                </Link>
                <Link href="/kittens">
                    <a className="px-2 py-2 mt-4 mr-2 rounded lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">
                        Kittens
                    </a>
                </Link>
            </div>
        );
        right = (
            <div className="flex ">
                <p>Validating session ...</p>
                <style jsx>{`
                    .right {
                        margin-left: auto;
                    }
                `}</style>
            </div>
        );
    }

    if (!session) {
        right = (
            <div className="flex ">
                <Link href="/api/auth/signin">
                    <a className="py-2 mt-4 ml-2 font-bold text-blue-700 rounded lg:px-2 text-md hover:text-white hover:bg-blue-700 lg:mt-0">
                        Log in
                    </a>
                </Link>
            </div>
        );
    }

    if (session) {
        left = (
            <div className="flex flex-col font-bold text-blue-700 lg:flex-row text-md lg:flex-grow">
                <Link href="/blog">
                    <a className="p-1 mt-4 mr-2 rounded max-w-max w-min-content lg:py-2 lg:px-2 lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">
                        Blog
                    </a>
                </Link>
                <Link href="/kittens">
                    <a className="p-1 mt-4 mr-2 rounded max-w-max lg:py-2 lg:px-2 lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">
                        Kittens
                    </a>
                </Link>
                <Link href="/drafts">
                    <a className="p-1 mt-4 mr-2 rounded max-w-max lg:py-2 lg:px-2 lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">
                        My drafts
                    </a>
                </Link>
                <style jsx>{`
                    .left a[data-active='false'] {
                        border-bottom-width: 2px;
                        border-color: white;
                    }
                `}</style>
            </div>
        );
        right = (
            <div className="flex flex-col items-end text-right lg:flex-row lg:text-left">
                <div className="p-1 mt-4 font-thin rounded max-w-max lg:py-2 lg:ml-2 lg:px-2 text-md hover:text-blue-700 lg:mt-0">
                    {session.user.name} ({session.user.email})
                </div>
                <Link href="/create">
                    <div className="p-1 mt-4 mr-2 font-bold text-blue-700 rounded max-w-max lg:py-2 lg:px-2 lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">
                        New Post
                    </div>
                </Link>
                <Link href="/data">
                    <div className="p-1 mt-4 mr-2 font-bold text-blue-700 rounded max-w-max lg:py-2 lg:px-2 lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">
                        New Data Entry
                    </div>
                </Link>
                <div
                    className="p-1 mt-4 mr-2 font-bold text-blue-700 rounded max-w-max lg:py-2 lg:px-2 lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700"
                    onClick={() => signOut()}>
                    <a className="">Log out</a>
                </div>
            </div>
        );
    }

    return (
        <nav className="fixed top-0 z-20 flex flex-wrap items-center justify-center w-full px-8 pt-4 m-auto border-t-2 border-blue-700 border-solid shadow bg-gainsboro animated lg:py-2 xl:px-64">
            <div className="flex justify-between w-full pb-5 pl-6 pr-2 border-b-2 border-gray-300 border-solid lg:w-auto lg:border-b-0 lg:pb-0">
                <div className="flex items-center flex-shrink-0 mr-4 text-gray-800">
                    <Link href="/">
                        <a className="text-2xl font-semibold tracking-tight transition-colors hover:text-blue-700">
                            Les Petits Chatons
                        </a>
                    </Link>
                </div>
                <div className=" lg:hidden">
                    <button
                        id="nav"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                        className="flex items-center px-3 py-2 text-blue-700 border-2 border-blue-700 rounded hover:text-blue-700 hover:border-blue-700">
                        <svg
                            className="w-3 h-3 fill-current"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div
                className={
                    'flex-grow flex justify-between flex-row w-full px-8lg: lg:flex lg:items-center lg:w-auto pb-2 lg:pb-0 lg:px-3' +
                    (navbarOpen ? '  ' : ' hidden')
                }>
                {left}
                {right}
            </div>
        </nav>
    );
};

export default Header;
