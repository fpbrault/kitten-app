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
import KittenDataTable from '../components/KittenDataTable';
import { useRouter } from 'next/router';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

export const getServerSideProps: GetServerSideProps = async () => {
    const kittens = await prisma.kitten.findMany({
        select: {
            name: true,
            id: true,
            datapoints: true
        },
        orderBy: {
            id: 'asc'
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
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    };

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
    const [kitten, setKitten] = useState(null);
    let [loading, setLoading] = useState(false);

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);
        const body = { startWeight, finalWeight, kitten, time };
        await fetch(`/api/kittendatapost`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(() => {
                refreshData();
                setTimeout(function () {
                    setLoading(false);
                }, 500);
            })
            .catch((error) => {
                setTimeout(function () {
                    setLoading(false);
                }, 500);
                console.error(error);
                refreshData();
            });
    };

    const kittenOptions = props.kittens.map((x) => ({ value: x.id, label: x.name }));
    return (
        <Layout>
            <div className="max-w-4xl p-8 m-auto mt-24">
                <form onSubmit={submitData}>
                    <div className="text-2xl font-bold text-blue-700">New Data Entry</div>
                    <div className="pt-6 font-light text-gray-600">Kitten Name</div>
                    <Select
                        onChange={(e) => setKitten(e)}
                        placeholder="Kitten Name"
                        options={kittenOptions}
                        value={kitten}
                    />
                    <div className="grid grid-cols-2 gap-4 pt-3 mx-auto">
                        <div>
                            <div className="font-light text-gray-600">Starting Weight</div>
                            <NumberPicker
                                min={0}
                                defaultValue={350}
                                onChange={(e) => setStartWeight(e)}
                                placeholder="0"
                                precision={0}
                                //format={{ style: 'unit', unit: 'gram', unitDisplay: 'long' }}
                            />
                        </div>
                        <div>
                            <div className="font-light text-gray-600">Final Weight</div>
                            <NumberPicker
                                min={0}
                                defaultValue={350}
                                onChange={(e) => setFinalWeight(e)}
                                placeholder="0"
                                precision={0}
                                //format={{ style: 'unit', unit: 'gram', unitDisplay: 'long' }}
                            />
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="font-light text-gray-600">Time</div>
                        <DatePicker
                            defaultValue={new Date()}
                            onChange={(value) => setTime(value)}
                            includeTime
                        />
                    </div>

                    {loading ? (
                        <div className="flex justify-center">
                            <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
                        </div>
                    ) : (
                        <div>
                            <input
                                className="p-1 mr-2 font-bold text-blue-700 transition-colors rounded max-w-max lg:py-2 lg:px-2 lg:inline-block lg:mt-0 hover:text-white hover:bg-blue-700"
                                type="submit"
                                value="Create"
                            />
                            <a
                                className="py-2 ml-2 font-bold text-black transition-colors rounded lg:px-2 text-md hover:text-red-500 lg:mt-0"
                                href="#"
                                onClick={() => Router.push('/')}>
                                Cancel
                            </a>
                        </div>
                    )}
                </form>
                {kitten && (
                    <div className="pt-4">
                        <KittenDataTable
                            kittenData={props.kittens[kitten?.value - 1].datapoints}
                            refreshData={refreshData}></KittenDataTable>
                    </div>
                )}
            </div>
            <style jsx>{`
                .page {
                    background: white;
                    padding: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </Layout>
    );
};

export default Draft;