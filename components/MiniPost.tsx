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

const MiniPost: React.FC<{ post: PostProps }> = ({ post }) => {
    const authorName = post.author ? post.author.name : 'Unknown author';
    let day = new Date(post.createdAt).toDateString();
    return (
        <div>
            <div className="flex flex-col items-center max-w-lg mx-auto mb-4 text-center shadow-2xl lg:max-w-xs card bg-base-100">
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
                        <a className="mb-2 text-4xl font-bold hover:text-secondary">{post.title}</a>
                    </Link>
                    <div className="mb-2 text-lg font-thin">
                        By {authorName || 'Unknown author'}
                    </div>
                    <span className="inline-block py-1 text-sm font-semibold rounded-full bg-grey-lighter text-grey-darker">
                        {day}
                    </span>
                    <p className="text-base text-grey-darker">
                        <ReactMarkdown>{post.content.slice(0, 100) + ' ...'}</ReactMarkdown>
                    </p>
                    <Link href={'/post/' + post.id}>
                        <a className="px-4 mx-auto mt-4 text-center text-gray-500 transition-colors bg-transparent border border-gray-400 rounded cursor-pointer h-7 focus:outline-none hover:border-transparent hover:bg-secondary hover:text-white">
                            READ MORE
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MiniPost;
