import {
	atomWithReset,
} from "jotai/utils";

import {
	type Group,
} from "@/features/groups/types";
import {
	type Task,
} from "@/features/tasks/types";

const groupsAtom = atomWithReset<Array<Group>>([]);
const tasksAtom = atomWithReset<Array<Task>>([]);

export {
	groupsAtom,
	tasksAtom,
};
