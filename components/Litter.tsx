import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type LitterProps = {
    id: number;
    name: string;
    description: string;
    Kitten: {
        id: number;
        name: string;
        litter: {
            name: string;
            id: number;
        } | null;
        litterId: number;
        content: string;
        posts: Array<string>;
        image: string;
    };
};

const Litter: React.FC<{ litter: LitterProps }> = ({ litter }) => {
    return (
        <div onClick={() => Router.push('/litter/[id]', `/litter/${litter.id}`)}>
            <h2>{litter.name}</h2>
            <ReactMarkdown children={litter.description} />
            <style jsx>{`
                div {
                    color: inherit;
                    padding: 2rem;
                }
            `}</style>
        </div>
    );
};

export default Litter;
