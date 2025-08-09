import {
	debounce,
} from "es-toolkit";
import {
	useCallback,
	useRef,
} from "react";

import {
	useName,
} from "./use-name";

interface UseNameDebouncedParams {
	name: string;
	updateName: (nameNext: string) => void;
}

interface UseNameDebouncedResult {
	nameLocal: string;
	setNameLocal: (nameNext: string) => void;
}

const useNameDebounced = ({
	name,
	updateName,
}: UseNameDebouncedParams): UseNameDebouncedResult => {
	/*
		Use a ref to store the latest `updateName` function's value without causing re-renders.
		This allows the debounced function to always call the current `updateName`
		without recreating the debounced function when `updateName` changes.
	*/
	const updateNameRef = useRef(updateName);

	updateNameRef.current = updateName;

	const updateNameDebounced = useCallback(
		debounce(
			(nameNext: string) => {
				updateNameRef.current(nameNext);
			},
			300,
		),
		[],
	);

	const {
		name: nameLocal,
		setName: setNameLocal,
	} = useName({
		name,
		updateName: updateNameDebounced,
	});

	return {
		nameLocal,
		setNameLocal,
	};
};

export {
	useNameDebounced,
};
