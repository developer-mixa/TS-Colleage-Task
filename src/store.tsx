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
        }
    }
})

const store = configureStore({reducer: authSlice.reducer })

export const { login, logout } = authSlice.actions;

export const selectIsAuth = () => store.getState().value;

export default store
