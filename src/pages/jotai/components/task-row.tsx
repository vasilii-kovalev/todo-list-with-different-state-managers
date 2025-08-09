import {
	useAtomValue,
	useSetAtom,
} from "jotai";
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
	removeTaskAtom,
	updateTaskIsCompletedAtom,
	updateTaskNameAtom,
} from "../actions";
import {
	existingTaskNamesAtom,
} from "../atoms/tasks";

interface TaskRowProps {
	task: Task;
}

const TaskRow: FC<TaskRowProps> = ({
	task,
}) => {
	const existingTaskNames = useAtomValue(
		existingTaskNamesAtom({
			groupId: task.groupId,
			taskIdToExclude: task.id,
		}),
	);
	const removeTask = useSetAtom(removeTaskAtom);
	const updateTaskIsCompleted = useSetAtom(updateTaskIsCompletedAtom);
	const updateTaskName = useSetAtom(updateTaskNameAtom);

	return (
		<TaskRowCommon
			existingTaskNames={existingTaskNames}
			removeTask={(params) => {
				removeTask(params);
			}}
			task={task}
			updateTaskIsCompleted={(params) => {
				updateTaskIsCompleted(params);
			}}
			updateTaskName={(params) => {
				updateTaskName(params);
			}}
		/>
	);
};

export {
	TaskRow,
};
