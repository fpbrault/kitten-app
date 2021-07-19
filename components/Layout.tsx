import React, { ReactNode } from 'react';
import Header from './Header';

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <div data-theme="light" className="flex flex-col min-h-screen bg-base-100">
        <Header />
        <div className="pt-18">{props.children}</div>
    </div>
);

export default Layout;
