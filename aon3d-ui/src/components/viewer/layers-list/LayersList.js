import React from 'react'

import './LayersList.css'
import Layer from './Layer'


const LayersList = ({layers, selectedLayers, onToggleLayer, onSelectAll, onDeselectAll}) => {
    return (
        <aside id="LayersListBar">
            <h3>Layers ({layers.length})</h3>
            Select:
            &nbsp;
            <a href="#all" onClick={e => {e.preventDefault(); onSelectAll()}}>All</a>
            &nbsp;
            <a href="#none" onClick={e => {e.preventDefault(); onDeselectAll()}}>None</a>
            <ul id="LayersList">
                {layers.map((layer, i) =>
                    <Layer
                        key={i}
                        number={i + 1}
                        selected={selectedLayers[i]}
                        onToggleLayer={() => onToggleLayer(i)}
                    />
                )}
            </ul>
        </aside>
    )
}

export default LayersList
