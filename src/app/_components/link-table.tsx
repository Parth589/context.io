"use client"
import React from 'react';
import CopyLink from "./copy-link"

const LinkTable = (
	{contexts}: {
		contexts:
			({ id: string, title: string })[]
	}
) => {
	return (
		<div className={'my-7'}>
			<p className={'text-lg text-muted-foreground mb-3 text-center'}>Recent contexts</p>
			{contexts.map(({title, id}) => (
				<div key={id} className={'hover:bg-muted px-4 py-2 rounded '}>
					<CopyLink title={title} contextID={id}/>
					<hr className={'mt-3'}/>
				</div>
			))}
		</div>
	);
};

export default LinkTable;