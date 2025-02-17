import { useState, useEffect, useRef } from "react";

const useSpeechRecognition = () => {
  const [recording, setRecording] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState<SpeechRecognitionErrorEvent | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecord = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecord();

    recognitionInstance.continuous = true;
    recognitionInstance.lang = 'es-CO';

    recognitionInstance.onresult = ({ results }) => {
      const { transcript } = results[results.length - 1][0];
      const { userAgent } = window.navigator;

      if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
        setData(transcript);
      } else {
        const text = results.length === 1 ? transcript : ` ${transcript}`
        setData(text);
      }
    };

    recognitionInstance.onerror = (event) => {
      console.error('Error en el reconocimiento de voz:', event);
      setRecording(false);
      setError(event);
      recognitionInstance.abort();
    };

    recognitionRef.current = recognitionInstance;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startRecording = () => {
    if (recognitionRef.current) {
      setData("");
      setRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  return {
    startRecording,
    stopRecording,
    recording,
    data,
    error,
  };
};

export default useSpeechRecognition;
