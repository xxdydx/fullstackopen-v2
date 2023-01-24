import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice ({
    name: 'filter',
    initialState: null,
    reducers: {
        setFilter (state, action){
            const filter = action.payload
            return filter
        },

    }
})

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer