import { AxiosError } from "axios";

export class ErrorHandle {
  static errorMessage(error: AxiosError): string {
    let errorMsg: any = "An unexpected error occurred";

    if (typeof error === "string") {
      // If the error is a string, use it directly as the error message
      errorMsg = error;
    } else if (error.response && error.response.data) {
      // If the error has a response from the server and contains data, extract the error message
      errorMsg = error.response.data || error.response.statusText || errorMsg;
    } else if (error instanceof Error) {
      // If the error is an instance of Error, use its message
      errorMsg = error.message;
    }

    return errorMsg;
  }
}
