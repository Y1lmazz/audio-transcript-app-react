import { useEffect, useRef, useState } from 'react'
import './App.css'
import Header from './components/Header'
import HomePage from './components/HomePage'
import FileDisplay from './components/FileDisplay'
import Information from './components/Information'
import Transcribe from './components/Transcribe'
import { MessageTypes } from './utils/presets'

function App() {

  const [file, setFile] = useState(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [output, setOutput] = useState(null); //default = null
  const [loading, setLoading] = useState(false); //default = false 
  const [finished, setFinished] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const worker = useRef(null)

  const isAuidoAvailable = file || recordedAudio;

  const handleAudioReset = () => {
    setFile(null)
    setRecordedAudio(null)
  }

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), {
        type: 'module'
      })
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          setDownloading(true)
          console.log('DOWNLOADING')
          break;
        case 'LOADING':
          setLoading(true)
          console.log('LOADING')
          break;
        case 'RESULT':
          setOutput(e.data.results)
          console.log(e.data.results)
          break;
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log("DONE")
          break;
      }
    }

    worker.current.addEventListener("message", onMessageReceived)

    return () => worker.current.removeEventListener("message", onMessageReceived)

  })


  const readAudioFrom = async (file) => {
    const sampling_rate = 16000;
    const audioCTX = new AudioContext({ sampling_rate })
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)

    return audio
  }

  const handleFormSubmission = async () => {
    if (!file && !recordedAudio) { return }

    let audio = await readAudioFrom(file ? file : recordedAudio)
    const model_name = `openai/whisper-tiny.en`

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    })
  }


  return (
    <>

      <Header />
      {output ? (<Information />) : loading ? (<Transcribe />) :
        isAuidoAvailable ? (<FileDisplay handleFormSubmission={handleFormSubmission} file={file} recordedAudio={setRecordedAudio} handleAudioReset={handleAudioReset} />) :
          <HomePage setFile={setFile} setrecordedAudio={setRecordedAudio} />}



    </>
  )
}

export default App
