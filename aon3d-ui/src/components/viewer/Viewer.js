import React from 'react'

import './Viewer.css'
import StatsContainer from '../../containers/viewer/StatsContainer'
import LayersListContainer from '../../containers/viewer/LayersListContainer'
import ViewportContainer from '../../containers/viewer/ViewportContainer'


const Viewer = () => {
    return (
        <main>
            <StatsContainer />
            <LayersListContainer />
            <ViewportContainer />
        </main>
    )
}

export default Viewer
