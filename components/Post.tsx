import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export type PostProps = {
    id: number;
    title: string;
    content: string;
    image: string;
    kittenId: number;
    type: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    author: {
        name: string;
        email: string;
    } | null;
    kitten: {
        name: string;
        image: string;
    } | null;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
    const authorName = post.author ? post.author.name : 'Unknown author';
    let day = new Date(post.createdAt).toDateString();
    return (
        <div>
            <div className="flex flex-col items-center max-w-3xl mx-auto mb-4 text-center transition-shadow bg-white border border-gray-300 rounded hover:shadow-md">
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
                <div className="flex flex-col flex-wrap content-between px-6 py-4">
                    <Link href={'/post/' + post.id}>
                        <a className="mb-2 text-4xl font-bold hover:text-blue-500">{post.title}</a>
                    </Link>
                    <div className="mb-2 text-lg font-thin">
                        By {authorName || 'Unknown author'}
                    </div>
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
        </div>
    );
};

export default Post;
