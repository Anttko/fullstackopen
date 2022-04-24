import { createSlice } from '@reduxjs/toolkit'
const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterReducer(state, action) {
            console.log('',action.payload)
            const content = action.payload
            return content
        }
    }
})

export const { filterReducer } = filterSlice.actions
export default filterSlice.reducer