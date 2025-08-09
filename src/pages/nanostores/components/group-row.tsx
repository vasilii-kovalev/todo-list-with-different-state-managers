import {
	useStore,
} from "@nanostores/react";
import {
	isEmpty,
} from "es-toolkit/compat";
import {
	type FC,
} from "react";

import {
	GroupRow as GroupRowCommon,
} from "@/components/group-row";
import {
	type Group,
} from "@/features/groups/types";

import {
	removeGroup,
	updateGroupIsCollapsed,
	updateGroupName,
} from "../stores/actions";
import {
	$existingGroupNames,
	$tasksForGroupId,
} from "../stores/derived";
import {
	AddTaskRow,
} from "./add-task-row";
import {
	TaskRow,
} from "./task-row";

interface GroupRowProps {
	group: Group;
}

const GroupRow: FC<GroupRowProps> = ({
	group,
}) => {
	const tasks = useStore($tasksForGroupId(group.id));
	const existingGroupNames = useStore($existingGroupNames(group.id));

	return (
		<GroupRowCommon
			existingGroupNames={existingGroupNames}
			group={group}
			hasTasks={!isEmpty(tasks)}
			removeGroup={removeGroup}
			updateGroupIsCollapsed={updateGroupIsCollapsed}
			updateGroupName={updateGroupName}
		>
			<AddTaskRow
				groupId={group.id}
			/>

			{
				tasks.map((task) => {
					return (
						<TaskRow
							key={task.id}
							task={task}
						/>
					);
				})
			}
		</GroupRowCommon>
	);
};

export {
	GroupRow,
};
