import { connect } from 'react-redux'

import Viewport from '../../components/viewer/viewport/Viewport'


const mapStateToProps = state => ({
    layers: state.layers,
    selectedLayers: state.selectedLayers
})

export default connect(
    mapStateToProps
)(Viewport)
