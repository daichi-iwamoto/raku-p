import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, X } from "lucide-react";
import type { HTMLInputTypeAttribute } from "react";
import ReactDOMServer from "react-dom/server";
import {
	type Control,
	type DeepMap,
	type FieldPath,
	useFieldArray,
	useForm,
} from "react-hook-form";
import { z } from "zod";
import PDFContent from "./PDFContent";

const formSchema = z.object({
	orderer: z.object({
		inCharge: z.string().optional(),
		companyName: z.string().optional(),
		address: z.string().optional(),
		postCode: z.string().optional(),
		billding: z.string().optional(),
		tel: z.string().optional(),
		mail: z.string().email().optional(),
	}),
	contractor: z.object({
		inCharge: z.string().optional(),
		companyName: z.string().optional(),
		address: z.string().optional(),
		postCode: z.string().optional(),
		billding: z.string().optional(),
		tel: z.string().optional(),
		mail: z.string().email().optional(),
	}),
	estimateItems: z.array(
		z.object({
			name: z.string(),
			detail: z.string(),
			unitPrice: z.number(),
			count: z.number(),
		}),
	),
	note: z.string().optional(),
});

export type FieldValues = z.infer<typeof formSchema>;
type FieldKeys =
	| FieldPath<DeepMap<FieldValues, "name">>
	| FieldPath<FieldValues>;

