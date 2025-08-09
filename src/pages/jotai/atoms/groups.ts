import {
	isEmpty,
} from "es-toolkit/compat";
import {
	type Atom,
	atom,
} from "jotai";
import {
	atomFamily,
} from "jotai/utils";

import {
	type Group,
	type GroupId,
	type GroupName,
} from "@/features/groups/types";

const groupsAtom = atom<Array<Group>>([]);

const existingGroupNamesAtom = atomFamily(
	// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
	(groupIdToExclude?: GroupId | void): Atom<Array<GroupName>> => {
		return atom<Array<GroupName>>((get) => {
			const groups = get(groupsAtom);

			return groups.reduce<Array<GroupName>>(
				(
					existingGroupNamesCurrent,
					group,
				) => {
					if (
						group.id !== groupIdToExclude
						&& !isEmpty(group.name)
					) {
						existingGroupNamesCurrent.push(group.name);
					}

					return existingGroupNamesCurrent;
				},
				[],
			);
		});
	},
);

export {
	existingGroupNamesAtom,
	groupsAtom,
};
