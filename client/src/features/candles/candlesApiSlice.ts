import { apiSlice } from "@/api/apiSlice";

const resource = "candles";

export const candlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCandles: builder.query({
      query: (payload) => ({
        url: `/${resource}`,
        method: "POST",
        body: payload,
      }),
      keepUnusedDataFor: 5,
    }),
    getCandle: builder.query({
      query: (id) => `/${resource}/${id}`,
    }),
    createCandle: builder.mutation({
      query: (payload) => ({
        url: `/${resource}/create`,
        method: "POST",
        body: payload,
      }),
    }),
    updateCandle: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${resource}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteCandle: builder.mutation({
      query: (id) => ({
        url: `/${resource}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCandlesQuery,
  useGetCandleQuery,
  useCreateCandleMutation,
  useUpdateCandleMutation,
  useDeleteCandleMutation,
} = candlesApiSlice;
