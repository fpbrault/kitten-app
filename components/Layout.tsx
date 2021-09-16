import React, { ReactNode } from 'react';
import Header from './Header';

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <div
        data-theme={process.env.THEME}
        className="flex flex-col min-h-screen text-neutral bg-base-200">
        <Header />
        <div className="pt-0">{props.children}</div>
    </div>
);

export default Layout;
