import {
	createFileRoute,
} from "@tanstack/react-router";

import {
	NanoStoredPage,
} from "@/pages/nanostores/page";

const Route = createFileRoute("/nanostores")({
	component: NanoStoredPage,
});

export {
	Route,
};
