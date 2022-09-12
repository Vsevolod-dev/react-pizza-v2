import { createSlice } from '@reduxjs/toolkit'
import {RootState} from "../store";

interface FilterSliceState {
    category: number
    currentPage: number
    activeSort: number
    order: number | boolean
    searchInput: string
}

const initialState: FilterSliceState = {
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
        setFilters: (state: FilterSliceState, action) => {
            const keys: string[] = Object.keys(state)
            const params = action.payload
            keys.forEach((key: string) => {
                if (params.hasOwnProperty(key)) {
                    // @ts-ignore
                    state[key] = +params[key]
                }
            })
        }
    },
})

export const selectFilter = (state: RootState )=> state.filter
export const selectFilterCategory = (state: RootState )=> state.filter.category
export const selectFilterSearchInput = (state: RootState )=> state.filter.searchInput

export const { setActiveCategory, setActiveSort, toggleOrder, setCurrentPage, setFilters, setSearchInput } = filterSlice.actions

export default filterSlice.reducer

