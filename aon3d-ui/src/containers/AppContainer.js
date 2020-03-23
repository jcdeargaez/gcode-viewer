import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = state => ({
    upload: state.upload
})

export default connect(
    mapStateToProps
)(App)
