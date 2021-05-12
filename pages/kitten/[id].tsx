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
            <div className="z-20 flex justify-center w-full bg-white h-20vh">
                <div className="flex my-auto">
                    <img
                        src={props.kitten.image}
                        className="object-cover w-24 h-24 m-auto mr-2 rounded-full sm:w-40 sm:h-40"
                        alt={props.kitten.name}
                    />
                    <div className="">
                        <div className="flex items-center">
                            <div className="block text-3xl font-light leading-relaxed text-gray-700">
                                {props.kitten.name}
                            </div>
                            {userHasValidSession ? (
                                <>
                                    <a className="px-3 ml-3 font-semibold text-center text-white bg-transparent bg-blue-500 border border-transparent rounded outline-none cursor-pointer h-7 hover:bg-blue-600">
                                        Add post
                                    </a>

                                    <a className="px-3 ml-3 font-semibold text-center text-gray-500 bg-transparent border border-gray-400 rounded cursor-pointer h-7 focus:outline-none hover:border-transparent hover:bg-blue-500 hover:text-white">
                                        Edit
                                    </a>
                                </>
                            ) : null}
                        </div>
                        <div className="">
                            <Link href={'/litter/' + props.kitten.litter?.id}>
                                <div className="pl-1 font-bold hover:text-blue-600">
                                    {props?.kitten.litter?.name || 'Unknown litter'}
                                </div>
                            </Link>
                            <span className="text-base">{props?.kitten.content}</span>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-300"></div>
            </div>

            <div className="overflow-auto bg-gray-100 h-75vh ">
                <div className="flex justify-center pt-4">
                    <div className="flex flex-col flex-wrap w-5/6 mx-auto">
                        {props.kitten.posts.map((post) => (
                            <KittenPost key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Kitten;
