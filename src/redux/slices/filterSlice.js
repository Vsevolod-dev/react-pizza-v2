import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    category: 0,
    currentPage: 0,
    activeSort: 0,
    order: 1
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.category = action.payload
        },
        setActiveSort: (state, action) => {
            state.activeSort = action.payload
        },
        toggleOrder: (state) => {
            state.order = !state.order
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    },
})

export const { setActiveCategory, setActiveSort, toggleOrder, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer

