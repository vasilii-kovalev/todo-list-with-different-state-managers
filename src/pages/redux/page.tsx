import {
	type FC,
	useEffect,
} from "react";
import {
	Provider,
	useDispatch,
} from "react-redux";

import {
	Page,
} from "@/components/page";

import {
	AddGroupRow,
} from "./components/add-group-row";
import {
	GroupList,
} from "./components/group-list";
import {
	type Dispatch,
	store,
} from "./store";
import {
	resetGroupsState,
} from "./store/groups/reducer";
import {
	resetTasksState,
} from "./store/tasks/reducer";

const ReduxPage: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	useEffect(
		() => {
			return () => {
				dispatch(resetGroupsState());

				dispatch(resetTasksState());
			};
		},
		[
			dispatch,
		],
	);

	return (
		<Page>
			<h1>
				Redux
			</h1>

			<AddGroupRow/>
			<GroupList/>
		</Page>
	);
};

const ReduxPageWithContext: FC = () => {
	return (
		<Provider
			store={store}
		>
			<ReduxPage/>
		</Provider>
	);
};

export {
	ReduxPageWithContext as ReduxPage,
};
