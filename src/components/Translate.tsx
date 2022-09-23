import { useStore } from "@nanostores/react";
import classNames from "classnames";
import { Fragment, useEffect, useMemo, useState } from "react";
import useTranslateService, {
  translateOutputAtom,
} from "../services/translate/useTranslateService";
import SpeechRecognition from "../utils/helpers/speechRecognition";

function Translate() {
  const { translate } = useTranslateService();
  const translateOutput = useStore(translateOutputAtom);
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
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
      recognition.onerror = () => {
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
    <Fragment>
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
      <button
        onClick={() => translate(value)}
        className={classNames("translate-button", {
          loading: translateOutput.status === "loading",
        })}
      >
        {translateOutput.status === "loading" ? "translating..." : "translate"}
      </button>
      <div
        className={classNames("translate-response-container", {
          empty: translateOutput.status !== "success",
        })}
      >
        {translateOutput.status === "success" && (
          <div>{translateOutput.payload.translatedText}</div>
        )}
      </div>
    </Fragment>
  );
}

export default Translate;
