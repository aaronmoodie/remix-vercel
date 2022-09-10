import { Link } from "@remix-run/react";

export default function NiceWork() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>You got it right!</h1>
			<Link to="/">Back home</Link>
		</div>
	);
}