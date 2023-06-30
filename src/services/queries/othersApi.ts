import { apiSlice } from "../apiSlice";

const othersApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addTask: builder.mutation({
      query: (data: any) => ({
        url: "/task/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),

    getAllTask: builder.query({
      query: (email: string) => ({
        url: `/task/all/${email}`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),

    getTodayTask: builder.query({
      query: (email: string) => ({
        url: `/task/today/${email}`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),

    getArchiveTasks: builder.query({
      query: (email: string) => ({
        url: `/task/archive/${email}`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),

    changeStatus: builder.mutation({
      query: (data: any) => ({
        url: `/task/status/${data?.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),

    deleteTask: builder.mutation({
      query: (id: string) => {
        return {
          url: `/task/del/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetAllTaskQuery,
  useGetTodayTaskQuery,
  useGetArchiveTasksQuery,
  useDeleteTaskMutation,
  useChangeStatusMutation,
} = othersApi;
