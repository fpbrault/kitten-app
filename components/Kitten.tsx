import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { KittenPostProps } from './KittenPost';
import { KittenDataPoint } from '.prisma/client';

export type KittenProps = {
    id: number;
    name: string;
    posts: KittenPostProps[];
    litter: {
        name: string;
        id: number;
    };
    datapoints: KittenDataPoint[];
    litterId: number;
    content: string;
    image: string;
    birthdate: Date;
};

const Kitten: React.FC<{ kitten: KittenProps }> = ({ kitten }) => {
    const litterName = kitten.litter ? kitten.litter.name : null;
    return (
        <Link href={'/kitten/' + kitten.id}>
            <div className="grid items-center justify-center max-w-xs grid-cols-2 mx-auto text-center transition-colors shadow-xl hover:shadow-2xl card bg-base-300 ">
                <img src={kitten.image} className="object-cover w-40 h-40" alt={kitten.name} />
                <div>
                    <div className="text-2xl">{kitten.name}</div>
                    {litterName ? (
                        <Link href={'/litter/' + kitten.litterId}>
                            <>
                                From
                                <span className="font-bold transition-colors hover:text-white">
                                    {' '}
                                    {litterName}
                                </span>
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
