import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {CartItem} from "./cartSlice";

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: CartItem[],
    status: Status
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async (params: string) => {
        const res = await axios.get('https://62fd0d3fb9e38585cd4bd016.mockapi.io/pizzas?limit=4&' + params)
        return res.data
    }
)


const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state: PizzaSliceState) => {
                state.status = Status.LOADING
                state.items = []
            })
        builder.addCase(fetchPizzas.fulfilled, (state: PizzaSliceState, action: PayloadAction<CartItem[]>) => {
                state.items = action.payload
                state.status = Status.SUCCESS
            })
        builder.addCase(fetchPizzas.rejected, (state: PizzaSliceState, action) => {
                console.error(action.payload)
                state.status = Status.ERROR
            })
    }
})

export const selectPizza = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer

