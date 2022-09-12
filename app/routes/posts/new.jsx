import { json, redirect } from "@remix-run/node";
import { Link, Form, useActionData, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { db } from "~/utils/db.server";

export const action = async ({ request }) => {
	let formData = await request.formData();
	let title = formData.get("title");
	let content = formData.get("content");
	
	if (title.length === 0) {
		return json("A title is required.", { status: 400 });
	}
	
	if (content.length  === 0) {
		return json(`Some content is requires`, { status: 400 });
	}
	
	const fields = { title, content };
	
	const post = await db.post.create({ data: fields });
	return redirect(`/posts/${post.id}`);
}

export default function NewPost() {
	let actionMessage = useActionData();
	let transition = useTransition();
	let titleRef = useRef(null);
	let contentRef = useRef(null);
	
	useEffect(() => {
		if (actionMessage && titleRef.current) {
			titleRef.current.select();
		}
	}, [actionMessage]);
	
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<p><Link to="/posts">Back to all posts</Link></p>
			<h1>New post</h1>
		
			<Form method="post">
				<label style={{ display: "block", marginBottom: "1rem" }}>
					<div>Title</div>
					<input ref={titleRef} name="title" type="text" />
				</label>
				<label style={{ display: "block", marginBottom: "1rem" }}>
					<div>Content</div>
					<textarea ref={contentRef} name="content" type="text" />
				</label>
				<div>
					<button type="submit">
						{transition.state === "submitting"
							? "Creating..."
							: "Create"}
					</button>
				</div>
				{actionMessage ? (
					<p style={{color: "red"}}>
						<b>{actionMessage}</b>
					</p>
				) : null}
			</Form>
		</div>
	);
}