function InputField({
	type = "text",
	label,
	placeholder,
	name,
	control,
}: {
	type?: HTMLInputTypeAttribute;
	label: string;
	placeholder?: string;
	name: FieldKeys;
	control: Control<FieldValues>;
}): JSX.Element {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							{...field}
							type={type}
							placeholder={placeholder}
							onChange={(e) =>
								field.onChange(
									type === "number"
										? Number.parseInt(e.target.value, 10)
										: e.target.value,
								)
							}
							value={field.value as string | number}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export default function Estimate(): JSX.Element {
	const { toast } = useToast();

	const form = useForm<FieldValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			estimateItems: [{ name: "", detail: "", unitPrice: 0, count: 0 }],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "estimateItems",
	});

	async function onSubmit(value: FieldValues): Promise<void> {
		toast({
			description: (
				<div className="flex gap-[10px] justify-center items-center">
					<LoaderCircle className="animate-spin" />
					<span>PDFを出力しています...</span>
				</div>
			),
		});
		const subTotalAmount = value.estimateItems.reduce(
			(acc, item) => acc + item.unitPrice * item.count,
			0,
		);
		const tax = Math.floor(subTotalAmount * 0.1);
		const totalAmount = subTotalAmount + tax;

		const test = await window.electron.ipcRenderer.invoke("createPDF", {
			htmlString: ReactDOMServer.renderToString(
				<PDFContent
					subTotalAmount={subTotalAmount}
					tax={tax}
					totalAmount={totalAmount}
					value={value}
				/>,
			),
		});

		toast({
			title: "PDF出力完了",
			description: test,
		});
	}

	return (
		<div className="p-[60px]">
			<h1 className="text-[24px]">見積書作成</h1>
			<div className="text-slate-400 text-[14px]">
				※ 未入力の項目については省略して出力されます。
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 max-w-[1000px]"
				>
					<div className="grid grid-cols-2 gap-[20px]">
						<fieldset className="min-w-[200px]">
							<legend className="text-[22px]">発注者情報</legend>
							<div className="p-[20px] bg-slate-50 border-solid border-[1px] border-slate-200 rounded-[5px] relative">
								<InputField
									control={form.control}
									label="企業名"
									name="orderer.companyName"
									placeholder="企業名"
								/>
								<InputField
									control={form.control}
									label="担当者名"
									name="orderer.inCharge"
									placeholder="山田太郎"
								/>
								<InputField
									control={form.control}
									label="郵便番号"
									name="orderer.postCode"
									placeholder="100-0001"
								/>
								<InputField
									control={form.control}
									label="住所"
									name="orderer.address"
									placeholder="東京都千代田区1-1-1"
								/>
								<InputField
									control={form.control}
									label="建物名"
									name="orderer.billding"
									placeholder="東京ビル"
								/>
								<InputField
									control={form.control}
									label="電話番号"
									name="orderer.tel"
									placeholder="000-0000-0000"
								/>
								<InputField
									control={form.control}
									label="メールアドレス"
									name="orderer.mail"
									placeholder="example@mail.com"
								/>
							</div>
						</fieldset>
						<fieldset className="min-w-[200px]">
							<legend className="text-[22px]">受注者情報</legend>
							<div className="p-[20px] bg-slate-50 border-solid border-[1px] border-slate-200 rounded-[5px] relative">
								<InputField
									control={form.control}
									label="企業名"
									name="contractor.companyName"
									placeholder="企業名"
								/>
								<InputField
									control={form.control}
									label="担当者名"
									name="contractor.inCharge"
									placeholder="山田太郎"
								/>
								<InputField
									control={form.control}
									label="郵便番号"
									name="contractor.postCode"
									placeholder="100-0001"
								/>
								<InputField
									control={form.control}
									label="住所"
									name="contractor.address"
									placeholder="東京都千代田区1-1-1"
								/>
								<InputField
									control={form.control}
									label="建物名"
									name="contractor.billding"
									placeholder="東京ビル"
								/>
								<InputField
									control={form.control}
									label="電話番号"
									name="contractor.tel"
									placeholder="000-0000-0000"
								/>
								<InputField
									control={form.control}
									label="メールアドレス"
									name="contractor.mail"
									placeholder="example@mail.com"
								/>
							</div>
						</fieldset>
					</div>
					<fieldset>
						<legend className="text-[22px]">見積もり項目</legend>
						<div className="grid gap-[50px] py-[50px] px-[30px] bg-slate-50 border-solid border-[1px] border-slate-200 rounded-[5px] relative">
							{fields.map((_, index) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									className="p-[20px] bg-slate-100 border-solid border-[1px] border-slate-200 rounded-[5px] relative"
								>
									<InputField
										control={form.control}
										label="項目名"
										name={`estimateItems.${index}.name`}
									/>
									<FormField
										control={form.control}
										name={`estimateItems.${index}.detail`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>項目詳細</FormLabel>
												<FormControl>
													<Textarea {...field} value={field.value as string} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="grid grid-cols-2 gap-[20px]">
										<InputField
											type="number"
											control={form.control}
											label="単価"
											name={`estimateItems.${index}.unitPrice`}
										/>
										<InputField
											type="number"
											control={form.control}
											label="数量"
											name={`estimateItems.${index}.count`}
										/>
									</div>
									<div>
										金額:
										{(form.watch(`estimateItems.${index}.unitPrice`) ?? 0) *
											(form.watch(`estimateItems.${index}.count`) ?? 0)}
									</div>
									<Button
										type="button"
										onClick={() => remove(index)}
										className="rounded-full w-[30px] h-[30px] p-0 absolute top-[-15px] right-[-15px]"
									>
										<X size={15} />
									</Button>
								</div>
							))}
							<Button
								type="button"
								onClick={() => {
									append({ name: "", detail: "", unitPrice: 0, count: 0 });
								}}
							>
								項目追加
							</Button>
							<div>
								<div>
									小計:
									{fields.reduce(
										(acc, _, index) =>
											acc +
											(form.watch(`estimateItems.${index}.unitPrice`) ?? 0) *
												(form.watch(`estimateItems.${index}.count`) ?? 0),
										0,
									)}
								</div>
								<div>
									消費税（10%）:
									{Math.floor(
										fields.reduce(
											(acc, _, index) =>
												acc +
												(form.watch(`estimateItems.${index}.unitPrice`) ?? 0) *
													(form.watch(`estimateItems.${index}.count`) ?? 0),
											0,
										) * 0.1,
									)}
								</div>
								<div>
									合計:
									{Math.floor(
										fields.reduce(
											(acc, _, index) =>
												acc +
												(form.watch(`estimateItems.${index}.unitPrice`) ?? 0) *
													(form.watch(`estimateItems.${index}.count`) ?? 0),
											0,
										) * 1.1,
									)}
								</div>
							</div>
						</div>
					</fieldset>
					<FormField
						control={form.control}
						name="note"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[22px]">備考</FormLabel>
								<FormControl>
									<Textarea {...field} value={field.value as string} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">PDF出力</Button>
				</form>
			</Form>
			<Toaster />
		</div>
	);
}
