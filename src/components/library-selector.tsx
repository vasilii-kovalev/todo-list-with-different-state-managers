import {
	Link,
} from "@tanstack/react-router";
import {
	type FC,
} from "react";

import {
	type FileRouteTypes,
} from "@/routeTree.gen";

interface LibraryOption {
	to: FileRouteTypes["to"];
	label: string;
}

const libraryOption: Array<LibraryOption> = [
	{
		label: "Redux",
		to: "/redux",
	},
	{
		label: "Jotai",
		to: "/jotai",
	},
];

const LibrarySelector: FC = () => {
	return (
		<nav>
			<ul
				style={{
					display: "flex",
					gap: "1rem",
					listStyle: "none",
					padding: 0,
				}}
			>
				{
					libraryOption.map((item) => {
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
	LibrarySelector,
};
