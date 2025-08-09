import {
	useAtomValue,
	useSetAtom,
} from "jotai";
import {
	type FC,
} from "react";

import {
	AddGroupRow as AddGroupRowCommon,
} from "@/components/add-group-row";

import {
	addGroupAtom,
} from "../actions";
import {
	existingGroupNamesAtom,
} from "../atoms/groups";

const AddGroupRow: FC = () => {
	const existingGroupNames = useAtomValue(existingGroupNamesAtom());
	const addGroup = useSetAtom(addGroupAtom);

	return (
		<AddGroupRowCommon
			addGroup={(params) => {
				addGroup(params);
			}}
			existingGroupNames={existingGroupNames}
		/>
	);
};

export {
	AddGroupRow,
};
