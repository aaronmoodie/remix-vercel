import { Link } from "@remix-run/react";

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>Hi there!</h1>
			<p><Link to="/quiz/question">Take the quiz</Link></p>
			<p><Link to="/posts">Read some posts</Link></p>
		</div>
	);
}