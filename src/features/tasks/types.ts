import {
	type GroupId,
} from "../groups/types";

type TaskId = string;

type TaskName = string;

interface Task {
	id: TaskId;
	name: TaskName;
	isCompleted: boolean;
	groupId: GroupId;
}

export {
	type Task,
	type TaskId,
	type TaskName,
};
