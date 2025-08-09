import {
	nanoid,
} from "nanoid";
import {
	type FC,
} from "react";

import {
	GROUP_NAME_ALREADY_EXISTS_ERROR_MESSAGE,
} from "@/features/errors/constants";
import {
	type Group,
	type GroupName,
} from "@/features/groups/types";
import {
	useAddNewElement,
} from "@/hooks/use-add-item";

import {
	ErrorMessage,
} from "./error-message";

interface AddGroupRowProps {
	addGroup: (group: Group) => void;
	existingGroupNames: Array<GroupName>;
}

const AddGroupRow: FC<AddGroupRowProps> = ({
	addGroup,
	existingGroupNames,
}) => {
	const {
		addItem: handleAddGroup,
		canAddItem: canAddGroup,
		errorMessage,
		name,
		setName,
	} = useAddNewElement({
		addItemWithName: (nameNext) => {
			addGroup({
				id: nanoid(),
				isCollapsed: false,
				name: nameNext,
			});
		},
		existingNames: existingGroupNames,
		getErrorMessage: () => {
			return GROUP_NAME_ALREADY_EXISTS_ERROR_MESSAGE;
		},
	});

	return (
		<div>
			<div>
				<label
					htmlFor="add-group"
				>
					Add group
				</label>

				<input
					id="add-group"
					onChange={(event) => {
						setName(event.target.value);
					}}
					onKeyDown={(event) => {
						if (event.code === "Enter") {
							handleAddGroup();
						}
					}}
					placeholder={"E.g. \"Birthday checklist\""}
					type="text"
					value={name}
				/>

				<button
					disabled={!canAddGroup}
					onClick={handleAddGroup}
					type="button"
				>
					Add
				</button>
			</div>

			<ErrorMessage
				errorMessage={errorMessage}
			/>
		</div>
	);
};

export {
	AddGroupRow,
};
