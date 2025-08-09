import {
	isEmpty,
} from "es-toolkit/compat";
import {
	type FC,
	type PropsWithChildren,
	useRef,
} from "react";

import {
	GROUP_NAME_ALREADY_EXISTS_ERROR_MESSAGE,
} from "@/features/errors/constants";
import {
	getIsNameAlreadyExists,
} from "@/features/errors/utils/get-is-name-already-exist";
import {
	type Group,
	type GroupId,
	type GroupName,
} from "@/features/groups/types";
import {
	useNameDebounced,
} from "@/hooks/use-name-debounced";

import {
	ErrorMessage,
} from "./error-message";
import {
	RemoveGroupModalWindow,
} from "./remove-group-modal-window";

interface GroupRowProps extends PropsWithChildren {
	existingGroupNames: Array<GroupName>;
	group: Group;
	hasTasks: boolean;
	removeGroup: (id: GroupId) => void;
	updateGroupIsCollapsed: (
		params: Pick<
			Group,
			| "id"
			| "isCollapsed"
		>
	) => void;
	updateGroupName: (
		params: Pick<
			Group,
			| "id"
			| "name"
		>
	) => void;
}

const GroupRow: FC<GroupRowProps> = ({
	children,
	existingGroupNames,
	group,
	hasTasks,
	removeGroup,
	updateGroupIsCollapsed,
	updateGroupName,
}) => {
	const {
		id,
		isCollapsed,
		name,
	} = group;

	const removeGroupModalWindowRef = useRef<HTMLDialogElement | null>(null);

	const {
		nameLocal,
		setNameLocal,
	} = useNameDebounced({
		name,
		updateName: (nameNext) => {
			const isNameAlreadyExists = getIsNameAlreadyExists({
				existingNames: existingGroupNames,
				name: nameNext,
			});

			if (
				isEmpty(nameNext)
				|| nameNext === name
				|| isNameAlreadyExists
			) {
				return;
			}

			updateGroupName({
				id,
				name: nameNext,
			});
		},
	});

	const errorMessage = getIsNameAlreadyExists({
		existingNames: existingGroupNames,
		name: nameLocal,
	})
		? GROUP_NAME_ALREADY_EXISTS_ERROR_MESSAGE
		: undefined;

	const handleRemoveGroup = (): void => {
		removeGroup(id);
	};

	return (
		<div>
			<div>
				<div>
					<input
						onBlur={() => {
							if (isEmpty(nameLocal)) {
								setNameLocal(name);
							}
						}}
						onChange={(event) => {
							setNameLocal(event.target.value);
						}}
						value={nameLocal}
					/>

					<button
						onClick={() => {
							updateGroupIsCollapsed({
								id,
								isCollapsed: !isCollapsed,
							});
						}}
						type="button"
					>
						{
							isCollapsed
								? "Expand"
								: "Collapse"
						}
					</button>

					<button
						onClick={() => {
							if (hasTasks) {
								removeGroupModalWindowRef.current?.showModal();
							} else {
								handleRemoveGroup();
							}
						}}
						type="button"
					>
						Remove
					</button>

					<RemoveGroupModalWindow
						onClose={() => {
							removeGroupModalWindowRef.current?.close();
						}}
						onRemoveGroup={handleRemoveGroup}
						ref={removeGroupModalWindowRef}
					/>
				</div>

				<ErrorMessage
					errorMessage={errorMessage}
				/>
			</div>

			{
				!isCollapsed
					? children
					: null
			}
		</div>
	);
};

export {
	GroupRow,
};
