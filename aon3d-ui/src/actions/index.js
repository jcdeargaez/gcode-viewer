import axios from 'axios'

import * as types from './ActionTypes'

// Upload model file

function uploadModelFileRequest() {
    return {
        type: types.UPLOAD_MODEL_FILE_REQUEST,
        payload: {}
    }
}

function uploadModelFileFailure(reason) {
    return {
        type: types.UPLOAD_MODEL_FILE_FAILURE,
        payload: {
            reason
        }
    }
}

function uploadModelFileSuccess(stats, layers) {
    return {
        type: types.UPLOAD_MODEL_FILE_SUCCESS,
        payload: {
            stats,
            layers
        }
    }
}

export const uploadModelFile = (file) => dispatch => {
    dispatch(uploadModelFileRequest())
    const fd = new FormData()
    fd.append('file', file)
    return axios.post(process.env.REACT_APP_UPLOAD_URL, fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(({data}) => {
        dispatch(uploadModelFileSuccess(data.stats, data.layers))
    }).catch(reason => {
        console.log('Error', reason)
        dispatch(uploadModelFileFailure(reason))
    })
}

// Layers

export function toggleLayer(i) {
    return {
        type: types.TOGGLE_LAYER,
        payload: {
            i
        }
    }
}

export function selectAllLayers() {
    return {
        type: types.SELECT_ALL_LAYERS,
        payload: {}
    }
}

export function deselectAllLayers() {
    return {
        type: types.DESELECT_ALL_LAYERS,
        payload: {}
    }
}
