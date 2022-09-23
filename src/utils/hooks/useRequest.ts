import { useCallback } from "react";
import { BaseResponse } from "../../models/globals";

const useRequest = () => {
  const request = async <T>(
    url: string,
    method: "GET" | "POST" | "DELETE" | "PUT" = "GET",
    body?: object
  ): Promise<BaseResponse<T>> => {
    try {
      const raw = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      if (raw.ok) {
        const json = await raw.json();
        return { status: "success", payload: json };
      }
      return { status: "failed" };
    } catch (error) {
      return { status: "failed" };
    }
  };

  return {
    request: useCallback(request, []),
  };
};

export default useRequest;
