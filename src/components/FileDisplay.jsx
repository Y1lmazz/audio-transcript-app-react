import React from 'react'
import { FaPenNib } from "react-icons/fa";


function FileDisplay({ file, recordedAudio, handleAudioReset, handleFormSubmission }) {


    return (
        <>
            <div className="file-display">
                <h1>Your<span className='span'>File</span></h1>
                <div className="audio-name">
                    <h3>Name: </h3>
                    <p> {file ? file?.name : "Custom audio"}</p>
                </div>
                <div className="btn-container">
                    <button onClick={handleAudioReset} className='reset-btn'>Reset</button>
                    <button onClick={handleFormSubmission} className='transcribe-btn'>Transcribe <FaPenNib />
                    </button>
                </div>
            </div >
        </>
    )
}

export default FileDisplay