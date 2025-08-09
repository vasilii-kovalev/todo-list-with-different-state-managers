import {
	type FC,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";

import {
	AddTaskRow as AddTaskRowCommon,
} from "@/components/add-task-row";
import {
	type GroupId,
} from "@/features/groups/types";
import {
	type TaskName,
} from "@/features/tasks/types";

import {
	addTask,
} from "../reducer";
import {
	selectExistingTaskNames,
} from "../selectors";
import {
	type Dispatch,
	type RootState,
} from "../store";

interface AddTaskRowProps {
	groupId: GroupId;
}

const AddTaskRow: FC<AddTaskRowProps> = ({
	groupId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const existingTaskNames = useSelector<RootState, Array<TaskName>>((state) => {
		return selectExistingTaskNames(
			state.toDo.tasks,
			undefined,
		);
	});

	return (
		<AddTaskRowCommon
			addTask={(params) => {
				dispatch(addTask(params));
			}}
			existingTaskNames={existingTaskNames}
			groupId={groupId}
		/>
	);
};

export {
	AddTaskRow,
};
