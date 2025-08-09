import {
	isUndefined,
} from "es-toolkit";
import {
	type FC,
} from "react";

import {
	type ErrorMessage as ErrorMessageType,
} from "@/features/errors/types";

interface ErrorMessageProps {
	errorMessage: ErrorMessageType;
}

const ErrorMessage: FC<ErrorMessageProps> = ({
	errorMessage,
}) => {
	if (isUndefined(errorMessage)) {
		return null;
	}

	return (
		<div>
			{errorMessage}
		</div>
	);
};

export {
	ErrorMessage,
};
