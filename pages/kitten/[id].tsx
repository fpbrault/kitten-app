import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { KittenProps } from '../../components/Kitten';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/client';
import KittenPost from 'components/KittenPost';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const kitten = await prisma.kitten.findUnique({
        where: {
            id: Number(params?.id) || -1
        },
        include: {
            litter: {
                select: { name: true, id: true }
            },
            posts: {
                select: {
                    name: true,
                    id: true,
                    content: true,
                    createdAt: true,
                    published: true,
                    image: true
                }
            }
        }
    });
    const kittenData = JSON.parse(JSON.stringify(kitten));
    return {
        props: kittenData
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
    console.log(props);
    return (
        <Layout>
            <div className="z-20 flex justify-center w-full bg-white h-20vh">
                <div className="flex my-auto">
                    <img
                        src={props.image}
                        className="object-cover w-24 h-24 m-auto mr-2 rounded-full sm:w-40 sm:h-40"
                        alt={props.name}
                    />
                    <div className="">
                        <div className="flex items-center">
                            <h2 className="block text-3xl font-light leading-relaxed text-gray-700">
                                {props.name}
                            </h2>
                            <a className="px-3 ml-3 font-semibold text-center text-white bg-transparent bg-blue-500 border border-transparent rounded outline-none cursor-pointer h-7 hover:bg-blue-600">
                                Add post
                            </a>
                            <a className="px-3 ml-3 font-semibold text-center text-gray-500 bg-transparent border border-gray-400 rounded cursor-pointer h-7 focus:outline-none hover:border-transparent hover:bg-blue-500 hover:text-white">
                                Edit
                            </a>
                        </div>
                        <br />
                        <div className="">
                            <div className="grid grid-cols-2 gap-1">
                                Litter:
                                <div
                                    onClick={() =>
                                        Router.push('/litter/[id]', `/litter/${props.litter?.id}`)
                                    }
                                    className="font-bold hover:text-blue-600">
                                    {props?.litter?.name || 'Unknown litter'}
                                </div>
                            </div>
                            <span className="text-base">{props?.content}</span>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-300"></div>
            </div>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
                integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
                crossOrigin="anonymous"
            />

            <div className="overflow-auto bg-gray-100 h-75vh ">
                <div className="flex justify-center pt-4">
                    <div className="flex flex-col flex-wrap w-5/6 mx-auto">
                        {props.posts.map((post) => (
                            <KittenPost key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Kitten;
