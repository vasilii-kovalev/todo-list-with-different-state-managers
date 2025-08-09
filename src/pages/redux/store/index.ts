import {
	configureStore,
} from "@reduxjs/toolkit";

import {
	toDoReducer,
} from "./reducer";

const store = configureStore({
	reducer: {
		toDo: toDoReducer,
	},
});

type RootState = ReturnType<typeof store.getState>;

type Dispatch = typeof store.dispatch;

export {
	type Dispatch,
	type RootState,
	store,
};
