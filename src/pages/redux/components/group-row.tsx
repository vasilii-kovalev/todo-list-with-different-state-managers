import {
	isEmpty,
} from "es-toolkit/compat";
import {
	type FC,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";

import {
	GroupRow as GroupRowCommon,
} from "@/components/group-row";
import {
	type Group,
} from "@/features/groups/types";

import {
	type Dispatch,
	type RootState,
} from "../store";
import {
	removeGroup,
	updateGroupIsCollapsed,
	updateGroupName,
} from "../store/groups/reducer";
import {
	selectExistingGroupNames,
} from "../store/groups/selectors";
import {
	removeTasksForGroup,
} from "../store/tasks/reducer";
import {
	selectTasksForGroupId,
} from "../store/tasks/selectors";
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
	const dispatch = useDispatch<Dispatch>();

	const tasks = useSelector((state: RootState) => {
		return selectTasksForGroupId(
			state.tasks,
			group.id,
		);
	});

	const existingGroupNames = useSelector((state: RootState) => {
		return selectExistingGroupNames(
			state.groups,
			group.id,
		);
	});

	return (
		<GroupRowCommon
			existingGroupNames={existingGroupNames}
			group={group}
			hasTasks={!isEmpty(tasks)}
			removeGroup={(groupId) => {
				dispatch(removeGroup(groupId));

				dispatch(removeTasksForGroup(groupId));
			}}
			updateGroupIsCollapsed={(params) => {
				dispatch(updateGroupIsCollapsed(params));
			}}
			updateGroupName={(params) => {
				dispatch(updateGroupName(params));
			}}
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
