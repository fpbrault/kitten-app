import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Router from 'next/router';
import Select from 'react-select';
import { KittenProps } from '../components/Kitten';
import prisma from '../lib/prisma';
import 'react-widgets/styles.css';
import DatePicker from 'react-widgets/DatePicker';
import NumberPicker from 'react-widgets/NumberPicker';
import { KittenDataPostProps } from '../components/KittenDataPost';
import { useSession } from 'next-auth/client';

export const getServerSideProps: GetServerSideProps = async () => {
    const kittens = await prisma.kitten.findMany({
        select: {
            name: true,
            id: true
        }
    });
    return {
        props: { kittens }
    };
};

type Props = {
    kittens: KittenProps[];
    kittenData: KittenDataPostProps[];
};

const Draft: React.FC<Props> = (props) => {
    const [session] = useSession();

    if (!session) {
        return (
            <Layout>
                <div className="max-w-4xl p-8 m-auto mt-24">
                    <div>You need to be authenticated to view this page.</div>
                </div>
            </Layout>
        );
    }
    const [startWeight, setStartWeight] = useState(350);
    const [finalWeight, setFinalWeight] = useState(350);
    const [time, setTime] = useState(new Date());
    const [kitten, setKitten] = useState();

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { startWeight, finalWeight, kitten, time };
            await fetch(`/api/kittendatapost`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            //await Router.push('/drafts');
        } catch (error) {
            console.error(error);
        }
    };

    const kittenOptions = props.kittens.map((x) => ({ value: x.id, label: x.name }));
    return (
        <Layout>
            <div className="max-w-4xl p-8 m-auto mt-24">
                <form onSubmit={submitData}>
                    <h1>New Kitten Data Entry</h1>
                    <Select
                        name="kitten-select"
                        className="pt-3"
                        onChange={(e) => setKitten(e)}
                        defaultValue={kittenOptions[0]}
                        placeholder="Kitten Name"
                        options={kittenOptions}
                        value={kitten}
                    />
                    <div className="grid grid-cols-2 gap-4 pt-3 mx-auto">
                        <div>
                            <label>Starting Weight</label>
                            <NumberPicker
                                min={0}
                                defaultValue={350}
                                onChange={(e) => setStartWeight(e)}
                                placeholder="0"
                                precision={0}
                                format={{ style: 'unit', unit: 'gram', unitDisplay: 'long' }}
                            />
                        </div>
                        <div>
                            <label>Final Weight</label>
                            <NumberPicker
                                min={0}
                                defaultValue={350}
                                onChange={(e) => setFinalWeight(e)}
                                placeholder="0"
                                precision={0}
                                format={{ style: 'unit', unit: 'gram', unitDisplay: 'long' }}
                            />
                        </div>
                    </div>
                    <div className="py-4">
                        <label>Time</label>
                        <DatePicker
                            defaultValue={new Date()}
                            onChange={(value) => setTime(value)}
                            includeTime
                        />
                    </div>

                    <input type="submit" value="Create" />
                    <a className="back" href="#" onClick={() => Router.push('/')}>
                        or Cancel
                    </a>
                </form>
            </div>
            <style jsx>{`
                .page {
                    background: white;
                    padding: 3rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                input[type='text'],
                textarea {
                    width: 100%;
                    padding: 0.5rem;
                    margin: 0.5rem 0;
                    border-radius: 0.25rem;
                    border: 0.125rem solid rgba(0, 0, 0, 0.2);
                }

                .mde-preview {
                    background: white;
                }
                input[type='submit'] {
                    background: #ececec;
                    border: 0;
                    padding: 1rem 2rem;
                }

                .back {
                    margin-left: 1rem;
                }
            `}</style>
        </Layout>
    );
};

export default Draft;
