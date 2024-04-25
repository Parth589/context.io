"use client"

import {Button} from "~/components/ui/button";
import {ClipboardCheck, Copy} from "lucide-react"
import {useState} from "react"
import Link from "next/link";

const CopyLink = ({contextID, title}: { contextID: string | null, title: string }) => {
	const [isCopied, setCopied] = useState(false);
	return (
		<div className={'flex w-full justify-between items-center gap-10'}>
			<Link href={`/context/${contextID}`} className={'text-base'}> {title} </Link>
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