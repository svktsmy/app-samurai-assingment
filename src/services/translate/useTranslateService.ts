import { atom } from "nanostores";
import { useCallback } from "react";
import { BaseResponse } from "../../models/globals";
import { TranslateOutput } from "../../models/services/translate";
import useRequest from "../../utils/hooks/useRequest";

export const translateOutputAtom = atom<BaseResponse<TranslateOutput>>({
  status: "idle",
});
export const historyAtom = atom<TranslateOutput[]>([]);

const useTranslateService = () => {
  const { request } = useRequest();

  const translate = async (q: string) => {
    const translateOutput = translateOutputAtom.get();
    if (translateOutput.status === "loading") {
      return;
    }
    if (translateOutput.status === "success") {
      const history = historyAtom.get();
      historyAtom.set([translateOutput.payload, ...history]);
    }
    translateOutputAtom.set({ status: "loading" });
    const response = await request<TranslateOutput>(
      "https://translate.argosopentech.com/translate",
      "POST",
      { q, source: "en", target: "tr" }
    );
    if (response.status === "success") {
      translateOutputAtom.set({
        status: "success",
        payload: { text: q, translatedText: response.payload.translatedText },
      });
    }
  };

  return {
    translate: useCallback(translate, [request]),
  };
};

export default useTranslateService;
