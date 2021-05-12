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
            <div className="flex flex-col items-center max-w-xl mx-auto mb-8 text-center bg-white rounded shadow-lg">
                <img
                    className="object-cover w-full h-64"
                    src={post.image}
                    alt="Sunset in the mountains"
                />
                <div className="flex flex-col flex-wrap content-between px-6 py-4">
                    <div className="mb-2 text-xl font-bold">{post.title}</div>
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
