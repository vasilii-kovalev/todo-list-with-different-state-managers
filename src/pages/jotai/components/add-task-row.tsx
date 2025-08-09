import {
	useAtomValue,
	useSetAtom,
} from "jotai";
import {
	type FC,
} from "react";

import {
	AddTaskRow as AddTaskRowCommon,
} from "@/components/add-task-row";
import {
	type GroupId,
} from "@/features/groups/types";

import {
	addTaskAtom,
} from "../actions";
import {
	existingTaskNamesAtom,
} from "../atoms/tasks";

interface AddTaskRowProps {
	groupId: GroupId;
}

const AddTaskRow: FC<AddTaskRowProps> = ({
	groupId,
}) => {
	const existingTaskNames = useAtomValue(
		existingTaskNamesAtom({
			groupId,
		}),
	);
	const addTask = useSetAtom(addTaskAtom);

	return (
		<AddTaskRowCommon
			addTask={(params) => {
				addTask(params);
			}}
			existingTaskNames={existingTaskNames}
			groupId={groupId}
		/>
	);
};

export {
	AddTaskRow,
};
