import React, { useEffect, useRef, useState } from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";


function HomePage({ setFile, setrecordedAudio }) {

    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [duration, setDuration] = useState(null);

    const mediaRecorder = useRef(null);

    const mimeType = "audio/webm";

    //! Access to user mic
    const startRecording = async () => {
        let tempStream
        console.log("Start recording")
        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })

            tempStream = streamData;
        }
        catch {
            (error) => {
                console.log(error.message)
                return
            }
        }
        setRecordingStatus("recording")

        mediaRecorder.current = new MediaRecorder(tempStream, { mimeType });

        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (e) => {
            if (typeof e.data === "undefined") { return; }
            if (e.data.size === 0) { return; }
            localAudioChunks.push(e.data);
        };
        setAudioChunks(localAudioChunks);

        mediaRecorder.current.start();
    };

    const stopRecording = async () => {
        setRecordingStatus("inactive")
        console.log("Stop recording")

        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType })
            setrecordedAudio(audioBlob)
            setAudioChunks([])
            setDuration(0)
        }

    }

    useEffect(() => {
        if (recordingStatus === "inactive") { return }

        const interval = setInterval(() => {
            setDuration(current => current + 1)
        }, 1000)

        return () => clearInterval(interval)
    })



    return (
        <div className='homepage'>
            <h1>Script<span className='span'>Flow</span></h1>
            <h3>Record
                <span className="arrow"> <FaLongArrowAltRight />
                </span>
                Transcribe
                <span className="arrow"> <FaLongArrowAltRight />
                </span>
                Translate
            </h3>
            <button className='record-btn'
                onClick={recordingStatus === "recording" ? stopRecording : startRecording} >
                <p>{recordingStatus === "inactive" ? "Record" : `Stop recording`}</p>
                <div className="recording-div">
                    {duration && (<p>{duration + "s"}</p>)}
                    <FaMicrophone className={recordingStatus === "recording" ? "recording-mic" : ""} />
                </div>
            </button>
            <p>Or<label > upload
                <input className='upload-input' type="file" accept='audio/*'
                    onChange={(e) => {
                        const tempFile = e.target.files[0];
                        setFile(tempFile);
                    }} /> </label>
                a mp3 file</p>
            <p className='free-msg'>Completely free of charge</p>
        </div>
    )
}

export default HomePage