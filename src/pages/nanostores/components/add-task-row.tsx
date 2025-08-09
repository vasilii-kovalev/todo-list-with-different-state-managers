import {
	useStore,
} from "@nanostores/react";
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
	addTask,
} from "../stores/actions";
import {
	$existingTaskNames,
} from "../stores/derived";

interface AddTaskRowProps {
	groupId: GroupId;
}

const AddTaskRow: FC<AddTaskRowProps> = ({
	groupId,
}) => {
	const existingTaskNames = useStore($existingTaskNames(groupId));

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
