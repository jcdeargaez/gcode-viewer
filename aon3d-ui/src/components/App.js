import React from 'react'

import './App.css'
import Header from './Header'
import FileUploadContainer from '../containers/file-upload/FileUploadContainer'
import Viewer from './viewer/Viewer'
import Footer from './Footer'


const App = ({ upload }) => {
	return (
		<div className="App">
			<Header />
			{upload.status === 'success' ? <Viewer /> : <FileUploadContainer />}
			<Footer />
		</div>
	)
}

export default App
