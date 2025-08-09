import {
	useStore,
} from "@nanostores/react";
import {
	type FC,
	Fragment,
} from "react";

import {
	$groups,
} from "../stores/base";
import {
	GroupRow,
} from "./group-row";

const GroupList: FC = () => {
	const groups = useStore($groups);

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
