import {getContext} from "~/server/actions";
import {notFound} from "next/navigation";

const Page = async ({params}: { params: { id: string } }) => {
	if (Number.isNaN(Number(params.id))) {
		return notFound();
	}
	const res = await getContext(Number(params.id));
	if (res === null || !res[0]) {
		return notFound();
	}
	const d = res[0].createdAt;
	const n = res[0].expireTime;
	const expirationDate = new Date(
		d.getTime() + ((n || 0) * 60000)
	);
	// Get the current date and time
	const now = new Date();
	console.log({res,d, n, now, expirationDate})
	// Check if the expiration date is in the past
	if (expirationDate < now) {
		return notFound();
	}

	return (
		<div className={'text-xl'}>
			{res[0]?.content}
		</div>
	);
};

export default Page;