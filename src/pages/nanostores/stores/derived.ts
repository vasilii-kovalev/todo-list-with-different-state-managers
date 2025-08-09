import {
	isEmpty,
} from "es-toolkit/compat";
import {
	computed,
	type ReadableAtom,
} from "nanostores";

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
	$groups,
	$tasks,
} from "./base";

const $existingGroupNames = (
	groupIdToExclude?: GroupId,
): ReadableAtom<Array<GroupName>> => {
	return computed(
		[
			$groups,
		],
		(
			groups,
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
};

const $tasksForGroupId = (
	groupId: GroupId,
): ReadableAtom<Array<Task>> => {
	return computed(
		[
			$tasks,
		],
		(
			tasks,
		): Array<Task> => {
			return tasks.filter((task) => {
				return task.groupId === groupId;
			});
		},
	);
};

const $existingTaskNames = (
	groupId: GroupId,
	taskIdToExclude?: TaskId,
): ReadableAtom<Array<TaskName>> => {
	return computed(
		[
			$tasks,
		],
		(
			tasks,
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
};

export {
	$existingGroupNames,
	$existingTaskNames,
	$tasksForGroupId,
};
