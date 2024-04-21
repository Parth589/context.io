"use client"

import {Button} from "~/components/ui/button";
import {ClipboardCheck, Copy} from "lucide-react"
import {useState} from "react"
import Link from "next/link";
const CopyLink = ({contextID}: { contextID: string | null }) => {
	const [isCopied, setCopied] = useState(false);
	return (
		<div className={'flex items-center gap-10'}>
			<Link href={`/context/${contextID}`} className={'text-muted-foreground'}>{contextID}</Link>
			<Button variant={'link'} size={'icon'} onClick={() => {
				setCopied(true);
			}}>
				{
					isCopied
						? <ClipboardCheck/>
						: <Copy/>
				}
			</Button>
		</div>
	);
};

export default CopyLink;