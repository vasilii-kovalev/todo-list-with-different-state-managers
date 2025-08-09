import {
	createEntityAdapter,
} from "@reduxjs/toolkit";

import {
	type Group,
} from "@/features/groups/types";
import {
	type Task,
} from "@/features/tasks/types";

const groupsAdapter = createEntityAdapter<Group>();

const tasksAdapter = createEntityAdapter<Task>();

export {
	groupsAdapter,
	tasksAdapter,
};
