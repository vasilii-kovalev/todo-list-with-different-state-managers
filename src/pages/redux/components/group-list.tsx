import {
	type FC,
	Fragment,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type Group,
} from "@/features/groups/types";

import {
	selectAllGroups,
} from "../selectors";
import {
	type RootState,
} from "../store";
import {
	GroupRow,
} from "./group-row";

const GroupList: FC = () => {
	const groups = useSelector<RootState, Array<Group>>((state) => {
		return selectAllGroups(state.toDo.groups);
	});

	return (
		<Fragment>
			{
				groups.map((group) => {
					return (
						<GroupRow
							group={group}
							key={group.id}
						/>
					);
				})
			}
		</Fragment>
	);
};

export {
	GroupList,
};
