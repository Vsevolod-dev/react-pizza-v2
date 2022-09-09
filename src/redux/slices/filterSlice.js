import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    category: 0,
    currentPage: 0,
    activeSort: 0,
    order: 1,
    searchInput: ''
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
        },
        setSearchInput: (state, action) => {
            state.searchInput = action.payload
        },
        setFilters: (state, action) => {
            const keys = Object.keys(state)
            const params = action.payload
            keys.forEach(key => {
                if (params.hasOwnProperty(key)) {
                    state[key] = +params[key]
                }
            })
        }
    },
})

export const selectFilter = state => state.filter
export const selectFilterCategory = state => state.filter.category
export const selectFilterSearchInput = state => state.filter.searchInput

export const { setActiveCategory, setActiveSort, toggleOrder, setCurrentPage, setFilters, setSearchInput } = filterSlice.actions

export default filterSlice.reducer

