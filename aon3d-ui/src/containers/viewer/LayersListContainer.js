import { connect } from 'react-redux'

import { toggleLayer, selectAllLayers, deselectAllLayers } from '../../actions'
import LayersList from '../../components/viewer/layers-list/LayersList'

const mapStateToProps = state => ({
    layers: state.layers,
    selectedLayers: state.selectedLayers
})

const mapDispatchToProps = dispatch => ({
    onToggleLayer: i => dispatch(toggleLayer(i)),
    onSelectAll: () => dispatch(selectAllLayers()),
    onDeselectAll: () => dispatch(deselectAllLayers())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayersList)
