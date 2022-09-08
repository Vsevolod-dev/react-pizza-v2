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

export const { setActiveCategory, setActiveSort, toggleOrder, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer

