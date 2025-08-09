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
	type GroupName,
} from "@/features/groups/types";
import {
	type Task,
} from "@/features/tasks/types";

import {
	removeGroup,
	updateGroupIsCollapsed,
	updateGroupName,
} from "../reducer";
import {
	selectAllTasksForGroupId,
	selectExistingGroupNames,
} from "../selectors";
import {
	type Dispatch,
	type RootState,
} from "../store";
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
	const {
		id,
	} = group;

	const dispatch = useDispatch<Dispatch>();

	const tasks = useSelector<RootState, Array<Task>>((state) => {
		return selectAllTasksForGroupId(
			state.toDo.tasks,
			id,
		);
	});

	const existingGroupNames = useSelector<RootState, Array<GroupName>>((state) => {
		return selectExistingGroupNames(
			state.toDo.groups,
			id,
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
				groupId={id}
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
