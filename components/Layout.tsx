import React, { ReactNode } from 'react';
import Header from './Header';

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <div className="min-h-screen overflow-hidden bg-gray-200">
        <Header />
        <div className="px-8 pt-24">{props.children}</div>
    </div>
);

export default Layout;
