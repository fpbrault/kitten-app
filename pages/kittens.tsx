import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Kitten, { KittenProps } from '../components/Kitten';
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.kitten.findMany({
        include: {
            litter: {
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
    feed: KittenProps[];
};

const Kittens: React.FC<Props> = (props) => {
    return (
        <Layout>
            <div className="page">
                <h1>Kittens</h1>
                <main>
                    {props.feed.map((kitten) => (
                        <div key={kitten.id} className="kitten">
                            <Kitten kitten={kitten} />
                        </div>
                    ))}
                </main>
            </div>
        </Layout>
    );
};

export default Kittens;
