import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';

import Router from 'next/router';
import Link from 'next/link';
import { KittenProps } from '../../components/Kitten';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/client';
import KittenPost from '../../components/KittenPost';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const kitten = await prisma.kitten.findUnique({
        where: {
            id: Number(params?.id) || -1
        },
        include: {
            litter: {
                select: { name: true, id: true }
            },
            posts: { where: { published: true } }
        }
    });

    return {
        props: { kitten }
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

type Props = {
    kitten: KittenProps;
};

const Kitten: React.FC<Props> = (props) => {
    const [session, loading] = useSession();
    if (loading) {
        return <div>Authenticating ...</div>;
    }
    const userHasValidSession = Boolean(session);
    return (
        <Layout>
            <div className="z-20 flex flex-col justify-center w-full pt-20 border-b-2 border-charcoal bg-pastel-pink">
                <div className="mx-auto text-6xl font-light text-charcoal">{props.kitten.name}</div>

                <Link href={'/litter/' + props.kitten.litter?.id}>
                    <div className="font-bold text-center hover:text-blue-600">
                        {props?.kitten.litter?.name || 'Unknown litter'}
                    </div>
                </Link>

                <img
                    src={props.kitten.image}
                    className="object-cover w-24 h-24 mx-auto border-2 rounded-full border-charcoal sm:w-40 sm:h-40"
                    alt={props.kitten.name}
                />
                {userHasValidSession ? (
                    <div className="flex flex-row items-center justify-center my-2 ">
                        <a className="px-3 mx-2 font-semibold text-center text-white transition-colors bg-transparent border border-transparent rounded outline-none cursor-pointer bg-charcoal h-7 hover:bg-cadet-blue">
                            Add post
                        </a>

                        <a className="px-3 font-semibold text-center transition-colors bg-transparent border rounded cursor-pointer text-charcoal border-charcoal h-7 focus:outline-none hover:border-transparent hover:bg-white hover:text-charcoal">
                            Edit
                        </a>
                    </div>
                ) : null}
                <div className="grid content-center pb-4 text-center hover:grid-cols-1">
                    <div>
                        <div className="text-base">{props?.kitten.content}</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center pt-8 bg-gainsboro">
                <div className="flex flex-col flex-wrap w-full mx-auto">
                    {props.kitten.posts.map((post) => (
                        <KittenPost key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Kitten;
