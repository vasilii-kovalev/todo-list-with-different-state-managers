import {
	type FC,
	type PropsWithChildren,
} from "react";

import {
	LibrarySelector,
} from "./library-selector";

const Page: FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<main>
			<header>
				<LibrarySelector/>
			</header>

			<section>
				{children}
			</section>
		</main>
	);
};

export {
	Page,
};
