interface GetIsNameAlreadyExistsParams {
	existingNames: Array<string>;
	name: string;
}

const getIsNameAlreadyExists = ({
	existingNames,
	name,
}: GetIsNameAlreadyExistsParams): boolean => {
	const trimmedName = name.trim();

	return existingNames.includes(trimmedName);
};

export {
	getIsNameAlreadyExists,
};
