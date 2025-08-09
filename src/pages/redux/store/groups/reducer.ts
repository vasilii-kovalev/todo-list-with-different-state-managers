import {
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

import {
	type Group,
	type GroupId,
} from "@/features/groups/types";

import {
	groupsAdapter,
} from "./entity-adapters";

const initialState = groupsAdapter.getInitialState();

type GroupsState = typeof initialState;

const groupsSlice = createSlice({
	initialState,
	name: "groups",
	reducers: {
		addGroup: (
			state,
			action: PayloadAction<Group>,
		) => {
			groupsAdapter.addOne(
				state,
				action.payload,
			);
		},
		removeGroup: (
			state,
			action: PayloadAction<GroupId>,
		) => {
			groupsAdapter.removeOne(
				state,
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
				state,
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

const groupsReducer = groupsSlice.reducer;
const {
	addGroup,
	removeGroup,
	updateGroupIsCollapsed,
	updateGroupName,
	resetState,
} = groupsSlice.actions;

export {
	addGroup,
	groupsReducer,
	type GroupsState,
	removeGroup,
	resetState as resetGroupsState,
	updateGroupIsCollapsed,
	updateGroupName,
};
