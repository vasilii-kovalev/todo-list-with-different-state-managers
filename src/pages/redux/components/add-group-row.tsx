import {
	type FC,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";

import {
	AddGroupRow as AddGroupRowCommon,
} from "@/components/add-group-row";

import {
	addGroup,
} from "../reducer";
import {
	selectExistingGroupNames,
} from "../selectors";
import {
	type Dispatch,
	type RootState,
} from "../store";

const AddGroupRow: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	const existingGroupNames = useSelector((state: RootState) => {
		return selectExistingGroupNames(state.toDo.groups);
	});

	return (
		<AddGroupRowCommon
			addGroup={(params) => {
				dispatch(addGroup(params));
			}}
			existingGroupNames={existingGroupNames}
		/>
	);
};

export {
	AddGroupRow,
};
