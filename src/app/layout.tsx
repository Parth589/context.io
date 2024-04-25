import "~/styles/globals.css";

import {Inter} from "next/font/google";
import { Toaster } from "~/components/ui/sonner"

import Navbar from "./_components/navbar";
import {ThemeProvider} from "~/components/theme-provider"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata = {
	title: "Context.io",
	description: "Context.io - share text everywhere",
	icons: [{rel: "icon", url: "/favicon.ico"}],
};

export default function RootLayout({children}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
		<body className={`font-sans ${inter.variable}`}>
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange>
			<Navbar/>
			{children}
			<Toaster />
		</ThemeProvider>
		</body>
		</html>
	);
}
