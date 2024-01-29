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
    getEvent: builder.query({
      query: (id) => `/${resource}/${id}`,
    }),
    createEvent: builder.mutation({
      query: (payload) => ({
        url: `/${resource}/create`,
        method: "POST",
        body: payload,
      }),
    }),
    updateEvent: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${resource}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/${resource}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApiSlice;
