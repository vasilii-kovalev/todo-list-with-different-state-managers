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
	type TaskId,
	type TaskName,
} from "@/features/tasks/types";

import {
	groupsAdapter,
	tasksAdapter,
} from "./entity-adapters";
import {
	type ToDoState,
} from "./reducer";

const {
	selectAll: selectAllGroups,
} = groupsAdapter.getSelectors();

const {
	selectAll: selectAllTasks,
} = tasksAdapter.getSelectors();

const selectAllTasksForGroupId = createSelector(
	[
		selectAllTasks,
		(state: ToDoState["tasks"], groupId: GroupId) => {
			return groupId;
		},
	],
	(
		tasks,
		groupId,
	) => {
		return tasks.filter((task) => {
			return task.groupId === groupId;
		});
	},
);

const selectExistingGroupNames = createSelector(
	[
		selectAllGroups,
		(state: ToDoState["groups"], groupIdToExclude: GroupId | undefined) => {
			return groupIdToExclude;
		},
	],
	(
		groups,
		groupIdToExclude,
	) => {
		return groups.reduce<Array<GroupName>>(
			(
				existingGroupNamesCurrent,
				group,
			) => {
				const {
					id,
					name,
				} = group;

				if (
					id !== groupIdToExclude
					&& !isEmpty(name)
				) {
					existingGroupNamesCurrent.push(name);
				}

				return existingGroupNamesCurrent;
			},
			[],
		);
	},
);

const selectExistingTaskNames = createSelector(
	[
		selectAllTasks,
		(state: ToDoState["tasks"], taskIdToExclude: TaskId | undefined) => {
			return taskIdToExclude;
		},
	],
	(
		tasks,
		taskIdToExclude,
	) => {
		return tasks.reduce<Array<TaskName>>(
			(
				existingItemNamesCurrent,
				task,
			) => {
				const {
					id,
					name,
				} = task;

				if (
					id !== taskIdToExclude
					&& !isEmpty(name)
				) {
					existingItemNamesCurrent.push(name);
				}

				return existingItemNamesCurrent;
			},
			[],
		);
	},
);

export {
	selectAllGroups,
	selectAllTasksForGroupId,
	selectExistingGroupNames,
	selectExistingTaskNames,
};
