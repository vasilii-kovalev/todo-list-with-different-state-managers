import {
	atom,
} from "jotai";

import {
	type Group,
	type GroupId,
} from "@/features/groups/types";
import {
	type Task,
	type TaskId,
} from "@/features/tasks/types";

import {
	groupsAtom,
} from "./atoms/groups";
import {
	tasksAtom,
} from "./atoms/tasks";

const addGroupAtom = atom(
	null,
	(
		get,
		set,
		group: Group,
	) => {
		const groups = get(groupsAtom);

		const isGroupAlreadyExists = groups.some(
			(groupItem) => {
				return groupItem.id === group.id;
			},
		);

		if (!isGroupAlreadyExists) {
			set(
				groupsAtom,
				[
					...groups,
					group,
				],
			);
		}
	},
);

const addTaskAtom = atom(
	null,
	(
		get,
		set,
		task: Task,
	) => {
		const tasks = get(tasksAtom);

		const isTaskAlreadyExists = tasks.some(
			(taskItem) => {
				return taskItem.id === task.id;
			},
		);

		if (!isTaskAlreadyExists) {
			set(
				tasksAtom,
				[
					...tasks,
					task,
				],
			);
		}
	},
);

const removeGroupAtom = atom(
	null,
	(
		get,
		set,
		groupId: GroupId,
	) => {
		const groups = get(groupsAtom);
		const tasks = get(tasksAtom);

		set(
			groupsAtom,
			groups.filter(
				(groupItem) => {
					return groupItem.id !== groupId;
				},
			),
		);

		set(
			tasksAtom,
			tasks.filter(
				(taskItem) => {
					return taskItem.groupId !== groupId;
				},
			),
		);
	},
);

const removeTaskAtom = atom(
	null,
	(
		get,
		set,
		taskId: TaskId,
	) => {
		const tasks = get(tasksAtom);

		set(
			tasksAtom,
			tasks.filter(
				(taskItem) => {
					return taskItem.id !== taskId;
				},
			),
		);
	},
);

const updateGroupIsCollapsedAtom = atom(
	null,
	(
		get,
		set,
		payload: Pick<
			Group,
			| "id"
			| "isCollapsed"
		>,
	) => {
		const {
			id,
			isCollapsed,
		} = payload;
		const groups = get(groupsAtom);

		set(
			groupsAtom,
			groups.map(
				(groupItem) => {
					if (groupItem.id === id) {
						return {
							...groupItem,
							isCollapsed,
						};
					}

					return groupItem;
				},
			),
		);
	},
);

const updateGroupNameAtom = atom(
	null,
	(
		get,
		set,
		payload: Pick<
			Group,
			| "id"
			| "name"
		>,
	) => {
		const {
			id,
			name,
		} = payload;
		const groups = get(groupsAtom);

		set(
			groupsAtom,
			groups.map(
				(groupItem) => {
					if (groupItem.id === id) {
						return {
							...groupItem,
							name,
						};
					}

					return groupItem;
				},
			),
		);
	},
);

const updateTaskIsCompletedAtom = atom(
	null,
	(
		get,
		set,
		payload: Pick<
			Task,
			| "id"
			| "isCompleted"
		>,
	) => {
		const {
			id,
			isCompleted,
		} = payload;
		const tasks = get(tasksAtom);

		set(
			tasksAtom,
			tasks.map(
				(taskItem) => {
					if (taskItem.id === id) {
						return {
							...taskItem,
							isCompleted,
						};
					}

					return taskItem;
				},
			),
		);
	},
);

const updateTaskNameAtom = atom(
	null,
	(
		get,
		set,
		payload: Pick<
			Task,
			| "id"
			| "name"
		>,
	) => {
		const {
			id,
			name,
		} = payload;
		const tasks = get(tasksAtom);

		set(
			tasksAtom,
			tasks.map(
				(taskItem) => {
					if (taskItem.id === id) {
						return {
							...taskItem,
							name,
						};
					}

					return taskItem;
				},
			),
		);
	},
);

const resetStateAtom = atom(
	null,
	(
		get,
		set,
	) => {
		set(
			groupsAtom,
			[],
		);

		set(
			tasksAtom,
			[],
		);
	},
);

export {
	addGroupAtom,
	addTaskAtom,
	removeGroupAtom,
	removeTaskAtom,
	resetStateAtom,
	updateGroupIsCollapsedAtom,
	updateGroupNameAtom,
	updateTaskIsCompletedAtom,
	updateTaskNameAtom,
};
