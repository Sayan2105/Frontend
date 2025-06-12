import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    image: string;
    gender: string;
}

interface state {
    user: User | null,
    signIntime: number | null
}

const initialState: state = {
    user: null,
    signIntime: null
}


const isSessionExpired = (timeStamp: number) => {
    const currentTime = Date.now()
    const elapsedTime = currentTime - timeStamp   // providin elapsed time
    return elapsedTime >= 60 * 60 * 24 * 1000  // if elapse time will be more than 24 hour then return trur
}


export const userAuthSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {

        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.signIntime = Date.now()
        },

        logout: (state) => {
            state.user = null
            state.signIntime = null
        },

        checkSession: (state) => {
            if (state.signIntime && isSessionExpired(state.signIntime)) {
                state.user = null
                state.signIntime = null
            }
        }

    }
})


export const { setUser, logout, checkSession } = userAuthSlice.actions
export const authSelector = (state: RootState) => state.auth
export default userAuthSlice.reducer