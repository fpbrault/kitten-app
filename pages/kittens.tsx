import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Kitten, { KittenProps } from '../components/Kitten';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
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
                <main>
                    {props.feed.map((kitten) => (
                        <div key={kitten.id} className="m-4">
                            <Kitten kitten={kitten} />
                        </div>
                    ))}
                </main>
            </div>
        </Layout>
    );
};

export default Kittens;
