import { createSlice } from '@reduxjs/toolkit'
import isequal from 'lodash.isequal'
import {RootState} from "../store";

export type CartItem = {
    id: number
    name: string
    price: number
    imageUrl: string
    size: string
    type: string
    count?: number
}

interface CartSliceState {
    items: CartItem[]
    totalPrice: number
    totalCount: number
}

const initialState: CartSliceState = {
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

            const existedId: number = existingItems.findIndex((i: CartItem) => {
                delete i.count
                delete action.payload.count
                return isequal(i, action.payload)
            })

            if (existedId !== -1) {
                // @ts-ignore
                state.items[existedId].count++
            } else {
                state.items.push({...action.payload, count: 1})
            }

            state.totalPrice += action.payload.price
            state.totalCount++
        },
        removeItem(state, action) {
            const existingItems = JSON.parse(JSON.stringify(state.items))

            const existedId = existingItems.findIndex((i: CartItem) => {
                const cpI = i
                const cpAP = action.payload
                delete cpI.count
                delete cpAP.count
                return isequal(cpI, cpAP)
            })

            if (existedId !== -1) {
                // @ts-ignore
                if (state.items[existedId].count > 1) {
                    // @ts-ignore
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
        removeGroup(state, action) {
            const existingItems = JSON.parse(JSON.stringify(state.items))

            const existedId = existingItems.findIndex((i: CartItem) => {
                const cpI = i
                const cpAP = action.payload
                delete cpI.count
                delete cpAP.count
                return isequal(cpI, cpAP)
            })

            if (existedId !== -1) {
                state.items = state.items.filter((item, index) => {
                    if (index === existedId) {
                        if (item.count) {
                            state.totalCount -= item.count
                            state.totalPrice -= item.price * item.count
                        }
                    }
                    return index !== existedId
                })
            }
        }
    },
})

export const selectCart = (state: RootState) => state.cart

export const { addItem, removeItem, clearItems, removeGroup } = cartSlice.actions

export default cartSlice.reducer

