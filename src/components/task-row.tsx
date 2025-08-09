import {
	isEmpty,
} from "es-toolkit/compat";
import {
	type FC,
} from "react";

import {
	TASK_NAME_ALREADY_EXISTS_ERROR_MESSAGE,
} from "@/features/errors/constants";
import {
	getIsNameAlreadyExists,
} from "@/features/errors/utils/get-is-name-already-exist";
import {
	type Task,
	type TaskId,
	type TaskName,
} from "@/features/tasks/types";
import {
	useNameDebounced,
} from "@/hooks/use-name-debounced";

import {
	ErrorMessage,
} from "./error-message";
import {
	nameElement,
} from "./task-row.css";

interface TaskRowProps {
	existingTaskNames: Array<TaskName>;
	removeTask: (id: TaskId) => void;
	task: Task;
	updateTaskIsCompleted: (
		params: Pick<
			Task,
			| "id"
			| "isCompleted"
		>
	) => void;
	updateTaskName: (
		params: Pick<
			Task,
			| "id"
			| "name"
		>
	) => void;
}

const TaskRow: FC<TaskRowProps> = ({
	existingTaskNames,
	removeTask,
	task,
	updateTaskIsCompleted,
	updateTaskName,
}) => {
	const {
		id,
		name,
		isCompleted,
	} = task;

	const {
		nameLocal,
		setNameLocal,
	} = useNameDebounced({
		name,
		updateName: (nameNext) => {
			const isNameAlreadyExists = getIsNameAlreadyExists({
				existingNames: existingTaskNames,
				name: nameNext,
			});

			if (
				isEmpty(nameNext)
				|| nameNext === name
				|| isNameAlreadyExists
			) {
				return;
			}

			updateTaskName({
				id,
				name: nameNext,
			});
		},
	});

	const errorMessage = getIsNameAlreadyExists({
		existingNames: existingTaskNames,
		name: nameLocal,
	})
		? TASK_NAME_ALREADY_EXISTS_ERROR_MESSAGE
		: undefined;

	return (
		<div>
			<div>
				<input
					checked={isCompleted}
					onChange={() => {
						updateTaskIsCompleted({
							id,
							isCompleted: !isCompleted,
						});
					}}
					type="checkbox"
				/>

				{
					!isCompleted
						? (
							<input
								onBlur={() => {
									if (isEmpty(nameLocal)) {
										setNameLocal(name);
									}
								}}
								onChange={(event) => {
									setNameLocal(event.target.value);
								}}
								type="text"
								value={nameLocal}
							/>
						)
						: (
							<span
								className={nameElement}
							>
								{nameLocal}
							</span>
						)
				}

				<button
					onClick={() => {
						removeTask(id);
					}}
					type="button"
				>
					Remove
				</button>
			</div>

			<ErrorMessage
				errorMessage={errorMessage}
			/>
		</div>
	);
};

export {
	TaskRow,
};
