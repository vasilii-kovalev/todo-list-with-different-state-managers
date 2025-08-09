import {
	createEntityAdapter,
} from "@reduxjs/toolkit";

import {
	type Task,
} from "@/features/tasks/types";

const tasksAdapter = createEntityAdapter<Task>();

export {
	tasksAdapter,
};
