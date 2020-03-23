import * as types from '../actions/ActionTypes'


const initialState = {
    upload: {
        status: null,
        reason: null
    },
    stats: {
        CUBIC_VOLUME: 39296.63970000001,
        ETA_SECONDS: 4125,
        FILAMENT_USED: "2.39852m",
        FILENAME: "nut.gcode",
        FILE_SIZE_1000: "3.12 MB",
        FILE_SIZE_1024: "2.97 MiB",
        LAYER_COUNT: 136,
    },
    layers: [],
    selectedLayers: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        
        // File model upload

        case types.UPLOAD_MODEL_FILE_REQUEST:
            return {
                ...state,
                upload: {
                    status: 'loading'
                }
            }
        
        case types.UPLOAD_MODEL_FILE_FAILURE:
            return {
                ...state,
                upload: {
                    status: 'error',
                    reason: action.payload.reason
                }
            }

        case types.UPLOAD_MODEL_FILE_SUCCESS:
            return {
                ...state,
                upload: {
                    status: 'success'
                },
                stats: action.payload.stats,
                layers: action.payload.layers,
                selectedLayers: new Array(action.payload.layers.length).fill(true)
            }

        // Layers

        case types.TOGGLE_LAYER:
            state.selectedLayers[action.payload.i] = !state.selectedLayers[action.payload.i]
            return {
                ...state,
                selectedLayers: [...state.selectedLayers]
            }
        
        case types.SELECT_ALL_LAYERS:
            return {
                ...state,
                selectedLayers: state.selectedLayers.map(() => true)
            }
        
        case types.DESELECT_ALL_LAYERS:
            return {
                ...state,
                selectedLayers: state.selectedLayers.map(() => false)
            }

        default:
            return state
    }
}

export default reducer
