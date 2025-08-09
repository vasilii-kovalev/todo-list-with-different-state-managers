import {
	type ErrorMessage,
} from "./types";

const GROUP_NAME_ALREADY_EXISTS_ERROR_MESSAGE = "Group with this name already exists" satisfies ErrorMessage;
const TASK_NAME_ALREADY_EXISTS_ERROR_MESSAGE = "Task with this name already exists" satisfies ErrorMessage;

export {
	GROUP_NAME_ALREADY_EXISTS_ERROR_MESSAGE,
	TASK_NAME_ALREADY_EXISTS_ERROR_MESSAGE,
};
