import {
	useStore,
} from "@nanostores/react";
import {
	type FC,
} from "react";

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
} from "../stores/actions";
import {
	$existingTaskNames,
} from "../stores/derived";

interface TaskRowProps {
	task: Task;
}

const TaskRow: FC<TaskRowProps> = ({
	task,
}) => {
	const existingTaskNames = useStore(
		$existingTaskNames(
			task.groupId,
			task.id,
		),
	);

	return (
		<TaskRowCommon
			existingTaskNames={existingTaskNames}
			removeTask={removeTask}
			task={task}
			updateTaskIsCompleted={updateTaskIsCompleted}
			updateTaskName={updateTaskName}
		/>
	);
};

export {
	TaskRow,
};
