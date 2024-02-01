import { apiSlice } from "@/api/apiSlice";

const resource = "memories";

export const memoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMemories: builder.query({
      query: (payload) => ({
        url: `/${resource}`,
        method: "POST",
        body: payload,
      }),
      keepUnusedDataFor: 5,
    }),
    getMemory: builder.query({
      query: (id) => `/${resource}/${id}`,
    }),
    createMemory: builder.mutation({
      query: (payload) => ({
        url: `/${resource}/create`,
        method: "POST",
        body: payload,
      }),
    }),
    updateMemory: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${resource}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteMemory: builder.mutation({
      query: (id) => ({
        url: `/${resource}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllMemoriesQuery,
  useGetMemoryQuery,
  useCreateMemoryMutation,
  useUpdateMemoryMutation,
  useDeleteMemoryMutation,
} = memoriesApiSlice;
