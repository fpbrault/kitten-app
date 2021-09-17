import React from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

import { useSession } from 'next-auth/client';

import Link from 'next/link';

const ErrorPage: React.FC = () => {
    const [session] = useSession();

    if (!session) {
        return (
            <Layout pageTitle="Les Petits Chatons - Error">
                <div className="min-h-screen hero bg-base-200">
                    <div className="text-center hero-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Error</h1>
                            <p className="mb-5">You need to be authenticated to view this page.</p>

                            <Link href="/api/auth/signin">
                                <button className="btn btn-primary">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    } else Router.push('/');
};

export default ErrorPage;
