import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { thunk } from "redux-thunk";

const reducer = combineReducers({

})

const store = configureStore({
    reducer,
    middleware: [thunk]
})

module.exports = store


/*
  //* Redux Overview and Core Concepts - personal notes (not related to the project)

  **Store:**
  - Central repository for the entire state of your application.
  - Holds all the data your app needs, acting as a single source of truth.

  **Reducer:**
  - Function that specifies how the state should change in response to an action.
  - Takes the current state and an action as arguments, returns a new state.
  - Pure function: No side effects, just computes a new state based on inputs.

  **Action:**
  - Object describing what happened in the app.
  - Contains a `type` property (a string) and optionally a `payload` (additional data).
  - Example: { type: 'ADD_TO_CART', payload: { id: 1, name: 'Product 1' } }

  **Dispatch:**
  - Method to send actions to the store.
  - Triggers the reducer to calculate and update the state based on the action.

  **Provider:**
  - A component from `react-redux` that makes the Redux store available to your app.
  - Wraps your entire application, allowing components to access and interact with the store.

  **Flow of Redux Code:**
  1. **Create a Store:**
     - Define initial state (e.g., `cart: []` for an empty shopping cart).
     - Create a reducer (e.g., `cartReducer`) to handle actions and update the state.
     - Use `createStore` to create the store with the reducer.

  2. **Provide the Store:**
     - Wrap your app with `<Provider>` to make the Redux store accessible throughout your app.

  3. **Dispatch Actions from Components:**
     - Components dispatch actions using `dispatch()`.
     - Example: Adding a product to the cart by dispatching an `ADD_TO_CART` action.

  4. **Update the State and Re-Render:**
     - The reducer processes dispatched actions and updates the state.
     - Components using `useSelector` read the updated state and re-render accordingly.

  **Summary:**
  - **Store:** Holds the state.
  - **Reducer:** Updates state based on actions.
  - **Action:** Describes changes and carries data.
  - **Dispatch:** Sends actions to the store.
  - **Provider:** Makes store accessible to components.

  This setup provides a centralized, predictable way to manage state across your React application.
*/
