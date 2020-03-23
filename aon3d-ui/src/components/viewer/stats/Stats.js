import React from 'react'

import './Stats.css'


const Stats = ({ stats }) => {
    return (
        <div id="Stats">
            <span>File: {stats.FILENAME}</span>
            <span>File size: {stats.FILE_SIZE_1000}/{stats.FILE_SIZE_1024}</span>
            <span>Estimated time: {(stats.ETA_SECONDS/60).toFixed(2)} m</span>
            <span>Filament used: {stats.FILAMENT_USED}</span>
            <span>Cubic volume: {stats.CUBIC_VOLUME.toFixed(2)} mm<sup>3</sup></span>
        </div>
    )
}

export default Stats
