// hooks
import useSpeechRecognition from "./hooks/useSpeechRecognition"
import { useState, useEffect, useMemo, useRef } from "react"

// components
import { Button } from "@nextui-org/button"
import { Textarea } from "@nextui-org/input"
import Layout from "./components/Layout"
import Panel from "./components/Panel"
import { Tooltip } from "@nextui-org/tooltip";

// icons
import SendIcon from "./icons/SendIcon"
import MicrophoneIcon from "./icons/MicrophoneIcon"
import StopIcon from "./icons/StopIcon"
import TrashIcon from "./icons/TrashIcon"

// apis
import create from "./apis/create"
import CopyIcon from "./icons/CopyIcon"

function App() {
  const { startRecording, stopRecording, recording, data } = useSpeechRecognition();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [toltip, setToltip] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);

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

  const onCopy = async () => {
    const value = input.current?.value ?? "";
    await navigator.clipboard.writeText(value);
    setToltip(true);
    setTimeout(() => {
      setToltip(false)
    }, 1000)
  }

  return (
    <Layout>
      <Panel title="TRANSCRIPCIÓN">
        <section className="flex flex-wrap justify-center">
          <div className="gap-5 w-full flex flex-wrap justify-center">
            <Button
              color={recording ? "warning" : "danger"}
              startContent={recording ? <StopIcon /> : <MicrophoneIcon />}
              isDisabled={loading}
              onClick={() => recording ? stopRecording() : startRecording()}
            >
              {recording ? "Pausar" : "Grabar"}
            </Button>
            <Button
              color="danger"
              startContent={<TrashIcon />}
              onClick={() => setValue("")}
              isDisabled={recording}
            >
              Borrar
            </Button>
            <Tooltip
              isOpen={toltip}
              content="Copiado"
              classNames={{content:"p-2"}}
              color="danger"
              isDisabled={recording}
            >
              <Button
                color="danger"
                startContent={<CopyIcon />}
                onClick={() => onCopy()}
                isDisabled={recording}
              >
                Copiar
              </Button>
            </Tooltip>
            <Button
              color="danger"
              startContent={<SendIcon />}
              isDisabled={!value || isInvalidField}
              isLoading={loading}
              onClick={() => onSave()}
            >
              Guardar
            </Button>
          </div>
          <Textarea
            variant="bordered"            
            classNames={{
              base: "max-w-screen-lg py-5",
              input: "min-h-[300px]",
            }}            
            color="primary"            
            value={value}
            onValueChange={setValue}
            disabled={loading}
            errorMessage={`${value.length} caracteres de 5000 permitidos.`}
            isInvalid={isInvalidField}
            ref={input}
          />
        </section>
      </Panel>
    </Layout>
  )
}

export default App
