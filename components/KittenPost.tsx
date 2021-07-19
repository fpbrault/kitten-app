import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export type KittenPostProps = {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    published: boolean;
    image: string;
};

const KittenPost: React.FC<{ post: KittenPostProps }> = ({ post }) => {
    let day = new Date(post.createdAt).toDateString();
    return (
        <>
            <div className="flex flex-col items-center max-w-3xl mx-auto mb-4 text-center shadow-2xl card bg-base-100">
                {post?.image ? (
                    <Link href={'/post/' + post.id}>
                        <a>
                            <img
                                className="object-cover w-screen/2 h-screen/2"
                                src={post?.image}
                                alt={post?.title}
                            />
                        </a>
                    </Link>
                ) : null}
                <div className="card-body">
                    <Link href={'/post/' + post.id}>
                        <a className="mb-2 text-4xl font-bold hover:text-blue-500">{post.title}</a>
                    </Link>
                    <span className="inline-block py-1 text-sm font-semibold rounded-full bg-grey-lighter text-grey-darker">
                        {day}
                    </span>
                    <p className="text-base text-grey-darker">
                        <ReactMarkdown>{post.content.slice(0, 200) + '...'}</ReactMarkdown>
                    </p>
                    <Link href={'/post/' + post.id}>
                        <a className="px-4 mx-auto mt-4 text-center text-gray-500 transition-colors bg-transparent border border-gray-400 rounded cursor-pointer h-7 focus:outline-none hover:border-transparent hover:bg-blue-500 hover:text-white">
                            READ MORE
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default KittenPost;
