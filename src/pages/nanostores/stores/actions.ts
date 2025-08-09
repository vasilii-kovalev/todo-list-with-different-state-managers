import {
	type Group,
	type GroupId,
} from "@/features/groups/types";
import {
	type Task,
	type TaskId,
} from "@/features/tasks/types";

import {
	$groups,
	$tasks,
} from "./base";

const addGroup = (group: Group): void => {
	const groups = $groups.get();
	const isGroupAlreadyExists = groups.some((groupCurrent) => {
		return groupCurrent.id === group.id;
	});

	if (!isGroupAlreadyExists) {
		$groups.set([
			...groups,
			group,
		]);
	}
};

const addTask = (task: Task): void => {
	const tasks = $tasks.get();
	const isTaskAlreadyExists = tasks.some((taskCurrent) => {
		return taskCurrent.id === task.id;
	});

	if (!isTaskAlreadyExists) {
		$tasks.set([
			...tasks,
			task,
		]);
	}
};

const removeGroup = (groupId: GroupId): void => {
	const groups = $groups.get();
	const updatedGroups = groups.filter((group) => {
		return group.id !== groupId;
	});

	$groups.set(updatedGroups);

	const tasks = $tasks.get();
	const updatedTasks = tasks.filter((task) => {
		return task.groupId !== groupId;
	});

	$tasks.set(updatedTasks);
};

const removeTask = (taskId: TaskId): void => {
	const tasks = $tasks.get();
	const updatedTasks = tasks.filter((task) => {
		return task.id !== taskId;
	});

	$tasks.set(updatedTasks);
};

type UpdateGroupIsCollapsedParams = Pick<
	Group,
	| "id"
	| "isCollapsed"
>;

const updateGroupIsCollapsed = ({
	id,
	isCollapsed,
}: UpdateGroupIsCollapsedParams): void => {
	const groups = $groups.get();
	const updatedGroups = groups.map<Group>((group) => {
		if (group.id === id) {
			return {
				...group,
				isCollapsed,
			};
		}

		return group;
	});

	$groups.set(updatedGroups);
};

type UpdateGroupNameParams = Pick<
	Group,
	| "id"
	| "name"
>;

const updateGroupName = ({
	id,
	name,
}: UpdateGroupNameParams): void => {
	const groups = $groups.get();
	const updatedGroups = groups.map<Group>((group) => {
		if (group.id === id) {
			return {
				...group,
				name,
			};
		}

		return group;
	});

	$groups.set(updatedGroups);
};

type UpdateTaskIsCompletedParams = Pick<
	Task,
	| "id"
	| "isCompleted"
>;

const updateTaskIsCompleted = ({
	id,
	isCompleted,
}: UpdateTaskIsCompletedParams): void => {
	const tasks = $tasks.get();
	const updatedTasks = tasks.map<Task>((task) => {
		if (task.id === id) {
			return {
				...task,
				isCompleted,
			};
		}

		return task;
	});

	$tasks.set(updatedTasks);
};

type UpdateTaskNameParams = Pick<
	Task,
	| "id"
	| "name"
>;

const updateTaskName = ({
	id,
	name,
}: UpdateTaskNameParams): void => {
	const tasks = $tasks.get();
	const updatedTasks = tasks.map<Task>((task) => {
		if (task.id === id) {
			return {
				...task,
				name,
			};
		}

		return task;
	});

	$tasks.set(updatedTasks);
};

export {
	addGroup,
	addTask,
	removeGroup,
	removeTask,
	updateGroupIsCollapsed,
	updateGroupName,
	updateTaskIsCompleted,
	updateTaskName,
};
