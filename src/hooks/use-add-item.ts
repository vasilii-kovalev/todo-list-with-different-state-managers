import {
	isUndefined,
} from "es-toolkit";
import {
	isEmpty,
} from "es-toolkit/compat";

import {
	type ErrorMessage,
} from "@/features/errors/types";
import {
	getIsNameAlreadyExists,
} from "@/features/errors/utils/get-is-name-already-exist";

import {
	useName,
} from "./use-name";

interface UseAddItemParams {
	addItemWithName: (name: string) => void;
	existingNames: Array<string>;
	getErrorMessage: () => ErrorMessage;
}

interface UseAddItemResult {
	addItem: () => void;
	canAddItem: boolean;
	errorMessage: ErrorMessage;
	name: string;
	setName: (nameNext: string) => void;
}

const useAddItem = ({
	addItemWithName,
	existingNames,
	getErrorMessage,
}: UseAddItemParams): UseAddItemResult => {
	const {
		name,
		setName,
		resetName,
	} = useName({
		name: "",
	});

	const nameTrimmed = name.trim();

	const errorMessage = getIsNameAlreadyExists({
		existingNames,
		name: nameTrimmed,
	})
		? getErrorMessage()
		: undefined;

	const canAddItem = (
		!isEmpty(nameTrimmed)
		&& isUndefined(errorMessage)
	);

	const handleAddItem: UseAddItemResult["addItem"] = () => {
		if (!canAddItem) {
			return;
		}

		addItemWithName(nameTrimmed);

		resetName();
	};

	return {
		addItem: handleAddItem,
		canAddItem,
		errorMessage,
		name,
		setName,
	};
};

export {
	useAddItem as useAddNewElement,
};
