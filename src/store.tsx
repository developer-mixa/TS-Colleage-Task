import { createSlice, configureStore } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'isAuth',
    initialState: {
        value: false
    },
    reducers: {
        login: state => {
            state.value = true;
        },
        logout: state => {
            state.value = false;
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }
})

const store = configureStore({reducer: authSlice.reducer })

export const { login, logout } = authSlice.actions;

export const selectIsAuth = () => store.getState().value;

export default store
