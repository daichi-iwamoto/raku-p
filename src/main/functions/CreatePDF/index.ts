import { app } from "electron";
import puppeteer from "puppeteer";
import PuppeteerHTMLPDF from "puppeteer-html-pdf";

export type CreatePDFProps = {
	htmlString: string;
};

export async function CreatePDF({
	htmlString,
}: CreatePDFProps): Promise<string> {
	const htmlPDF = new PuppeteerHTMLPDF();
	htmlPDF.setOptions({
		format: "A4",
		path: `${app.getPath("downloads")}/test.pdf`,
		executablePath: puppeteer.executablePath(),
	});

	const res = await htmlPDF
		.create(htmlString)
		.then(() => {
			return `success: ${app.getPath("downloads")}/test.pdf}`;
		})
		.catch((error) => {
			return `path: ${app.getPath("downloads")}/test.pdf}, error: ${error}`;
		});

	return res;
}
