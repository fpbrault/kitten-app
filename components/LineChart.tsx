import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class LineChart extends Component<null, { options; series; type }> {
    constructor(props) {
        super(props);

        this.state = {
            options: props.data.options,
            series: props.data.series,
            type: props.type
        };
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="p-2 transition-shadow bg-white border border-gray-300 sm:rounded hover:shadow-md">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type={this.state.type}
                            width="100%"
                            height="500px"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default LineChart;
