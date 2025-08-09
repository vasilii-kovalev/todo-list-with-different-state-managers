import {
	createSelector,
} from "@reduxjs/toolkit";
import {
	isEmpty,
} from "es-toolkit/compat";

import {
	type GroupId,
	type GroupName,
} from "@/features/groups/types";

import {
	groupsAdapter,
} from "./entity-adapters";
import {
	type GroupsState,
} from "./reducer";

const {
	selectAll: selectGroups,
} = groupsAdapter.getSelectors();

const selectExistingGroupNames = createSelector(
	[
		selectGroups,
		(state: GroupsState, groupIdToExclude?: GroupId): GroupId | undefined => {
			return groupIdToExclude;
		},
	],
	(
		groups,
		groupIdToExclude,
	): Array<GroupName> => {
		const filteredGroups = groups.filter((group) => {
			return (
				group.id !== groupIdToExclude
				&& !isEmpty(group.name)
			);
		});

		return filteredGroups.map<GroupName>((group) => {
			return group.name;
		});
	},
);

export {
	selectExistingGroupNames,
	selectGroups,
};
