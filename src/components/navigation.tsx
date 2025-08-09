import {
	Link,
} from "@tanstack/react-router";
import {
	type FC,
} from "react";

import {
	type FileRouteTypes,
} from "@/routeTree.gen";

import {
	listElement,
} from "./navigation.css";

interface LibraryLink {
	to: FileRouteTypes["to"];
	label: string;
}

const libraryLinks: Array<LibraryLink> = [
	{
		label: "Redux",
		to: "/redux",
	},
	{
		label: "Jotai",
		to: "/jotai",
	},
	{
		label: "Nano Stores",
		to: "/nanostores",
	},
];

const Navigation: FC = () => {
	return (
		<nav>
			<ul
				className={listElement}
			>
				{
					libraryLinks.map((libraryLink) => {
						return (
							<li
								key={libraryLink.to}
							>
								<Link
									to={libraryLink.to}
								>
									{libraryLink.label}
								</Link>
							</li>
						);
					})
				}
			</ul>
		</nav>
	);
};

export {
	Navigation,
};
