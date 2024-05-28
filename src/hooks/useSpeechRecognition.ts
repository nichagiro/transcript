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
    recognitionInstance.lang = 'es';

    recognitionInstance.onresult = ({ results }) => {
      const text = results[results.length - 1][0].transcript;
      setData(text);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Error en el reconocimiento de voz:', event.error);
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