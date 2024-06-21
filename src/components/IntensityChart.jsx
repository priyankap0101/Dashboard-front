import React, { useEffect, useRef } from 'react';
import { ForceGraph3D } from 'react-force-graph';


const IntensityGraphChart = ({ data }) => {
    const fgRef = useRef();

    // Transform data for the graph
    const graphData = {
        nodes: data.map((item, index) => ({
            id: index,
            name: item.topic,
            value: item.intensity
        })),
        links: data.map((item, index) => ({
            source: index,
            target: (index + 1) % data.length
        }))
    };

    useEffect(() => {
        // Focus on the graph once it's rendered
        fgRef.current.zoomToFit(400);
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-center text-xl font-semibold mb-4">Intensity Graph</h3>
            <ForceGraph3D
                ref={fgRef}
                graphData={graphData}
                nodeAutoColorBy="value"
                linkDirectionalParticles="value"
                linkDirectionalParticleSpeed={d => d.value * 0.001}
                width={400}
                height={400}
            />
        </div>
    );
};

export default IntensityGraphChart;
