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
	type Dispatch,
	type RootState,
} from "../store";
import {
	addTask,
} from "../store/tasks/reducer";
import {
	selectExistingTaskNames,
} from "../store/tasks/selectors";

interface AddTaskRowProps {
	groupId: GroupId;
}

const AddTaskRow: FC<AddTaskRowProps> = ({
	groupId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const existingTaskNames = useSelector((state: RootState) => {
		return selectExistingTaskNames(
			state.tasks,
			groupId,
		);
	});

	return (
		<AddTaskRowCommon
			addTask={(task) => {
				dispatch(addTask(task));
			}}
			existingTaskNames={existingTaskNames}
			groupId={groupId}
		/>
	);
};

export {
	AddTaskRow,
};
