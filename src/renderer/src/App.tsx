import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function App(): JSX.Element {
	return (
		<div>
			<h1 className="text-center text-[24px]">[ツール名]</h1>
			<Button asChild variant="ghost">
				<Link to={"/estimate"}>見積書を作成する</Link>
			</Button>
		</div>
	);
}

export default App;
