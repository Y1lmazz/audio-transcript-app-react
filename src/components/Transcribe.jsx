import React from 'react'

function Transcribe({ downloading }) {



    return (
        <>
            <div className="transcribe-section">
                <div className="transcribing">
                    <h1>Transcribing</h1>
                    <p>{!downloading ? "warming up cylinders..." : "core cylinders engaged"} </p>
                </div>
                <div className="cylinders">
                    {[0, 1, 2].map(value => {

                        return (
                            <div key={value} className={"cylinder-item loading " + `loading${value}`}  ></div>
                        )

                    })}
                </div>

            </div >
        </>
    )
}

export default Transcribe