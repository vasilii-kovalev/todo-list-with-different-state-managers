import {
	configureStore,
} from "@reduxjs/toolkit";

import {
	groupsReducer,
} from "./groups/reducer";
import {
	tasksReducer,
} from "./tasks/reducer";

const store = configureStore({
	reducer: {
		groups: groupsReducer,
		tasks: tasksReducer,
	},
});

type RootState = ReturnType<typeof store.getState>;

type Dispatch = typeof store.dispatch;

export {
	type Dispatch,
	type RootState,
	store,
};
