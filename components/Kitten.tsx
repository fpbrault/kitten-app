import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export type KittenProps = {
    id: number;
    name: string;
    litter: {
        name: string;
        id: number;
    };
    litterId: number;
    content: string;
    image: string;
    posts: {
        name: string;
        id: number;
    };
};

const Kitten: React.FC<{ kitten: KittenProps }> = ({ kitten }) => {
    const litterName = kitten.litter ? kitten.litter.name : 'Unknown author';
    return (
        <Link href={'/kitten/' + kitten.id}>
            <div className="flex flex-col items-center p-4 m-8 mx-auto transition-colors bg-white border rounded shadow sm:w-1/4 hover:bg-blue-300">
                {JSON.stringify(kitten)}
                <img
                    src={kitten.image}
                    className="object-cover w-40 h-40 rounded-full"
                    alt={kitten.name}
                />
                <div>
                    <div className="text-2xl">{kitten.name}</div>
                    <div className="flex">
                        From{' '}
                        <Link href={'/litter/' + kitten.litterId}>
                            <div className="pl-1 font-bold hover:text-blue-600">{litterName}</div>
                        </Link>
                    </div>
                    <ReactMarkdown>{kitten.content}</ReactMarkdown>
                </div>
            </div>
        </Link>
    );
};

export default Kitten;
