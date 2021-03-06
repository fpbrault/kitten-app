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
        },
        orderBy: { id: 'desc' }
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
        <Layout pageTitle="Les Petits Chatons - Nos Chatons">
            <div className="grid max-w-4xl grid-cols-1 gap-2 pt-32 mx-auto md:grid-cols-2 ">
                {props.feed.map((kitten) => (
                    <div key={kitten.id} className="mb-4">
                        <Kitten kitten={kitten} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Kittens;
