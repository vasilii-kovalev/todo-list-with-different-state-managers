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
		const filteredTasks = tasks.filter((task) => {
			return (
				task.groupId === groupId
				&& task.id !== taskIdToExclude
				&& !isEmpty(task.name)
			);
		});

		return filteredTasks.map<TaskName>((task) => {
			return task.name;
		});
	},
);

export {
	selectExistingGroupNames,
	selectExistingTaskNames,
	selectGroups,
	selectTasksForGroupId,
};
