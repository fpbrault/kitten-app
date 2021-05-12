import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { KittenPostProps } from './KittenPost';

export type KittenProps = {
    id: number;
    name: string;
    posts: KittenPostProps[];
    litter: {
        name: string;
        id: number;
    };
    litterId: number;
    content: string;
    image: string;
};

const Kitten: React.FC<{ kitten: KittenProps }> = ({ kitten }) => {
    const litterName = kitten.litter ? kitten.litter.name : null;
    return (
        <Link href={'/kitten/' + kitten.id}>
            <div className="flex flex-row items-center justify-center max-w-sm p-4 mx-auto text-center transition-colors bg-white border rounded shadow hover:bg-blue-300">
                <img
                    src={kitten.image}
                    className="object-cover w-40 h-40 mx-4 rounded-full"
                    alt={kitten.name}
                />
                <div>
                    <div className="text-2xl">{kitten.name}</div>
                    {litterName ? (
                        <Link href={'/litter/' + kitten.litterId}>
                            <>
                                From
                                <span className="font-bold hover:text-blue-600"> {litterName}</span>
                            </>
                        </Link>
                    ) : null}
                    <ReactMarkdown>{kitten.content}</ReactMarkdown>
                </div>
            </div>
        </Link>
    );
};

export default Kitten;
