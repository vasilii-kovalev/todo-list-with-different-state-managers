import {
	logger,
} from "@nanostores/logger";
import {
	useEffect,
} from "react";

import {
	$groups,
	$tasks,
} from "../stores/base";

const useLogger = (): void => {
	if (import.meta.env.DEV) {
		useEffect(
			() => {
				const destroyLogger = logger({
					groups: $groups,
					tasks: $tasks,
				});

				return () => {
					destroyLogger();
				};
			},
			[],
		);
	}
};

export {
	useLogger,
};
