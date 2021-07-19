import React from 'react';
import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
    const feed = await prisma.post.findMany({
        where: {
            published: true,
            type: 'blog'
        },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    return {
        props: { feed }
    };
};

type Props = {
    feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
    return (
        <Layout>
            {/*  <header
                id="up"
                className="relative h-screen bg-fixed bg-center bg-gradient-to-br from-indigo-400 to-green-300">
                <div className="flex items-center justify-center h-screen bg-black bg-opacity-50">
                    <div className="mx-2 text-center">
                        <h1 className="text-4xl font-extrabold text-gray-100 xs:text-5xl md:text-6xl">
                            <span className="text-white">Orphan</span> Kitten Rescue
                        </h1>
                        <div className="inline-flex">
                            <Link href="/blog">
                                <button className="p-2 mx-2 my-5 font-bold text-white transition duration-500 bg-indigo-700 border-2 border-transparent rounded shadow-md hover:bg-indigo-800 hover:border-indigo-800 md:text-xl">
                                    Blog
                                </button>
                            </Link>
                            <Link href="/kittens">
                                <a>
                                    <button className="p-2 mx-2 my-5 font-bold text-indigo-800 transition duration-500 bg-transparent bg-indigo-200 bg-opacity-75 border-2 border-indigo-700 rounded shadow-md hover:bg-opacity-100 hover:border-indigo-800 md:text-lg">
                                        Kittens
                                    </button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </header> */}
            <div className="pt-24 bg-base-200">
                {props.feed.map((post) => (
                    <div key={post.id} className="post">
                        <Post post={post} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Blog;
