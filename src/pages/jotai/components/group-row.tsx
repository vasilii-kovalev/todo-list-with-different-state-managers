import {
	isEmpty,
} from "es-toolkit/compat";
import {
	useAtomValue,
	useSetAtom,
} from "jotai";
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
	removeGroupAtom,
	updateGroupIsCollapsedAtom,
	updateGroupNameAtom,
} from "../atoms/actions";
import {
	existingGroupNamesAtom,
	tasksForGroupIdAtom,
} from "../atoms/derived";
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
	const tasks = useAtomValue(tasksForGroupIdAtom(group.id));
	const existingGroupNames = useAtomValue(existingGroupNamesAtom(group.id));
	const removeGroup = useSetAtom(removeGroupAtom);
	const updateGroupIsCollapsed = useSetAtom(updateGroupIsCollapsedAtom);
	const updateGroupName = useSetAtom(updateGroupNameAtom);

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
