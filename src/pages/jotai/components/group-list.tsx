import {
	useAtomValue,
} from "jotai";
import {
	type FC,
	Fragment,
} from "react";

import {
	groupsAtom,
} from "../atoms/groups";
import {
	GroupRow,
} from "./group-row";

const GroupList: FC = () => {
	const groups = useAtomValue(groupsAtom);

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
