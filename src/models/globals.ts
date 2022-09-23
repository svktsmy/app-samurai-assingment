export type BaseResponse<T> =
   | {
        status: "idle" | "loading" | "failed";
     }
   | {
        status: "success";
        payload: T;
     };
