import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { KittenProps } from '../../components/Kitten';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/client';
import KittenPost from '../../components/KittenPost';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('../../components/LineChart'), { ssr: false });

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const kitten = await prisma.kitten.findUnique({
        where: {
            id: Number(params?.id) || -1
        },
        include: {
            litter: {
                select: { name: true, id: true }
            },
            posts: {
                where: { published: true },
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ]
            },
            datapoints: {}
        }
    });
    const datapoints = await prisma.$queryRaw(
        'select date_trunc(\'day\', "time" AT TIME ZONE \'EST\') as "time" , count(id), \
    round(avg("startWeight")) as "pre", round(avg("finalWeight")) as "post",\
    round(avg("finalWeight") - avg("startWeight")) as "delta", max("finalWeight" - "startWeight") as "delta" \
    from public."KittenDataPoint" WHERE "kittenId" =' +
            Number(params?.id) +
            ' group by 1, "kittenId" order by "kittenId", "time" asc'
    );
    return {
        props: { kitten, datapoints }
    };
};

type Props = {
    kitten: KittenProps;
    datapoints: [];
};

interface datapoint {
    time: Date;
    pre: number;
    post: number;
    delta: number;
    count: number;
}

const Kitten: React.FC<Props> = (props) => {
    const [session, loading] = useSession();
    if (loading) {
        return <div>Authenticating ...</div>;
    }
    const userHasValidSession = Boolean(session);

    /*     const idealWeight = [
        { low: 350, high: 450 },
        { low: 450, high: 550 },
        { low: 550, high: 850 },
        { low: 650, high: 1000 }
    ];

    const lowRange = new Array(Math.floor(props.datapoints.length / 4))
        .fill(0)
        .map((element, index) => ({
            x: addDays(props.kitten.birthdate, 7 * (index + 3)),
            y: idealWeight[index].low
        }));

    const highRange = new Array(Math.floor(props.datapoints.length / 4))
        .fill(0)
        .map((element, index) => ({
            x: addDays(props.kitten.birthdate, 7 * (index + 3)),
            y: idealWeight[index].high
        }));
 */
    let data = {
        options: {
            chart: {
                id: 'basic-line',
                group: 'charts',
                zoom: {
                    autoScaleYaxis: true
                },
                animateGradually: {
                    enabled: false
                }
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: [
                {
                    title: {
                        text: 'Weight in grams'
                    }
                }
            ],
            labels: {
                format: 'dd/MM'
            },
            stroke: {
                width: [3, 3],
                stroke: {
                    curve: 'smooth'
                }
            },

            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                }
            },
            tooltip: {
                shared: true,
                enabledOnSeries: [0, 1]
            },
            markers: {
                size: 5
            }
        },
        series: [
            {
                name: 'Pre-feeding Average',
                data: props.datapoints.map((x: datapoint) => ({ x: new Date(x.time), y: x.pre })),
                type: 'line',
                dataLabels: {
                    enabled: true,
                    offsetY: -8,
                    style: {
                        fontSize: '8px'
                    }
                }
            },
            {
                name: 'Post-feeding Average',
                data: props.datapoints.map((x: datapoint) => ({ x: new Date(x.time), y: x.post })),
                type: 'line'
            } /* 
            {
                name: 'Ideal Weight(low)',
                data: lowRange,
                type: 'line'
            },
            {
                name: 'Ideal Weight(high)',
                data: highRange,
                type: 'line'
            } */
        ]
    };
    let data2 = {
        options: {
            chart: {
                id: 'basic-bar',
                group: 'charts',
                zoom: {
                    autoScaleYaxis: true
                },
                animateGradually: {
                    enabled: false
                }
            },
            xaxis: {
                type: 'datetime'
            },
            labels: {
                format: 'dd/MM'
            },
            stroke: {
                width: [2, 2]
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '8px'
                }
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                }
            },
            markers: {
                size: 1
            }
        },
        series: [
            {
                name: 'Delta',
                data: props.datapoints.map((x: datapoint) => ({ x: new Date(x.time), y: x.delta })),
                type: 'column'
            },
            {
                name: 'Count',
                data: props.datapoints.map((x: datapoint) => ({ x: new Date(x.time), y: x.count })),
                type: 'column'
            }
        ]
    };

    return (
        <Layout pageTitle={'Les Petits Chatons - ' + props.kitten.name}>
            <div className="z-20 flex flex-col justify-center w-full pt-20 bg-neutral text-neutral-content">
                <div className="pb-2 mx-auto text-6xl font-light">{props.kitten.name}</div>

                <Link href={'/litter/' + props.kitten.litter?.id}>
                    <div className="pb-2 font-bold text-center hover:text-secondary">
                        {props?.kitten.litter?.name || 'Unknown litter'}
                    </div>
                </Link>
                <div className="mx-auto avatar">
                    <div className={props.kitten.image ? 'w-32 h-32 rounded-full' : 'w-32 h-32'}>
                        {props.kitten.image ? (
                            <img src={props.kitten.image} alt={props.kitten.name} />
                        ) : (
                            <img src="/cat.png" alt={props.kitten.name} />
                        )}
                    </div>
                </div>
                {userHasValidSession ? (
                    <div className="flex flex-row items-center justify-center my-2 ">
                        <Link href={'/create'}>
                            <a className="px-3 mx-2 font-semibold text-center transition-colors bg-transparent border border-transparent rounded outline-none cursor-pointer text-neutral bg-base-100 h-7 hover:bg-primary">
                                Add post
                            </a>
                        </Link>
                        <Link href={'/kitten/edit/' + props.kitten.id}>
                            <a className="px-3 font-semibold text-center transition-colors bg-transparent border rounded cursor-pointer text-neutral-content border-neutral-content h-7 focus:outline-none hover:border-transparent hover:bg-secondary hover:text-neutral">
                                Edit
                            </a>
                        </Link>
                    </div>
                ) : null}
                <div className="grid content-center pb-4 text-center hover:grid-cols-1">
                    <div className="text-base">
                        {' '}
                        {'Born on: ' + props.kitten.birthdate.toDateString()}
                    </div>
                    <div className="text-base">{props?.kitten.content}</div>
                </div>
            </div>
            <div className="flex justify-center pt-4 mx-2 bg-base-200">
                <div className="flex flex-col flex-wrap w-full mx-auto">
                    <div className="w-full max-w-3xl mx-auto mb-4 text-center collapse rounded-box border-base-300 bg-base-content">
                        <input type="checkbox" />
                        <div className="text-xl font-medium max-w-1xl text-neutral-content collapse-title">
                            Click to show charts
                        </div>
                        <div className="collapse-content">
                            <div className="grid w-full grid-cols-1 gap-2 mx-auto mb-4 text-center lg:grid-cols-1 max-w-7xl ">
                                <LineChart data={data} type="line"></LineChart>
                                <LineChart data={data2} type="line"></LineChart>
                            </div>
                        </div>
                    </div>
                    {props.kitten.posts.map((post) => (
                        <KittenPost key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Kitten;
