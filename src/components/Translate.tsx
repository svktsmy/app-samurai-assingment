import { useStore } from "@nanostores/react";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import useTranslateService, {
  translateOutputAtom,
} from "../services/translate/useTranslateService";
import SpeechRecognition from "../utils/helpers/speechRecognition";

function Translate() {
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const { translate } = useTranslateService();
  const translateOutput = useStore(translateOutputAtom);

  const canRecord = useMemo(() => typeof SpeechRecognition !== "undefined", []);

  useEffect(() => {
    if (isRecording && canRecord) {
      const recognition = new SpeechRecognition();
      recognition.start();
      recognition.lang = "en-US";
      recognition.onspeechend = () => {
        setIsRecording(false);
        recognition.stop();
      };
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setValue(transcript);
          translate(transcript);
        }
      };
      return () => {
        recognition.stop();
      };
    }
  }, [isRecording, canRecord, translate]);

  return (
    <div>
      <div className="textarea-container">
        <textarea
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        <button
          className={classNames(
            "record-button",
            { active: isRecording },
            { disabled: !canRecord }
          )}
          onClick={() => setIsRecording((x) => !x)}
        >
          {isRecording ? "recording..." : "record"}
        </button>
      </div>
      <button onClick={() => translate(value)} className="translate-button">
        {translateOutput.status === "loading" ? "translating..." : "translate"}
      </button>
      {translateOutput.status === "success" && (
        <div className="translate-response-container">
          {translateOutput.payload.translatedText}
        </div>
      )}
    </div>
  );
}

export default Translate;
