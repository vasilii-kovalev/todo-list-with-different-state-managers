import {
	type FC,
	type PropsWithChildren,
} from "react";

import {
	Navigation,
} from "./navigation";

const Page: FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<main>
			<header>
				<Navigation/>
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
