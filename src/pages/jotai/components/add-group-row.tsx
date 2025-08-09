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
} from "../atoms/actions";
import {
	existingGroupNamesAtom,
} from "../atoms/derived";

const AddGroupRow: FC = () => {
	const existingGroupNames = useAtomValue(existingGroupNamesAtom(undefined));
	const addGroup = useSetAtom(addGroupAtom);

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
