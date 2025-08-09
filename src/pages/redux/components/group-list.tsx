import {
	type FC,
	Fragment,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type RootState,
} from "../store";
import {
	selectGroups,
} from "../store/groups/selectors";
import {
	GroupRow,
} from "./group-row";

const GroupList: FC = () => {
	const groups = useSelector((state: RootState) => {
		return selectGroups(state.groups);
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
