import {
	isEmpty,
	isEqual,
} from "es-toolkit/compat";
import {
	type Atom,
	atom,
} from "jotai";
import {
	atomFamily,
} from "jotai/utils";

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
	groupsAtom,
	tasksAtom,
} from "./base";

const existingGroupNamesAtom = atomFamily(
	(groupIdToExclude: GroupId | undefined): Atom<Array<GroupName>> => {
		return atom<Array<GroupName>>((get) => {
			const groups = get(groupsAtom);

			const filteredGroups = groups.filter((group) => {
				return (
					group.id !== groupIdToExclude
					&& !isEmpty(group.name)
				);
			});

			return filteredGroups.map<GroupName>((group) => {
				return group.name;
			});
		});
	},
);

const tasksForGroupIdAtom = atomFamily(
	(groupId: GroupId): Atom<Array<Task>> => {
		return atom<Array<Task>>((get) => {
			const tasks = get(tasksAtom);

			return tasks.filter((task) => {
				return task.groupId === groupId;
			});
		});
	},
	isEqual,
);

interface ExistingTaskNamesAtomPayload {
	groupId: GroupId;
	taskIdToExclude?: TaskId;
}

const existingTaskNamesAtom = atomFamily(
	(payload: ExistingTaskNamesAtomPayload) => {
		const {
			groupId,
			taskIdToExclude,
		} = payload;

		return atom<Array<TaskName>>((get) => {
			const tasks = get(tasksAtom);

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
		});
	},
	isEqual,
);

export {
	existingGroupNamesAtom,
	existingTaskNamesAtom,
	tasksForGroupIdAtom,
};
