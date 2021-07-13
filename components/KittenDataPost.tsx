import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export type KittenDataPostProps = {
    id: number;
    time: Date;
    startWeight: number;
    finalWeight: number;
    kittenId: number;
};

const KittenDataPost: React.FC<{ post: KittenDataPostProps }> = ({ post }) => {
    let day = new Date(post.time).toDateString();
    return (
        <>
            <div className="flex flex-col items-center max-w-3xl mx-auto mb-4 text-center transition-shadow bg-white border border-gray-300 rounded hover:shadow-md">
                <div className="flex flex-col flex-wrap content-between px-6 py-4">
                    <Link href={'/post/' + post.id}>
                        <a className="mb-2 text-4xl font-bold hover:text-blue-500">{post.time}</a>
                    </Link>
                    <span className="inline-block py-1 text-sm font-semibold rounded-full bg-grey-lighter text-grey-darker">
                        {day}
                    </span>
                    <p className="text-base text-grey-darker">
                        <span>Start Weight: {post.startWeight}</span>
                        <span>Final Weight: {post.finalWeight}</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default KittenDataPost;
