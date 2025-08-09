import {
	createEntityAdapter,
} from "@reduxjs/toolkit";

import {
	type Group,
} from "@/features/groups/types";

const groupsAdapter = createEntityAdapter<Group>();

export {
	groupsAdapter,
};
