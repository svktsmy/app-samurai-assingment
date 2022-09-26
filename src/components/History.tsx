import { useStore } from "@nanostores/react";
import { historyAtom } from "../services/translate/useTranslateService";

function History() {
  const history = useStore(historyAtom);

  if (history.length > 0)
    return (
      <div className="history">
        <h3>history</h3>
        <ul>
          {history.map((item, index) => (
            <li key={item.originalText + index}>
              <div>{item.originalText}</div>
              <div>{item.translatedText}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  return null;
}

export default History;
