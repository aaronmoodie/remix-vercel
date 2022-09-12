import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const loader = async () => {
	const data = {
		posts: await db.post.findMany(),
	};
	return json(data);
};

export default function Posts() {
	const data = useLoaderData();
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>Posts</h1>
			<Link to="/">Back home</Link>
			<Link to="/posts/new">Create new post</Link>
			
			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>
						<Link to={`/posts/${post.id}`}>
							{post.title}
						</Link>
					</li>
				))}
			</ul>
			
		</div>
	);
}