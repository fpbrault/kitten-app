import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { LitterProps } from '../../components/Litter';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const litter = await prisma.litter.findUnique({
        where: {
            id: Number(params?.id) || -1
        }
    });
    return {
        props: litter
    };
};

async function publishPost(id: number): Promise<void> {
    await fetch(`/api/publish/${id}`, {
        method: 'PUT'
    });
    await Router.push('/');
}

async function deletePost(id: number): Promise<void> {
    await fetch(`/api/post/${id}`, {
        method: 'DELETE'
    });
    await Router.push('/');
}

const Litter: React.FC<LitterProps> = (props) => {
    const [session, loading] = useSession();
    if (loading) {
        return <div>Authenticating ...</div>;
    }
    let name = props.name;
    if (!props.name) {
        name = `${name} (Draft)`;
    }

    return (
        <Layout>
            <div className="bg-blue-100 border-2 border-blue-500 rounded shadow">
                <h2>{name}</h2>
                <ReactMarkdown children={props.description} />
            </div>
            <style jsx>{`
                .page {
                    background: white;
                    padding: 2rem;
                }

                .actions {
                    margin-top: 2rem;
                }

                button {
                    background: #ececec;
                    border: 0;
                    border-radius: 0.125rem;
                    padding: 1rem 2rem;
                }

                button + button {
                    margin-left: 1rem;
                }
            `}</style>
        </Layout>
    );
};

export default Litter;
