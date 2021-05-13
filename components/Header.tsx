import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';

const Header: React.FC = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    const [session, loading] = useSession();

    let left = (
        <div className="font-bold text-blue-700 text-md lg:flex-grow">
            <Link href="/blog">
                <a className="block px-2 py-2 mt-4 mr-2 rounded lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">
                    Blog
                </a>
            </Link>
            <Link href="/kittens">
                <a className="block px-2 py-2 mt-4 mr-2 rounded lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700 ">
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
                    <a className="block px-2 py-2 mt-4 mr-2 rounded lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">
                        Blog
                    </a>
                </Link>
                <Link href="/kittens">
                    <a className="block px-2 py-2 mt-4 mr-2 rounded lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700 ">
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
                    <a className="block px-2 py-2 mt-4 ml-2 font-bold text-blue-700 rounded text-md hover:text-white hover:bg-blue-700 lg:mt-0">
                        Log in
                    </a>
                </Link>
            </div>
        );
    }

    if (session) {
        left = (
            <div className="font-bold text-blue-700 text-md lg:flex-grow">
                <Link href="/blog">
                    <a className="block px-2 py-2 mt-4 mr-2 rounded lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700">
                        Blog
                    </a>
                </Link>
                <Link href="/kittens">
                    <a className="block px-2 py-2 mt-4 mr-2 rounded lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700 ">
                        Kittens
                    </a>
                </Link>
                <Link href="/drafts">
                    <a className="block px-2 py-2 mt-4 mr-2 rounded lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700 ">
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
            <div className="flex ">
                <p className="block px-2 py-2 mt-4 ml-2 font-thin rounded text-md hover:text-blue-700 lg:mt-0">
                    {session.user.name} ({session.user.email})
                </p>
                <Link href="/create">
                    <a className="block px-2 py-2 mt-4 ml-2 font-bold text-blue-700 rounded text-md hover:text-white hover:bg-blue-700 lg:mt-0">
                        New post
                    </a>
                </Link>
                <button
                    className="block px-2 py-2 mt-4 ml-2 font-bold text-blue-700 rounded text-md hover:text-white hover:bg-blue-700 lg:mt-0"
                    onClick={() => signOut()}>
                    <a className="">Log out</a>
                </button>
            </div>
        );
    }

    return (
        <nav className="fixed top-0 z-20 flex flex-wrap items-center justify-between w-full pt-4 m-auto bg-gray-200 border-t-2 border-blue-700 border-solid shadow animated lg:py-4 lg:px-4">
            <div className="flex justify-between w-full pb-5 pl-6 pr-2 border-b-2 border-gray-300 border-solid lg:w-auto lg:border-b-0 lg:pb-0">
                <div className="flex items-center flex-shrink-0 mr-4 text-gray-800">
                    <Link href="/">
                        <a className="text-2xl font-semibold tracking-tight transition-colors hover:text-blue-700">
                            Orphan Kitten Rescue
                        </a>
                    </Link>
                </div>
                <div className="block lg:hidden ">
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
                    'flex-grow w-full px-8lg:block lg:flex lg:items-center lg:w-auto lg:px-3' +
                    (navbarOpen ? '  ' : ' hidden')
                }>
                {left}
                {/*   <div className="relative hidden mx-auto text-gray-600 lg:block">
                    <input
                        className="h-10 pl-2 pr-8 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
                        type="search"
                        name="search"
                        placeholder="Search"
                    />
                    <button type="submit" className="absolute top-0 right-0 mt-3 mr-2">
                        <svg
                            className="w-4 h-4 text-gray-600 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            id="Capa_1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 56.966 56.966"
                            xmlSpace="preserve"
                            width="512px"
                            height="512px">
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </div> */}
                {right}
            </div>
        </nav>
    );
};

export default Header;
