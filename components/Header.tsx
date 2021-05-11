import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';

const Header: React.FC = () => {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) => router.pathname !== pathname;

    const [session, loading] = useSession();

    let left = (
        <div className="flex justify-center pl-4 -mb-px shadow-md left">
            <Link href="/">
                <a
                    className="py-3 mr-8 text-xs font-bold tracking-wide no-underline uppercase "
                    data-active={isActive('/')}>
                    Home
                </a>
            </Link>
            <Link href="/blog">
                <a
                    className="py-3 mr-8 text-xs font-bold tracking-wide no-underline uppercase"
                    data-active={isActive('/blog')}>
                    Blog
                </a>
            </Link>
            <Link href="/kittens">
                <a
                    className="py-3 mr-8 text-xs font-bold tracking-wide no-underline uppercase "
                    data-active={isActive('/kittens')}>
                    Kittens
                </a>
            </Link>
            <style jsx>{`
                .left a[data-active='false'] {
                    color: black;
                    border-bottom-width: 2px;
                    border-color: white;
                }
            `}</style>
        </div>
    );

    let right = null;

    if (loading) {
        left = (
            <div className="left">
                <Link href="/">
                    <a className="bold" data-active={isActive('/')}>
                        Feed
                    </a>
                </Link>
            </div>
        );
        right = (
            <div className="right">
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
            <div className="right">
                <Link href="/api/auth/signin">
                    <a className="px-1 mx-1" data-active={isActive('/signup')}>
                        Log in
                    </a>
                </Link>
            </div>
        );
    }

    if (session) {
        left = (
            <div className="left">
                <Link href="/">
                    <a className="bold" data-active={isActive('/')}>
                        Home
                    </a>
                </Link>
                <Link href="/blog">
                    <a className="bold" data-active={isActive('/blog')}>
                        Blog
                    </a>
                </Link>
                <Link href="/drafts">
                    <a data-active={isActive('/drafts')}>My drafts</a>
                </Link>
            </div>
        );
        right = (
            <div className="right">
                <p>
                    {session.user.name} ({session.user.email})
                </p>
                <Link href="/create">
                    <button>
                        <a>New post</a>
                    </button>
                </Link>
                <button onClick={() => signOut()}>
                    <a>Log out</a>
                </button>
            </div>
        );
    }

    return (
        <nav className="fixed z-30 flex items-center justify-between w-full bg-blue-600 shadow-md h-5vh align-center">
            {left}
            {right}
        </nav>
    );
};

export default Header;
