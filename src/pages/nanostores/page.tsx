import {
	type FC,
	useEffect,
} from "react";

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
	useLogger,
} from "./hooks/use-logger";
import {
	$groups,
	$tasks,
} from "./stores/base";

const NanoStoredPage: FC = () => {
	useLogger();

	useEffect(
		() => {
			return () => {
				$groups.set([]);

				$tasks.set([]);
			};
		},
		[],
	);

	return (
		<Page>
			<h1>
				Nano Stores
			</h1>

			<AddGroupRow/>
			<GroupList/>
		</Page>
	);
};

export {
	NanoStoredPage,
};
