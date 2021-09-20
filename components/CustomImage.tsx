import Image from 'next/image';
import Link from 'next/link';

export default function CustomImage({ src, ...otherProps }) {
    return (
        <>
            <div className="relative">
                <Link href={src}>
                    <a>
                        <Image
                            className="w-12"
                            src={src}
                            layout="responsive"
                            objectFit="scale-down"
                            height={250}
                            width={500}
                            {...otherProps}
                        />
                    </a>
                </Link>
            </div>
        </>
    );
}
