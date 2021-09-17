import React from 'react';
import Link from 'next/link';
import Layout from './Layout';

const ErrorMessage: React.FC = () => (
    <Layout>
        <div className="min-h-screen hero bg-base-200">
            <div className="text-center hero-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Error</h1>
                    <p className="mb-5">You need to be authenticated to view this page.</p>

                    <Link href="https://www.facebook.com/lespetitschatonsqc">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    </Layout>
);

export default ErrorMessage;
