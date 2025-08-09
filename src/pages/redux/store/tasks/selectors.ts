import {
	createDraftSafeSelector,
	createSelector,
} from "@reduxjs/toolkit";
import {
	isEmpty,
} from "es-toolkit/compat";

import {
	type GroupId,
} from "@/features/groups/types";
import {
	type Task,
	type TaskId,
	type TaskName,
} from "@/features/tasks/types";

import {
	tasksAdapter,
} from "./entity-adapters";
import {
	type TasksState,
} from "./reducer";

const {
	selectAll: selectTasks,
} = tasksAdapter.getSelectors();

const selectTasksForGroupId = createDraftSafeSelector(
	[
		selectTasks,
		(state: TasksState, groupId: GroupId): GroupId => {
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

const selectExistingTaskNames = createSelector(
	[
		selectTasks,
		(state: TasksState, groupId: GroupId): GroupId => {
			return groupId;
		},
		(state: TasksState, groupId: GroupId, taskIdToExclude?: TaskId): TaskId | undefined => {
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
	selectExistingTaskNames,
	selectTasksForGroupId,
};
