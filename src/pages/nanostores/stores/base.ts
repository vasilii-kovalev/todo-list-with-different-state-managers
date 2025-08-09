import {
	atom,
} from "nanostores";

import {
	type Group,
} from "@/features/groups/types";
import {
	type Task,
} from "@/features/tasks/types";

const $groups = atom<Array<Group>>([]);
const $tasks = atom<Array<Task>>([]);

export {
	$groups,
	$tasks,
};
