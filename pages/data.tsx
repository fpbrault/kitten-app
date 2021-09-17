import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Router from 'next/router';
import Select from 'react-select';
import { KittenProps } from '../components/Kitten';
import { LitterProps } from '../components/Litter';
import 'react-widgets/styles.css';
import useSWR, { SWRConfig } from 'swr';
import NumberPicker from 'react-widgets/NumberPicker';
import { KittenDataPostProps } from '../components/KittenDataPost';
import { useSession } from 'next-auth/client';
import KittenDataTable from '../components/KittenDataTable';
import ImageUpload from '../components/Uploader';
import HeartsLoader from '../components/HeartsLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { DateTimePicker } from '@material-ui/pickers';
import ErrorMessage from '../components/ErrorMessage';

const fetcher = (url) => fetch(url).then((res) => res.json());

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await fetcher(process.env.NEXTAUTH_URL + '/api/kittendatapost');
    return {
        props: {
            fallback: {
                '/api/kittendatapost': data
            }
        }
    };
};

type Props = {
    data: { kittens: KittenProps[]; litters: LitterProps[] };
    kittenDataPost: KittenDataPostProps[];
};

const Draft: React.FC<Props> = () => {
    const { data, mutate } = useSWR('/api/kittendatapost', fetcher);
    const refreshData = () => {
        mutate('/api/kittendatapost');
    };

    const [session] = useSession();

    if (!session) {
        return <ErrorMessage></ErrorMessage>;
    }
    const typeOptions = [
        { value: 'data', label: 'Data Point' },
        { value: 'litter', label: 'Litter' },
        { value: 'kitten', label: 'Kitten' }
    ];

    const [startWeight, setStartWeight] = useState(350);
    const [finalWeight, setFinalWeight] = useState(350);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedKitten, setSelectedKitten] = useState(null);
    const [kittenName, setKittenName] = useState('');
    const [image, setImage] = useState('');
    const [kittenLitter, setKittenLitter] = useState(null);
    const [kittenBirthday, setKittenBirthday] = useState(new Date());
    const [kittenDescription, setKittenDescription] = useState('');
    const [litterName, setLitterName] = useState('');
    const [litterDescription, setLitterDescription] = useState('');
    let [uploaderVisible, setUploaderVisible] = useState(false);
    const [type, setType] = useState(typeOptions[0]);
    let [loading, setLoading] = useState(false);

    const changeImageUrl = (url: string): void => {
        setImage(url);
        setUploaderVisible(false);
    };
    const resetInput = (): void => {
        setImage('');
        setStartWeight(350);
        setFinalWeight(350);
        setSelectedTime(new Date());
        setSelectedKitten(null);
        setKittenName('');
        setKittenLitter(null);
        setKittenBirthday(new Date());
        setKittenDescription('');
        setLitterName('');
        setLitterDescription('');
        setUploaderVisible(false);
    };

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);
        if (type.value === 'data') {
            const body = { startWeight, finalWeight, selectedKitten, selectedTime };
            await fetch(`/api/kittendatapost`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then(() => {
                    refreshData();
                    setTimeout(function () {
                        setLoading(false);
                    }, 200);
                })
                .catch((error) => {
                    setTimeout(function () {
                        setLoading(false);
                    }, 200);
                    console.error(error);
                    refreshData();
                });
        } else if (type.value === 'kitten') {
            const body = { kittenName, kittenDescription, kittenLitter, image, kittenBirthday };
            console.log(kittenLitter);
            await fetch(`/api/kitten`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then((response) => {
                    if (response.status >= 400 && response.status < 600) {
                        throw new Error(response.statusText);
                    }
                    return response;
                })
                .then((returnedResponse) => {
                    refreshData();
                    console.log(returnedResponse);
                    toast('New Kitten Created Successfully', { type: toast.TYPE.SUCCESS });

                    setTimeout(function () {
                        setLoading(false);
                    }, 200);
                })
                .catch((error) => {
                    setTimeout(function () {
                        setLoading(false);
                    }, 200);
                    toast(error.toString(), { type: toast.TYPE.ERROR });
                    console.error(error);
                    refreshData();
                });
        } else if (type.value === 'litter') {
            const body = { litterName, litterDescription };
            await fetch(`/api/litter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then((response) => {
                    if (response.status >= 400 && response.status < 600) {
                        throw new Error(response.statusText);
                    }
                    return response;
                })
                .then((returnedResponse) => {
                    refreshData();
                    console.log(returnedResponse);
                    toast('New Litter Created Successfully', { type: toast.TYPE.SUCCESS });

                    setTimeout(function () {
                        setLoading(false);
                    }, 200);
                })
                .catch((error) => {
                    setTimeout(function () {
                        setLoading(false);
                    }, 200);
                    toast(error.toString(), { type: toast.TYPE.ERROR });
                    console.error(error);
                    refreshData();
                });
        }
    };

    const kittenOptions =
        typeof data != 'undefined' && typeof data.kittens != 'undefined'
            ? data.kittens.map((x) => ({ value: x.id, label: x.name }))
            : {};
    const litterOptions =
        typeof data != 'undefined' && typeof data.litters != 'undefined'
            ? data.litters.map((x) => ({ value: x.id, label: x.name }))
            : {};

    return (
        <Layout pageTitle="Les Petits Chatons - Ajouter Données">
            <ToastContainer />
            <div className="max-w-4xl p-8 m-auto mt-24">
                <div className="shadow-lg card bg-base-100 text-accent">
                    <div className="card-body">
                        <form onSubmit={submitData}>
                            <div className="text-2xl font-bold text-primary card-title">
                                New Data Entry
                            </div>
                            <div className="pt-6 font-light ">Type</div>
                            <Select
                                onChange={(e) => {
                                    setType(e);
                                    resetInput();
                                }}
                                defaultValue={typeOptions[0]}
                                placeholder="New Data Type"
                                options={typeOptions}
                                value={type}
                            />
                            <div className="divider"></div>
                            {type['value'] == 'data' ? (
                                <>
                                    <div className="font-light ">Kitten Name</div>
                                    <Select
                                        onChange={(e) => setSelectedKitten(e)}
                                        placeholder="Kitten Name"
                                        options={kittenOptions}
                                        value={selectedKitten}
                                    />
                                    <div className="grid grid-cols-2 gap-4 pt-3 mx-auto">
                                        <div>
                                            <div className="font-light">Starting Weight</div>
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
                                            <div className="font-light ">Final Weight</div>
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
                                        <div className="font-light ">Time</div>
                                        <DateTimePicker
                                            className="bg-white"
                                            autoOk
                                            inputVariant="outlined"
                                            value={selectedTime}
                                            onChange={(value) => setSelectedTime(value)}
                                            showTodayButton
                                        />
                                    </div>
                                </>
                            ) : null}

                            {type['value'] == 'kitten' ? (
                                <>
                                    <div className="font-light pt ">Kitten Name</div>
                                    <input
                                        className="w-full my-2 bg-white input-sm input input-bordered"
                                        onChange={(e) => setKittenName(e.target.value)}
                                        placeholder="Enter a name"
                                        type="text"
                                        value={kittenName}
                                        id="name"
                                    />
                                    <div className="font-light ">Description</div>
                                    <input
                                        className="w-full my-2 bg-white input-sm input input-bordered"
                                        onChange={(e) => setKittenDescription(e.target.value)}
                                        placeholder="Enter a description"
                                        type="text"
                                        value={kittenDescription}
                                        id="description"
                                    />
                                    <div className="font-light ">Kitten Litter</div>
                                    <Select
                                        className="pt-2"
                                        onChange={(e) => setKittenLitter(e)}
                                        defaultValue={litterOptions[0]}
                                        placeholder="Select a Litter"
                                        options={litterOptions}
                                        value={kittenLitter}
                                    />
                                    <div className="py-4">
                                        <div className="font-light ">Birthdate</div>
                                        <DateTimePicker
                                            className="bg-white"
                                            autoOk
                                            inputVariant="outlined"
                                            value={kittenBirthday}
                                            onChange={(value) => setKittenBirthday(value)}
                                            showTodayButton
                                        />
                                    </div>
                                    <input
                                        className="w-full my-2 bg-white input-sm input input-bordered"
                                        onChange={(e) => setImage(e.target.value)}
                                        placeholder="Image"
                                        type="text"
                                        value={image}
                                    />
                                    <input
                                        className="pb-4 font-thin transition-colors bg-transparent hover:text-secondary"
                                        type="button"
                                        value="Upload an image?"
                                        onClick={() => setUploaderVisible(true)}
                                    />
                                    {uploaderVisible ? (
                                        <>
                                            <div className="max-w-4xl py-2 m-auto">
                                                <ImageUpload changeImageUrl={changeImageUrl} />
                                            </div>
                                        </>
                                    ) : null}
                                </>
                            ) : null}

                            {type['value'] == 'litter' ? (
                                <>
                                    <div className="font-light pt ">Litter Name</div>
                                    <input
                                        className="w-full my-2 bg-white input-sm input input-bordered"
                                        onChange={(e) => setLitterName(e.target.value)}
                                        placeholder="Enter a name"
                                        type="text"
                                        value={litterName}
                                        id="name"
                                    />
                                    <div className="font-light ">Description</div>
                                    <input
                                        className="w-full my-2 bg-white input-sm input input-bordered"
                                        onChange={(e) => setLitterDescription(e.target.value)}
                                        placeholder="Enter a description"
                                        type="text"
                                        value={litterDescription}
                                        id="description"
                                    />
                                </>
                            ) : null}
                            <div className="divider"></div>
                            {loading ? (
                                <HeartsLoader />
                            ) : (
                                <div className="btn-group">
                                    <input
                                        disabled={!selectedKitten && !kittenName && !litterName}
                                        className="btn btn-primary"
                                        type="submit"
                                        value="Create"
                                    />
                                    <a
                                        className="btn btn-ghost btn-accent"
                                        href="#"
                                        onClick={() => Router.push('/')}>
                                        Cancel
                                    </a>
                                </div>
                            )}
                        </form>
                        {selectedKitten && type['value'] == 'data' ? (
                            <div className="pt-4">
                                <KittenDataTable
                                    kittenData={
                                        data.kittens.find((x) => x.id === selectedKitten.value)
                                            ? data.kittens.find(
                                                  (x) => x.id === selectedKitten.value
                                              ).datapoints
                                            : null
                                    }
                                    refreshData={refreshData}></KittenDataTable>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export type FetcherAbstracted = unknown;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Page({ fallback }) {
    // SWR hooks inside the `SWRConfig` boundary will use those values.

    return (
        <SWRConfig value={{ fallback } as FetcherAbstracted}>
            <Draft
                data={{
                    kittens: [],
                    litters: []
                }}
                kittenDataPost={[]}
            />
        </SWRConfig>
    );
}
