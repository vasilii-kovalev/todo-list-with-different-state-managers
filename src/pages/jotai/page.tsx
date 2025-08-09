import {
	Provider,
	useSetAtom,
} from "jotai";
import {
	type FC,
	useEffect,
} from "react";

import {
	Page,
} from "@/components/page";

import {
	resetStateAtom,
} from "./actions";
import {
	AddGroupRow,
} from "./components/add-group-row";
import {
	GroupList,
} from "./components/group-list";

const JotaiPage: FC = () => {
	const resetState = useSetAtom(resetStateAtom);

	useEffect(
		() => {
			return () => {
				resetState();
			};
		},
		[
			resetState,
		],
	);

	return (
		<Page>
			<h1>
				Jotai
			</h1>

			<AddGroupRow/>
			<GroupList/>
		</Page>
	);
};

const JotaiPageWithContext: FC = () => {
	return (
		<Provider>
			<JotaiPage/>
		</Provider>
	);
};

export {
	JotaiPageWithContext as JotaiPage,
};
