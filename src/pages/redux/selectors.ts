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
	type Task,
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
	selectAll: selectGroups,
} = groupsAdapter.getSelectors();

const {
	selectAll: selectTasks,
} = tasksAdapter.getSelectors();

const selectTasksForGroupId = createSelector(
	[
		selectTasks,
		(state: ToDoState["tasks"], groupId: GroupId): GroupId => {
			return groupId;
		},
	],
	(
		tasks,
		groupId,
	): Array<Task> => {
		return tasks.filter((task) => {
			return task.groupId === groupId;
		});
	},
);

const selectExistingGroupNames = createSelector(
	[
		selectGroups,
		(state: ToDoState["groups"], groupIdToExclude?: GroupId): GroupId | undefined => {
			return groupIdToExclude;
		},
	],
	(
		groups,
		groupIdToExclude,
	): Array<GroupName> => {
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
		selectTasks,
		(state: ToDoState["tasks"], groupId: GroupId): GroupId => {
			return groupId;
		},
		(state: ToDoState["tasks"], groupId: GroupId, taskIdToExclude?: TaskId): TaskId | undefined => {
			return taskIdToExclude;
		},
	],
	(
		tasks,
		groupId,
		taskIdToExclude,
	): Array<TaskName> => {
		return tasks.reduce<Array<TaskName>>(
			(
				existingItemNamesCurrent,
				task,
			) => {
				if (
					task.groupId === groupId
					&& task.id !== taskIdToExclude
					&& !isEmpty(task.name)
				) {
					existingItemNamesCurrent.push(task.name);
				}

				return existingItemNamesCurrent;
			},
			[],
		);
	},
);

export {
	selectExistingGroupNames,
	selectExistingTaskNames,
	selectGroups,
	selectTasksForGroupId,
};
