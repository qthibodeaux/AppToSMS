import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        postList: builder.mutation({
            query: credentials => ({
                url: './post',
                method: 'POST',
                body: { ...credentials }
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    usePostListMutation
} = authApiSlice