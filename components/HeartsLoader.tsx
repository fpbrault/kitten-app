import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const HeartsLoader: React.FC = () => (
    <div className="flex justify-center">
        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
);

export default HeartsLoader;
