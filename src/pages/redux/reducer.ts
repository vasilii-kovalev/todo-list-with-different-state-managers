import {
	createSlice,
	type EntityState,
	type PayloadAction,
} from "@reduxjs/toolkit";
import {
	isEmpty,
} from "es-toolkit/compat";

import {
	type Group,
	type GroupId,
} from "@/features/groups/types";
import {
	type Task,
	type TaskId,
} from "@/features/tasks/types";

import {
	groupsAdapter,
	tasksAdapter,
} from "./entity-adapters";

interface ToDoState {
	groups: EntityState<Group, GroupId>;
	tasks: EntityState<Task, TaskId>;
}

const initialState: ToDoState = {
	groups: groupsAdapter.getInitialState(),
	tasks: tasksAdapter.getInitialState(),
};

const slice = createSlice({
	initialState,
	name: "toDo",
	reducers: {
		addGroup: (
			state,
			action: PayloadAction<Group>,
		) => {
			groupsAdapter.addOne(
				state.groups,
				action.payload,
			);
		},
		addTask: (
			state,
			action: PayloadAction<Task>,
		) => {
			tasksAdapter.addOne(
				state.tasks,
				action.payload,
			);
		},
		removeGroup: (
			state,
			action: PayloadAction<GroupId>,
		) => {
			const groupId = action.payload;

			groupsAdapter.removeOne(
				state.groups,
				groupId,
			);

			const taskIdsToRemove = state.tasks.ids.filter((taskId) => {
				const task = state.tasks.entities[taskId];

				return task?.groupId === groupId;
			});

			if (!isEmpty(taskIdsToRemove)) {
				tasksAdapter.removeMany(
					state.tasks,
					taskIdsToRemove,
				);
			}
		},
		removeTask: (
			state,
			action: PayloadAction<TaskId>,
		) => {
			tasksAdapter.removeOne(
				state.tasks,
				action.payload,
			);
		},
		resetState: () => {
			return initialState;
		},
		updateGroupIsCollapsed: (
			state,
			action: PayloadAction<
				Pick<
					Group,
					| "id"
					| "isCollapsed"
				>
			>,
		) => {
			const {
				id,
				isCollapsed,
			} = action.payload;

			groupsAdapter.updateOne(
				state.groups,
				{
					changes: {
						isCollapsed,
					},
					id,
				},
			);
		},
		updateGroupName: (
			state,
			action: PayloadAction<
				Pick<
					Group,
					| "id"
					| "name"
				>
			>,
		) => {
			const {
				id,
				name,
			} = action.payload;

			groupsAdapter.updateOne(
				state.groups,
				{
					changes: {
						name,
					},
					id,
				},
			);
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
				state.tasks,
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
				state.tasks,
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

const toDoReducer = slice.reducer;
const {
	addGroup,
	addTask,
	removeGroup,
	removeTask,
	updateGroupIsCollapsed,
	updateGroupName,
	updateTaskIsCompleted,
	updateTaskName,
	resetState,
} = slice.actions;

export {
	addGroup,
	addTask,
	removeGroup,
	removeTask,
	resetState,
	toDoReducer,
	type ToDoState,
	updateGroupIsCollapsed,
	updateGroupName,
	updateTaskIsCompleted,
	updateTaskName,
};
