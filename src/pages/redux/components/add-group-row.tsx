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
	type Dispatch,
	type RootState,
} from "../store";
import {
	addGroup,
} from "../store/groups/reducer";
import {
	selectExistingGroupNames,
} from "../store/groups/selectors";

const AddGroupRow: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	const existingGroupNames = useSelector((state: RootState) => {
		return selectExistingGroupNames(state.groups);
	});

	return (
		<AddGroupRowCommon
			addGroup={(group) => {
				dispatch(addGroup(group));
			}}
			existingGroupNames={existingGroupNames}
		/>
	);
};

export {
	AddGroupRow,
};
