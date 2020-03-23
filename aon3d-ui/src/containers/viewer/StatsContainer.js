import { connect } from 'react-redux'

import Stats from '../../components/viewer/stats/Stats'


const mapStateToProps = state => ({
    stats: state.stats
})

export default connect(
    mapStateToProps
)(Stats)
