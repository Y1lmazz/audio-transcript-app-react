import React, { useState } from 'react'
import Transcription from './Transcription';
import Translate from './Translate';

function Information() {

    const [tab, setTab] = useState("");

    return (
        <>
            <div className="info-section">
                <h1>Your <span className='span'>Transcription</span></h1>

                <div className="toggle-btn-container">
                    <button onClick={() => { setTab("transcription") }} className={'transcription-btn ' + (tab === "transcription" ? "transcription" : "")}>Transcription</button>
                    <button onClick={() => { setTab("translate") }} className={'translate-btn ' + (tab === "translate" ? "translate" : "")} >Translation</button>
                </div>
            </div>

            {tab === "transcription" ? <Transcription /> : <Translate />}

        </>
    )
}

export default Information