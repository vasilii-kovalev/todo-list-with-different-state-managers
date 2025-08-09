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
} from "@/features/groups/types";
import {
	type Task,
	type TaskId,
	type TaskName,
} from "@/features/tasks/types";

const tasksAtom = atom<Array<Task>>([]);

const tasksForGroupIdAtom = atomFamily(
	(groupId: GroupId): Atom<Array<Task>> => {
		return atom<Array<Task>>((get) => {
			const tasks = get(tasksAtom);

			return tasks.filter((task) => {
				return task.groupId === groupId;
			});
		});
	},
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

			return tasks.reduce<Array<TaskName>>(
				(
					existingTaskNamesCurrent,
					task,
				) => {
					if (
						task.groupId === groupId
						&& task.id !== taskIdToExclude
						&& !isEmpty(task.name)
					) {
						existingTaskNamesCurrent.push(task.name);
					}

					return existingTaskNamesCurrent;
				},
				[],
			);
		});
	},
	isEqual,
);

export {
	existingTaskNamesAtom,
	tasksAtom,
	tasksForGroupIdAtom,
};
