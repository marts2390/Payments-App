import axios, { AxiosResponse } from "axios";

export enum PaymentStatuses {
  created = "CREATED",
  failed = "FAILED",
  settled = "SETTLED",
  completed = "COMPLETED",
  captured = "CAPTURED",
}

export type PaymentResponseItem = {
  id: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  createdAt: string;
};

export type PaymentResponseType = {
  totalNumberOfItems: number;
  numberOfPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  items: Array<PaymentResponseItem>;
};

export type ApiResultType = {
  value: PaymentResponseType | null;
  error: string | null;
};

export interface GetPaymentProps {
  page?: number;
  size?: number;
  status?: string;
}

export const getPayments = async ({ page, size, status }: GetPaymentProps) => {
  const result: ApiResultType = {
    value: null,
    error: null,
  };

  try {
    const res = await axios.get<
      PaymentResponseType,
      AxiosResponse<PaymentResponseType>
    >(process.env.REACT_APP_API_KEY || "", {
      params: {
        size,
        page,
        status,
      },
      auth: {
        username: process.env.REACT_APP_USER || "",
        password: process.env.REACT_APP_USER_PASS || "",
      },
    });

    if (res.status === 200) {
      result.value = res.data;
    } else {
      result.error = `API error, status: ${res.status}`;
    }
  } catch (err) {
    if (err instanceof Error) {
      result.error = err.message;
    } else {
      new Error("Network error, try again later");
    }
  }

  return result;
};
