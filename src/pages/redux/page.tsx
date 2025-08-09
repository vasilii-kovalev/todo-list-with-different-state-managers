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
	resetState,
} from "./reducer";
import {
	type Dispatch,
	store,
} from "./store";

const ReduxPage: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	useEffect(
		() => {
			return () => {
				dispatch(resetState());
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
