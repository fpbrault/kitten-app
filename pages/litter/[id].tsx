import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { LitterProps } from '../../components/Litter';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/client';
import Kitten from 'components/Kitten';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const litter = await prisma.litter.findUnique({
        where: {
            id: Number(params?.id) || -1
        },
        include: {
            Kitten: {}
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
            <div className="flex flex-col justify-center p-4 mt-4 align-center">
                <div className="mx-auto text-center">
                    <div className="text-4xl font-bold">{name}</div>
                    <div>
                        <ReactMarkdown children={props.description} />
                    </div>
                </div>
                <main>
                    {props.Kitten.map((kitten) => (
                        <div key={kitten.id} className="kitten">
                            <Kitten kitten={kitten} />
                        </div>
                    ))}
                </main>
            </div>
        </Layout>
    );
};

export default Litter;
