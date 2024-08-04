import "./assets/main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Estimate from "./Estimate";
import Layout from "./Layout";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/app" element={<App />} />
					<Route path="/estimate" element={<Estimate />} />
				</Route>
			</Routes>
		</HashRouter>
	</React.StrictMode>,
);
