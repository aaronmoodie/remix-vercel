import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
	const post = await db.post.findUnique({
		where: { id: parseInt(params.postId) },
	})
	return json({ post });
};

export default function PostId() {
	const { post } = useLoaderData();
	return (
		<main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<Link to="/posts">Back to all posts</Link>
			<h1>
				{post.title}
			</h1>
			<div>
				{post.content}	
			</div>
		</main>
	);
}