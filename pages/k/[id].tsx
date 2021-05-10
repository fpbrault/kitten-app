import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Router from 'next/router';
import Image from 'next/image';
import { KittenProps } from '../../components/Kitten';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const kitten = await prisma.kitten.findUnique({
        where: {
            id: Number(params?.id) || -1
        },
        include: {
            litter: {
                select: { name: true, id: true }
            }
        }
    });
    return {
        props: kitten
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

const Kitten: React.FC<KittenProps> = (props) => {
    const [session, loading] = useSession();
    if (loading) {
        return <div>Authenticating ...</div>;
    }
    const userHasValidSession = Boolean(session);
    let name = props.name;
    if (!props.name) {
        name = `${name} (Draft)`;
    }

    return (
        <Layout>
            <div className="w-1/2 p-4 mx-auto bg-gray-200 border-2 divide-y-2 rounded shadow">
                <div className="flex flex-col items-center justify-center ">
                    <div className="pb-2 text-5xl">{name}</div>
                    <Image
                        src="https://pyxis.nymag.com/v1/imgs/f34/06f/9e0ecb484baf801889b5863c75093ff1bb-24-cat-in-a-box.rsquare.w700.jpg"
                        alt="cat"
                        width={200}
                        height={200}
                    />
                </div>
                <div className="flex flex-col items-center justify-center ">
                    <div className="grid grid-cols-2 gap-1">
                        Litter:
                        <div
                            onClick={() => Router.push('/l/[id]', `/l/${props.litter?.id}`)}
                            className="font-bold hover:text-blue-600">
                            {props?.litter?.name || 'Unknown litter'}
                        </div>
                    </div>
                    <ReactMarkdown children={props.content} />
                </div>
            </div>
        </Layout>
    );
};

export default Kitten;
