/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

interface ErrorData {
  status: number;
  success: boolean;
  message: string;
}

const Helpers = {
  handleAxiosError(error: AxiosError): any {
    if (error.response) {
      const { status, data } = error.response;
      if (data && typeof data === "object" && "message" in data) {
        const errorData: ErrorData = data as ErrorData;
        throw `Request failed with status ${status}: ${errorData.message}`;
      } else if (data && typeof data === "object" && !("message" in data)) {
        throw `Request failed with status ${status}`;
      } else {
        throw `Request failed with status ${status}: ${data}`;
      }
    } else if (error.request) {
      throw `No response received. Request: ${error.request}`;
    } else {
      throw `An error occurred: ${error.message}`;
    }
  },

  handleAxiosSuccess(response: any): any {
    if (response.data && typeof response.data === "object") {
      return { data: response.data, message: response.message };
    } else if (!response.data && response.message) {
      return { message: response.message };
    } else {
      throw `Request failed with status ${response.status}: ${response.data}`;
    }
  },
};

export default Helpers;
