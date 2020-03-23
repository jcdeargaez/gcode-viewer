import React from 'react'

import './Layer.css'


const Layer = ({ number, selected, onToggleLayer }) => {
    return (
        <li onClick={onToggleLayer}>
            <div className={'Layer' + (selected ? ' active' : '')}>
                Layer {number}
            </div>
        </li>
    )
}

export default Layer
