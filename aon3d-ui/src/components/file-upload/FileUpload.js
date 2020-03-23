import React from 'react'

import './FileUpload.css'


const FileUpload = ({ upload, onUpload }) => {
    let file

    const errorMsg = upload.status === 'error' ? <div className="error">Error: {upload.reason.message}</div> : ''

    return (
        <div id="FileUpload">
            <form onSubmit={e => {
                e.preventDefault()
                onUpload(file.files[0])
            }}>
                <p>Select your model file in G-Code format to view its statistics and layers.</p>
                {errorMsg}
                <input type="file" accept=".gcode" required ref={m => file = m} />
                <button type="submit" disabled={upload.status === 'loading'}>View</button>
            </form>
        </div>
    )
}

export default FileUpload
