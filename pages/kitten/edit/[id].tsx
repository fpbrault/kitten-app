import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage';
import Router from 'next/router';
import { KittenProps } from '../../../components/Kitten';
import { LitterProps } from '../../../components/Litter';
import prisma from '../../../lib/prisma';
import { useSession } from 'next-auth/client';
import ImageUpload from '../../../components/Uploader';
import HeartsLoader from '../../../components/HeartsLoader';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { DateTimePicker } from '@material-ui/pickers';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const kitten = await prisma.kitten.findUnique({
        where: { id: Number(params.id) },
        include: {
            litter: {
                select: { name: true, id: true }
            }
        }
    });
    const litters = await prisma.litter.findMany({
        select: {
            name: true,
            id: true
        }
    });
    return {
        props: { kitten, litters }
    };
};

type Props = {
    kitten: KittenProps;
    litters: LitterProps[];
};

const Kitten: React.FC<Props> = (props) => {
    const [session] = useSession();

    if (!session) {
        return <ErrorMessage></ErrorMessage>;
    }

    const [kittenName, setKittenName] = useState(props.kitten.name);
    const [image, setImage] = useState(props.kitten.image);
    const [kittenLitter, setKittenLitter] = useState({
        value: props.kitten.litter.id,
        label: props.kitten.litter.name
    });
    const [kittenBirthday, setKittenBirthday] = useState(props.kitten.birthdate);
    const [kittenDescription, setKittenDescription] = useState(props.kitten.content);
    let [uploaderVisible, setUploaderVisible] = useState(false);
    let [loading, setLoading] = useState(false);
    console.log(props);

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        const body = { kittenName, kittenDescription, kittenLitter, image, kittenBirthday };

        await fetch(`/api/kitten/` + props.kitten.id, {
            method: 'PUT',
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
                console.log(returnedResponse);
                toast('Changes Saved Successfully', { type: toast.TYPE.SUCCESS });

                setTimeout(function () {
                    //setLoading(false);
                    Router.push('/kitten/' + props.kitten.id);
                }, 200);
            })
            .catch((error) => {
                setTimeout(function () {
                    setLoading(false);
                }, 200);
                toast(error.toString(), { type: toast.TYPE.ERROR });
                console.error(error);
            });
    };

    const changeImageUrl = (url: string): void => {
        setImage(url);
        setUploaderVisible(false);
    };

    const litterOptions =
        typeof props != 'undefined' && typeof props.litters != 'undefined'
            ? props.litters.map((x) => ({ value: x.id, label: x.name }))
            : {};
    return (
        <Layout>
            <ToastContainer />
            <div className="max-w-4xl p-8 m-auto mt-24">
                <div className="shadow-lg card bg-base-100 text-accent">
                    <div className="card-body">
                        <form onSubmit={submitData}>
                            <div className="text-2xl font-bold text-primary card-title">
                                Edit Kitten {props.kitten.id}
                            </div>

                            <div className="divider"></div>
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
                                className="pt-2 bg-white"
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
                            <div className="divider"></div>
                            {loading ? (
                                <HeartsLoader />
                            ) : (
                                <div className="btn-group">
                                    <input
                                        disabled={!kittenDescription || !kittenName}
                                        className="btn btn-primary"
                                        type="submit"
                                        value="Save Changes"
                                    />
                                    <a
                                        className="btn btn-ghost btn-accent"
                                        href="#"
                                        onClick={() => Router.push('/kitten/' + props.kitten.id)}>
                                        Cancel
                                    </a>{' '}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Kitten;
