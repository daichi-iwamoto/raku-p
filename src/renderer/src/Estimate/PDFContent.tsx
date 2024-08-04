import type { FieldValues } from "./";

function THead({
	isNumber = false,
	children,
	colSpan = 0,
}: {
	isNumber?: boolean;
	children?: React.ReactNode;
	colSpan?: number;
}): JSX.Element {
	return (
		<th
			style={{
				border: "solid 1px #2f3542",
				padding: "10px",
				textAlign: !isNumber ? "left" : "right",
				fontSize: "14px",
			}}
			colSpan={colSpan}
		>
			{children}
		</th>
	);
}

function TData({
	children,
	isNumber = false,
	isInBody = false,
	colSpan = 0,
}: {
	isInBody?: boolean;
	children?: React.ReactNode;
	isNumber?: boolean;
	colSpan?: number;
}): JSX.Element {
	return (
		<th
			style={{
				border: isInBody ? "dashed 1px #2f3542" : "solid 1px #2f3542",
				borderRight: "solid 1px #2f3542",
				padding: "10px",
				fontSize: "12px",
				fontWeight: "normal",
				textAlign: !isNumber ? "left" : "right",
			}}
			colSpan={colSpan}
		>
			{children}
		</th>
	);
}

type PDFContentProps = {
	isPreview?: boolean;
	value: FieldValues;
	totalAmount: number;
	subTotalAmount: number;
	tax: number;
};

// PDF への変換を素の HTML を元に行うため、スタイルはインラインで指定する
export default function PDFContent({
	isPreview = false,
	value,
	totalAmount,
	subTotalAmount,
	tax,
}: PDFContentProps): JSX.Element {
	const contents: JSX.Element = (
		<>
			<div
				style={{
					fontSize: "12px",
					textAlign: "right",
					padding: "10px",
				}}
			>
				作成日：2024/01/01
			</div>
			<h1
				style={{
					textAlign: "center",
					fontSize: "30px",
					padding: "10px",
					letterSpacing: "5px",
				}}
			>
				見積書
			</h1>
			<div
				style={{
					display: "grid",
					alignItems: "flex-start",
					gridTemplateColumns: "1fr 1fr",
					padding: "10px 30px",
				}}
			>
				<div>
					<div
						style={{
							display: "grid",
							gap: "5px",
							fontSize: "12px",
						}}
					>
						{typeof value.orderer.postCode !== "undefined" ? (
							<div>〒{value.orderer.postCode}</div>
						) : null}
						<div>
							{value.orderer.address} {value.orderer.billding}
						</div>
						<div
							style={{
								fontSize: "20px",
								fontWeight: "700",
							}}
						>
							{`${value.orderer.companyName ? `${value.orderer.companyName} ` : ""}${value.orderer.inCharge} 様`}
						</div>
					</div>
					<div
						style={{
							marginTop: "30px",
							display: "grid",
							gridTemplateColumns: "auto 1fr",
							border: "solid 1px #2f3542",
						}}
					>
						<div
							style={{
								color: "white",
								background: "#2f3542",
								padding: "10px 20px",
							}}
						>
							お見積金額
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								fontSize: "18px",
								fontWeight: "bold",
							}}
						>
							¥ {totalAmount.toLocaleString()}
							<span
								style={{
									fontSize: "12px",
									marginLeft: "10px",
								}}
							>
								（税込）
							</span>
						</div>
					</div>
				</div>
				<div
					style={{
						marginLeft: "180px",
						display: "grid",
						alignContent: "center",
						gap: "5px",
						fontSize: "12px",
					}}
				>
					{typeof value.contractor.postCode !== "undefined" ? (
						<div>〒{value.contractor.postCode}</div>
					) : null}
					<div>
						{value.contractor.address} {value.contractor.billding}
					</div>
					{typeof value.contractor.tel !== "undefined" ? (
						<div>TEL：{value.contractor.tel}</div>
					) : null}
					{typeof value.contractor.mail !== "undefined" ? (
						<div>MAIL：{value.contractor.mail}</div>
					) : null}
					<div
						style={{
							fontSize: "18px",
							fontWeight: "700",
						}}
					>
						{value.contractor.inCharge}
					</div>
				</div>
			</div>
			<div style={{ padding: "10px 30px" }}>
				<h2
					style={{
						fontSize: "20px",
						paddingTop: "50px",
					}}
				>
					お見積詳細
				</h2>
				<table
					style={{
						width: "100%",
						borderCollapse: "collapse",
					}}
				>
					<thead
						style={{
							background: "#2f3542",
							color: "white",
						}}
					>
						<tr>
							<THead>項目</THead>
							<THead>項目説明</THead>
							<THead>単価</THead>
							<THead>数量</THead>
							<THead>金額</THead>
						</tr>
					</thead>
					<tbody
						style={{
							background: "#f1f2f6",
							border: "solid 1px #2f3542",
						}}
					>
						{value.estimateItems.map(
							({ name, detail, unitPrice, count }, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<tr key={index}>
									<TData isInBody={true}>{name}</TData>
									<TData isInBody={true}>{detail}</TData>
									<TData isInBody={true} isNumber={true}>
										¥ {unitPrice.toLocaleString()}
									</TData>
									<TData isInBody={true} isNumber={true}>
										{count}
									</TData>
									<TData isInBody={true} isNumber={true}>
										¥ {(unitPrice * count).toLocaleString()}
									</TData>
								</tr>
							),
						)}
						<tr
							style={{
								height: "38px",
							}}
						>
							<TData isInBody={true} />
							<TData isInBody={true} />
							<TData isInBody={true} />
							<TData isInBody={true} />
							<TData isInBody={true} />
						</tr>
						<tr
							style={{
								height: "38px",
							}}
						>
							<TData isInBody={true} />
							<TData isInBody={true} />
							<TData isInBody={true} />
							<TData isInBody={true} />
							<TData isInBody={true} />
						</tr>
						<tr
							style={{
								height: "38px",
							}}
						>
							<TData isInBody={true} />
							<TData isInBody={true} />
							<TData isInBody={true} />
							<TData isInBody={true} />
							<TData isInBody={true} />
						</tr>
					</tbody>
					<tfoot style={{ background: "#f1f2f6" }}>
						<tr>
							<TData colSpan={4}>小計</TData>
							<TData isNumber={true}>¥ {subTotalAmount.toLocaleString()}</TData>
						</tr>
						<tr>
							<TData colSpan={4}>消費税(10%)</TData>
							<TData isNumber={true}>¥ {tax.toLocaleString()}</TData>
						</tr>
						<tr>
							<THead colSpan={4}>合計</THead>
							<THead isNumber={true}>¥ {totalAmount.toLocaleString()}</THead>
						</tr>
					</tfoot>
				</table>
			</div>
			<div
				style={{
					padding: "10px 30px",
				}}
			>
				<h2
					style={{
						fontSize: "20px",
						paddingTop: "50px",
					}}
				>
					備考
				</h2>
				<div
					style={{
						fontSize: "14px",
						padding: "30px",
						background: "#f1f2f6",
						whiteSpace: "pre-wrap",
					}}
				>
					{value.note}
				</div>
			</div>
		</>
	);
	return isPreview ? (
		<div
			style={{
				margin: "0",
				padding: "0",
				width: "1033px",
				height: "auto",
			}}
		>
			{contents}
		</div>
	) : (
		<body
			style={{
				margin: "0",
				padding: "0",
				width: "1033px",
				height: "auto",
			}}
		>
			{contents}
		</body>
	);
}
