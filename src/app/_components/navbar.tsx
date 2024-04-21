import React from 'react';
import ToggleTheme from "~/components/ui/toggle-theme"
export const Navbar = () => {
	return (
		<nav className={'w-full text-xl py-4 px-7 border-b-2 flex justify-between'}>
			Context.io - share text anywhere
			<ToggleTheme/>
		</nav>
	);
};

export default Navbar;