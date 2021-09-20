import Link from 'next/link';

export default function ButtonLink({ label = 'Button', href = '/' }) {
    return (
        <>
            <Link href={href}>
                <button className="mr-2 btn btn-secondary">{label}</button>
            </Link>
        </>
    );
}
