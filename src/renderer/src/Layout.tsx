import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

export default function Layout(): JSX.Element {
	return (
		<>
			<div className="fixed top-0 left-0 w-[200px] h-[100dvh] p-[10px] border-steal-100 border-r-[.5px]">
				<h1 className="text-center text-[24px]">ツール名</h1>
				<div className="w-full grid gap-[5px] py-[10px] mt-[10px] border-steal-100 border-t-[.5px]">
					<div className="font-[18px] p-[10px] text-center">文書作成</div>
					<Button asChild variant="ghost" className="w-full">
						<Link to={"/estimate"}>見積書を作成する</Link>
					</Button>
					<Button asChild variant="ghost" className="w-full">
						<Link to={"/estimate"}>請書を作成する</Link>
					</Button>
					<Button asChild variant="ghost" className="w-full">
						<Link to={"/estimate"}>請求書を作成する</Link>
					</Button>
				</div>
			</div>
			<div className="fixed top-0 left-[200px] h-[100dvh] w-[calc(100dvw-200px)] overflow-auto">
				<Outlet />
			</div>
		</>
	);
}
