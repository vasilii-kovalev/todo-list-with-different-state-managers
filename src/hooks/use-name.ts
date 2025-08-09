import {
	useCallback,
	useState,
} from "react";

interface UseNameParams {
	name: string;
	updateName?: (nameNext: string) => void;
}

interface UseNameResult {
	name: string;
	setName: (nameNext: string) => void;
	resetName: () => void;
}

const useName = ({
	name: nameInitial,
	updateName,
}: UseNameParams): UseNameResult => {
	const [
		name,
		setName,
	] = useState<UseNameResult["name"]>(nameInitial);

	const handleNameChange = useCallback<UseNameResult["setName"]>(
		(nameNext) => {
			setName(nameNext);

			updateName?.(nameNext);
		},
		[],
	);

	const resetName = useCallback<UseNameResult["resetName"]>(
		() => {
			setName(nameInitial);

			updateName?.(nameInitial);
		},
		[],
	);

	return {
		name,
		resetName,
		setName: handleNameChange,
	};
};

export {
	useName,
};
