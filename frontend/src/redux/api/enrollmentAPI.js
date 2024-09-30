import { createApi } from "@reduxjs/toolkit/query/react";
import defaultFetchBase from "./defaultFetchBase";

export const enrollmentAPI = createApi({
    reducerPath: "enrollmentAPI",
    baseQuery: defaultFetchBase,
    tagTypes: ["Enrollments"],
    endpoints: (builder) => ({
        createEnrollment: builder.mutation({
            query(enrollment) {
                return {
                    url: '/enrollments/create',
                    method: 'POST',
                    credentials: 'include',
                    body: enrollment,
                };
            },
            invalidatesTags: [{ type: 'Enrollments', id: 'LIST' }],
            transformResponse: (result) => result,
        }),
        updateEnrollment: builder.mutation({
            query({ id, enrollment }) {
                console.log(id, enrollment);
                return {
                    url: `/enrollments/update/${id}`,
                    method: 'PUT',
                    credentials: 'include',
                    body: enrollment,
                };
            },
            transformResponse: (response) => response,
        }),
        getEnrollmentById: builder.query({
            query(id) {
                return {
                    url: `/enrollments/getOneEnrollment/${id}`,
                    credentials: 'include',
                };
            },
            providesTags: (_result, _error, id) => [{ type: 'Enrollments', id }],
        }),
        getEnrollments: builder.query({
            query(args) {
                return {
                    url: `/enrollments`,
                    params: { ...args },
                    credentials: 'include',
                };
            },
            transformResponse: (results) => results,
        }),
        deleteEnrollment: builder.mutation({
            query(id) {
                return {
                    url: `/enrollments/delete/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                };
            },
            invalidatesTags: [{ type: 'Enrollments', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetEnrollmentQuery,
    useCreateEnrollmentMutation,
    useDeleteEnrollmentMutation,
    useGetEnrollmentsQuery,
    useUpdateEnrollmentMutation,
    useGetEnrollmentByIdQuery
} = enrollmentAPI
