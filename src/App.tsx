// hooks
import useSpeechRecognition from "./hooks/useSpeechRecognition"
import { useState, useEffect, useMemo } from "react"

// components
import { Button } from "@nextui-org/button"
import { Textarea } from "@nextui-org/input"

// icons
import Microphone from "./icons/Microphone"
import Send from "./icons/Send"
import Layout from "./components/Layout"
import Panel from "./components/Panel"
import create from "./apis/create"

function App() {
  const { startRecording, stopRecording, recording, data } = useSpeechRecognition();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get("login");   
    setUser(value ?? "");
  }, [])

  useEffect(() => {
    const text = value.concat(data)
    setValue(text)
  }, [data])

  const isInvalidField = useMemo(() => value.length > 5000, [value])

  const onSave = async () => {
    setLoading(true);
    stopRecording();
    await create(value, user);
    setLoading(false);
  }

  return (
    <Layout>
      <Panel title="TRANSCRIPCIÓN">
        <section className="flex flex-wrap justify-center">
          <div className="gap-5 w-full flex justify-center">
            <Button
              color="danger"
              startContent={<Microphone />}
              isDisabled={loading}
              onClick={() => recording ? stopRecording() : startRecording()}
            >
              {recording ? "Grabando" : "Grabar"}
            </Button>

            <Button
              color="danger"
              startContent={<Send />}
              isDisabled={!value || isInvalidField}
              isLoading={loading}
              onClick={() => onSave()}
            >
              Guardar
            </Button>
          </div>

          <Textarea
            variant="bordered"
            className="max-w-screen-md my-5"
            minRows={6}
            value={value}
            onValueChange={setValue}
            disabled={loading}
            errorMessage={`${value.length} caracteres de 5000 permitidos.`}
            isInvalid={isInvalidField}
          />
        </section>
      </Panel>
    </Layout>
  )
}

export default App
