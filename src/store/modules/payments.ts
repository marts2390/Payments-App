import { createReducer, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";
import {
  ApiResultType,
  GetPaymentProps,
  getPayments,
} from "../../api/payments";

/**
 * Type declarations
 * ---------------------------------------------------------------------
 */

export interface StateProps {
  loading: boolean;
  error: ApiResultType["error"];
  data: ApiResultType["value"];
}

/**
 * Initial State
 * ---------------------------------------------------------------------
 */

export const initialState: StateProps = {
  loading: false,
  error: null,
  data: null,
};

export const fetch = createAsyncThunk<Partial<StateProps>, GetPaymentProps>(
  "payments/fetch",
  async ({ page, size, status }) => {
    const getData = await getPayments({ page, size, status });

    return {
      data: getData.value,
      error: getData.error,
    };
  }
);

export const fetchByDate = createAsyncThunk<
  Partial<StateProps>,
  { from: Dayjs; to: Dayjs; totalItems: number }
>("payments/fetchByDate", async ({ from, to, totalItems }) => {
  const getData = await getPayments({ size: totalItems });
  const filterByDate = getData.value?.items.filter(
    (item) =>
      dayjs(item.createdAt).isAfter(from) && dayjs(item.createdAt).isAfter(to)
  );

  if (!getData.value) {
    return {
      error: getData.error,
    };
  }

  return {
    data: {
      ...getData.value,
      items: filterByDate || [],
    },
    error: getData.error,
  };
});

/**
 * Reducer
 * ---------------------------------------------------------------------
 */

export const reducer = createReducer<StateProps>(initialState, (builder) => {
  builder
    .addCase(fetch.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    .addCase(fetchByDate.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    // Loading start
    .addMatcher(isAnyOf(fetch.pending, fetchByDate.pending), (state) => ({
      ...state,
      loading: true,
    }))
    // Loading end
    .addMatcher(
      isAnyOf(
        fetch.rejected,
        fetch.fulfilled,
        fetchByDate.rejected,
        fetchByDate.fulfilled
      ),
      (state) => ({
        ...state,
        loading: false,
      })
    );
});
