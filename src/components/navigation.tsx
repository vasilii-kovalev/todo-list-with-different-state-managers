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

const libraryLink: Array<LibraryLink> = [
	{
		label: "Redux",
		to: "/redux",
	},
	{
		label: "Jotai",
		to: "/jotai",
	},
];

const Navigation: FC = () => {
	return (
		<nav>
			<ul
				className={listElement}
			>
				{
					libraryLink.map((item) => {
						return (
							<li
								key={item.to}
							>
								<Link
									to={item.to}
								>
									{item.label}
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
