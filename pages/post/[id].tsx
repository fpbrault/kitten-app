import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { PostProps } from '../../components/Post';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(params?.id) || -1
        },
        include: {
            author: {
                select: { name: true, email: true }
            },
            kitten: true
        }
    });
    return {
        props: post
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

const Post: React.FC<PostProps> = (props) => {
    const [session, loading] = useSession();
    if (loading) {
        return <div>Authenticating ...</div>;
    }
    const userHasValidSession = Boolean(session);
    const postBelongsToUser = session?.user?.email === props.author?.email;
    let title = props.title;
    if (!props.published) {
        title = `${title} (Draft)`;
    }

    return (
        <Layout pageTitle={'Les Petits Chatons - Blog - ' + title}>
            <div className="flex flex-col items-center min-h-screen py-16 text-center bg-white rounded hover:shadow-lg">
                {props?.image ? (
                    <img
                        className="object-cover max-w-full lg:max-w-4xl"
                        src={props?.image}
                        alt="Sunset in the mountains"
                    />
                ) : null}
                <div className="pt-8 my-4 text-4xl font-bold">{title}</div>
                <div className="mb-2 text-lg font-thin">
                    By {props?.author?.name || 'Unknown author'}
                </div>
                <div className="mb-2 text-lg font-thin">
                    {props?.kitten ? (
                        <img
                            src={props?.kitten?.image}
                            className="object-cover w-8 h-8 rounded-full"
                            alt={props?.kitten?.name}
                        />
                    ) : null}
                </div>
                <div className="prose-sm prose text-left sm:prose lg:prose-lg">
                    <ReactMarkdown className="px-4">{props.content}</ReactMarkdown>
                </div>
                <div className="flex p-4">
                    {!props.published && userHasValidSession && postBelongsToUser && (
                        <button
                            className="p-2 mx-4 bg-green-400 border rounded hover:bg-green-500"
                            onClick={() => publishPost(props.id)}>
                            Publish
                        </button>
                    )}
                    {userHasValidSession && postBelongsToUser && (
                        <button
                            className="p-2 mx-4 bg-red-400 border rounded hover:bg-red-500"
                            onClick={() => deletePost(props.id)}>
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Post;
