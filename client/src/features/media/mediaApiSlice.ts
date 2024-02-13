import { apiSlice } from "@/api/apiSlice";

const resource = "media";

export const mediaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMedia: builder.query({
      query: (payload) => ({
        url: `/${resource}`,
        method: "POST",
        body: payload,
      }),
      keepUnusedDataFor: 5,
    }),
    getMedia: builder.query({
      query: (id) => `/${resource}/${id}`,
    }),
    createMedia: builder.mutation({
      query: (payload) => ({
        url: `/${resource}/create`,
        method: "POST",
        body: payload,
      }),
    }),
    updateMedia: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${resource}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteMedia: builder.mutation({
      query: (id) => ({
        url: `/${resource}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllMediaQuery,
  useGetMediaQuery,
  useCreateMediaMutation,
  useUpdateMediaMutation,
  useDeleteMediaMutation,
} = mediaApiSlice;
