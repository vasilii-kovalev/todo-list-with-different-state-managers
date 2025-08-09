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
				const isGroupAlreadyExists = groups.some((groupCurrent) => {
					return groupCurrent.id === group.id;
				});

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
				const isTaskAlreadyExists = tasks.some((taskCurrent) => {
					return taskCurrent.id === task.id;
				});

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
				return groups.filter((group) => {
					return group.id !== groupId;
				});
			},
		);

		set(
			tasksAtom,
			(tasks) => {
				return tasks.filter((task) => {
					return task.groupId !== groupId;
				});
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
				return tasks.filter((task) => {
					return task.id !== taskId;
				});
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
				return groups.map((group) => {
					if (group.id === id) {
						return {
							...group,
							isCollapsed,
						};
					}

					return group;
				});
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
				return groups.map((group) => {
					if (group.id === id) {
						return {
							...group,
							name,
						};
					}

					return group;
				});
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
				return tasks.map((task) => {
					if (task.id === id) {
						return {
							...task,
							isCompleted,
						};
					}

					return task;
				});
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
				return tasks.map((task) => {
					if (task.id === id) {
						return {
							...task,
							name,
						};
					}

					return task;
				});
			},
		);
	},
);

export {
	addGroupAtom,
	addTaskAtom,
	removeGroupAtom,
	removeTaskAtom,
	updateGroupIsCollapsedAtom,
	updateGroupNameAtom,
	updateTaskIsCompletedAtom,
	updateTaskNameAtom,
};
