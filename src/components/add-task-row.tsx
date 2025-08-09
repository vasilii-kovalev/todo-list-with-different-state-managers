import {
	nanoid,
} from "nanoid";
import {
	type FC,
} from "react";

import {
	TASK_NAME_ALREADY_EXISTS_ERROR_MESSAGE,
} from "@/features/errors/constants";
import {
	type GroupId,
} from "@/features/groups/types";
import {
	type Task,
	type TaskName,
} from "@/features/tasks/types";
import {
	useAddNewElement,
} from "@/hooks/use-add-item";

import {
	ErrorMessage,
} from "./error-message";

interface AddTaskRowProps {
	addTask: (task: Task) => void;
	existingTaskNames: Array<TaskName>;
	groupId: GroupId;
}

const AddTaskRow: FC<AddTaskRowProps> = ({
	addTask,
	existingTaskNames,
	groupId,
}) => {
	const {
		addItem: handleAddTask,
		canAddItem: canAddTask,
		errorMessage,
		name,
		setName,
	} = useAddNewElement({
		addItemWithName: (nameNext) => {
			addTask({
				groupId,
				id: nanoid(),
				isCompleted: false,
				name: nameNext,
			});
		},
		existingNames: existingTaskNames,
		getErrorMessage: () => {
			return TASK_NAME_ALREADY_EXISTS_ERROR_MESSAGE;
		},
	});

	return (
		<div>
			<div>
				<input
					onChange={(event) => {
						setName(event.target.value);
					}}
					onKeyDown={(event) => {
						if (event.code === "Enter") {
							handleAddTask();
						}
					}}
					placeholder={"E.g. \"Buy confetti\""}
					type="text"
					value={name}
				/>

				<button
					disabled={!canAddTask}
					onClick={handleAddTask}
					type="button"
				>
					Add
				</button>
			</div>

			<ErrorMessage
				errorMessage={errorMessage}
			/>
		</div>
	);
};

export {
	AddTaskRow,
};
