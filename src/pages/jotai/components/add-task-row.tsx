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
} from "../atoms/actions";
import {
	existingTaskNamesAtom,
} from "../atoms/derived";

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
			addTask={addTask}
			existingTaskNames={existingTaskNames}
			groupId={groupId}
		/>
	);
};

export {
	AddTaskRow,
};
