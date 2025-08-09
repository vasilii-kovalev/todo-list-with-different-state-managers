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
} from "../store/reducer";
import {
	selectExistingGroupNames,
	selectTasksForGroupId,
} from "../store/selectors";
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
			state.toDo.tasks,
			group.id,
		);
	});

	const existingGroupNames = useSelector((state: RootState) => {
		return selectExistingGroupNames(
			state.toDo.groups,
			group.id,
		);
	});

	return (
		<GroupRowCommon
			existingGroupNames={existingGroupNames}
			group={group}
			hasTasks={!isEmpty(tasks)}
			removeGroup={(params) => {
				dispatch(removeGroup(params));
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
