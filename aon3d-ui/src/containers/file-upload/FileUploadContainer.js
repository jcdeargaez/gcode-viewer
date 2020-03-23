import { connect } from 'react-redux'

import { uploadModelFile } from '../../actions'
import FileUpload from '../../components/file-upload/FileUpload'

const mapStateToProps = state => ({
    upload: state.upload
})

const mapDispatchToProps = dispatch => ({
    onUpload: file => dispatch(uploadModelFile(file))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileUpload)
