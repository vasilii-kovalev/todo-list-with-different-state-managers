import {
	createFileRoute,
} from "@tanstack/react-router";

import {
	JotaiPage,
} from "@/pages/jotai/page";

const Route = createFileRoute("/jotai")({
	component: JotaiPage,
});

export {
	Route,
};
