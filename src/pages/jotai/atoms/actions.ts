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
	tasksAtom,
} from "./base";

const addGroupAtom = atom(
	null,
	(
		get,
		set,
		group: Group,
	) => {
		set(
			groupsAtom,
			(groups) => {
				const isGroupAlreadyExists = groups.some(
					(groupItem) => {
						return groupItem.id === group.id;
					},
				);

				if (isGroupAlreadyExists) {
					return groups;
				}

				return [
					...groups,
					group,
				];
			},
		);
	},
);

const addTaskAtom = atom(
	null,
	(
		get,
		set,
		task: Task,
	) => {
		set(
			tasksAtom,
			(tasks) => {
				const isTaskAlreadyExists = tasks.some(
					(taskItem) => {
						return taskItem.id === task.id;
					},
				);

				if (isTaskAlreadyExists) {
					return tasks;
				}

				return [
					...tasks,
					task,
				];
			},
		);
	},
);

const removeGroupAtom = atom(
	null,
	(
		get,
		set,
		groupId: GroupId,
	) => {
		set(
			groupsAtom,
			(groups) => {
				return groups.filter(
					(groupItem) => {
						return groupItem.id !== groupId;
					},
				);
			},
		);

		set(
			tasksAtom,
			(tasks) => {
				return tasks.filter(
					(taskItem) => {
						return taskItem.groupId !== groupId;
					},
				);
			},
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
		set(
			tasksAtom,
			(tasks) => {
				return tasks.filter(
					(taskItem) => {
						return taskItem.id !== taskId;
					},
				);
			},
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

		set(
			groupsAtom,
			(groups) => {
				return groups.map(
					(groupItem) => {
						if (groupItem.id === id) {
							return {
								...groupItem,
								isCollapsed,
							};
						}

						return groupItem;
					},
				);
			},
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

		set(
			groupsAtom,
			(groups) => {
				return groups.map(
					(groupItem) => {
						if (groupItem.id === id) {
							return {
								...groupItem,
								name,
							};
						}

						return groupItem;
					},
				);
			},
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

		set(
			tasksAtom,
			(tasks) => {
				return tasks.map(
					(taskItem) => {
						if (taskItem.id === id) {
							return {
								...taskItem,
								isCompleted,
							};
						}

						return taskItem;
					},
				);
			},
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

		set(
			tasksAtom,
			(tasks) => {
				return tasks.map(
					(taskItem) => {
						if (taskItem.id === id) {
							return {
								...taskItem,
								name,
							};
						}

						return taskItem;
					},
				);
			},
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
