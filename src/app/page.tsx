"use client";
import {Button} from "~/components/ui/button";
import {Textarea} from "~/components/ui/textarea";
import {z} from "zod";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select"
import {createContext} from "~/server/actions"
import {toast} from "sonner"
import CopyLink from "./_components/copy-link";
import LinkTable from "./_components/link-table";
import {useState} from "react";

const formSchema = z.object({
	content: z.string().min(2).max(50),
	expireTime: z.enum(["10", "20", "30", "60", "120"])
	// z.number().min(10).max(120) // in minutes
})

export default function Home() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: "",
			expireTime: "10"
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		// console.log(values)
		const res = await createContext(values);
		if (res !== null) {
			toast(<CopyLink title={'created context'} contextID={res?.[0]?.id.toString() || null}/>);

			setContextList((prevState) => (
				[
					...prevState,
					{
						id: res?.[0]?.id.toString() as string,
						title: res?.[0]?.content.substring(0, 8) as string
					}
				]
			))
		} else {
			toast("Some error occured");
		}
	}

	const [contextList, setContextList] = useState<({ id: string, title: string })[]>([]);

	return (
		<main className={'p-10 max-w-4xl mx-auto'}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="content"
						render={({field}) => (
							<FormItem>
								<FormLabel>Enter text to share</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter text here"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="expireTime"
						render={({field}) => (
							<FormItem>
								<FormLabel>Enter time to expire</FormLabel>
								<FormControl aria-required={true}>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Expire time"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="10">10 Minutes</SelectItem>
											<SelectItem value="20">20 Minutes</SelectItem>
											<SelectItem value="30">30 Minutes</SelectItem>
											<SelectItem value="60">60 Minutes</SelectItem>
											<SelectItem value="120">120 Minutes</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}/>
					<Button type="submit">Share</Button>
				</form>
			</Form>
			<LinkTable contexts={contextList}/>
		</main>
	);
}

