import React, { ReactNode } from 'react';
import Header from './Header';

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <div className="h-screen overflow-hidden bg-gray-200">
        <Header />
        <div className="pt-5vh">{props.children}</div>
    </div>
);

export default Layout;
