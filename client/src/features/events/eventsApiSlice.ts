import { apiSlice } from "@/api/apiSlice";

const resource = "events";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: (payload) => ({
        url: `/${resource}`,
        method: "POST",
        body: payload,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllEventsQuery } = eventsApiSlice;
