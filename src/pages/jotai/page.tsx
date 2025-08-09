import {
	Provider,
} from "jotai";
import {
	useResetAtom,
} from "jotai/utils";
import {
	type FC,
	useEffect,
} from "react";

import {
	Page,
} from "@/components/page";

import {
	groupsAtom,
	tasksAtom,
} from "./atoms/base";
import {
	AddGroupRow,
} from "./components/add-group-row";
import {
	GroupList,
} from "./components/group-list";

const JotaiPage: FC = () => {
	const resetGroups = useResetAtom(groupsAtom);
	const resetTasks = useResetAtom(tasksAtom);

	useEffect(
		() => {
			return () => {
				resetGroups();

				resetTasks();
			};
		},
		[
			resetGroups,
			resetTasks,
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
