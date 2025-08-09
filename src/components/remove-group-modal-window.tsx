import {
	type FC,
	type Ref,
} from "react";

interface RemoveGroupModalWindowProps {
	onClose: () => void;
	onRemoveGroup: () => void;
	ref: Ref<HTMLDialogElement | null>;
}

const RemoveGroupModalWindow: FC<RemoveGroupModalWindowProps> = ({
	onClose,
	onRemoveGroup,
	ref,
}) => {
	return (
		<dialog
			ref={ref}
		>
			<p>
				Remove the group and all the tasks within it?
			</p>

			<div>
				<button
					onClick={onClose}
					type="button"
				>
					Cancel
				</button>

				<button
					onClick={onRemoveGroup}
					type="button"
				>
					Remove group and tasks
				</button>
			</div>
		</dialog>
	);
};

export {
	RemoveGroupModalWindow,
};
