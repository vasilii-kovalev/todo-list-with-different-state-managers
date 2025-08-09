import {
	type FC,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";

import {
	TaskRow as TaskRowCommon,
} from "@/components/task-row";
import {
	type Task,
} from "@/features/tasks/types";

import {
	removeTask,
	updateTaskIsCompleted,
	updateTaskName,
} from "../reducer";
import {
	selectExistingTaskNames,
} from "../selectors";
import {
	type Dispatch,
	type RootState,
} from "../store";

interface TaskRowProps {
	task: Task;
}

const TaskRow: FC<TaskRowProps> = ({
	task,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const existingTaskNames = useSelector((state: RootState) => {
		return selectExistingTaskNames(
			state.toDo.tasks,
			task.groupId,
			task.id,
		);
	});

	return (
		<TaskRowCommon
			existingTaskNames={existingTaskNames}
			removeTask={(params) => {
				dispatch(removeTask(params));
			}}
			task={task}
			updateTaskIsCompleted={(params) => {
				dispatch(updateTaskIsCompleted(params));
			}}
			updateTaskName={(params) => {
				dispatch(updateTaskName(params));
			}}
		/>
	);
};

export {
	TaskRow,
};
