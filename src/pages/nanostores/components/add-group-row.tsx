import {
	useStore,
} from "@nanostores/react";
import {
	type FC,
} from "react";

import {
	AddGroupRow as AddGroupRowCommon,
} from "@/components/add-group-row";

import {
	addGroup,
} from "../stores/actions";
import {
	$existingGroupNames,
} from "../stores/derived";

const AddGroupRow: FC = () => {
	const existingGroupNames = useStore($existingGroupNames());

	return (
		<AddGroupRowCommon
			addGroup={addGroup}
			existingGroupNames={existingGroupNames}
		/>
	);
};

export {
	AddGroupRow,
};
