import {
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

import {
	type GroupId,
} from "@/features/groups/types";
import {
	type Task,
	type TaskId,
} from "@/features/tasks/types";

import {
	tasksAdapter,
} from "./entity-adapters";
import {
	selectTasksForGroupId,
} from "./selectors";

const initialState = tasksAdapter.getInitialState();

type TasksState = typeof initialState;

const tasksSlice = createSlice({
	initialState,
	name: "tasks",
	reducers: {
		addTask: (
			state,
			action: PayloadAction<Task>,
		) => {
			tasksAdapter.addOne(
				state,
				action.payload,
			);
		},
		removeTask: (
			state,
			action: PayloadAction<TaskId>,
		) => {
			tasksAdapter.removeOne(
				state,
				action.payload,
			);
		},
		removeTasksForGroup: (
			state,
			action: PayloadAction<GroupId>,
		) => {
			const tasks = selectTasksForGroupId(
				state,
				action.payload,
			);
			const taskIds = tasks.map<TaskId>((task) => {
				return task.id;
			});

			tasksAdapter.removeMany(
				state,
				taskIds,
			);
		},
		resetState: () => {
			return initialState;
		},
		updateTaskIsCompleted: (
			state,
			action: PayloadAction<
				Pick<
					Task,
					| "id"
					| "isCompleted"
				>
			>,
		) => {
			const {
				id,
				isCompleted,
			} = action.payload;

			tasksAdapter.updateOne(
				state,
				{
					changes: {
						isCompleted,
					},
					id,
				},
			);
		},
		updateTaskName: (
			state,
			action: PayloadAction<
				Pick<
					Task,
					| "id"
					| "name"
				>
			>,
		) => {
			const {
				id,
				name,
			} = action.payload;

			tasksAdapter.updateOne(
				state,
				{
					changes: {
						name,
					},
					id,
				},
			);
		},
	},
});

const tasksReducer = tasksSlice.reducer;
const {
	addTask,
	removeTask,
	removeTasksForGroup,
	updateTaskIsCompleted,
	updateTaskName,
	resetState,
} = tasksSlice.actions;

export {
	addTask,
	removeTask,
	removeTasksForGroup,
	resetState as resetTasksState,
	tasksReducer,
	type TasksState,
	updateTaskIsCompleted,
	updateTaskName,
};
