import { createSlice } from '@reduxjs/toolkit'
import isequal from 'lodash.isequal'

const initialState = {
    items: [],
    totalPrice: 0,
    totalCount: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const existingItems = JSON.parse(JSON.stringify(state.items));

            const existedId = existingItems.findIndex(i => {
                delete i.count
                delete action.payload.count
                return isequal(i, action.payload)
            })

            if (existedId !== -1) {
                state.items[existedId].count++
            } else {
                action.payload.count = 1
                state.items.push(action.payload)
            }

            state.totalPrice += action.payload.price
            state.totalCount++
        },
        removeItem(state, action) {
            const existingItems = JSON.parse(JSON.stringify(state.items))

            const existedId = existingItems.findIndex(i => {
                const cpI = i
                const cpAP = action.payload
                delete cpI.count
                delete cpAP.count
                return isequal(cpI, cpAP)
            })

            if (existedId) {
                if (state.items[existedId].count > 1) {
                    state.items[existedId].count--
                }
                else state.items = state.items.filter((item, index) => index !== existedId)
            }

            state.totalCount--
            state.totalPrice -= action.payload.price
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        },
    },
})

export const { addItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer

