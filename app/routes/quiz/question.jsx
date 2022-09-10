import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

export function meta() {
  return { title: "Actions Demo" };
}

export const action = async ({ request }) => {
  let formData = await request.formData();
  let answer = formData.get("answer");
  
  if (answer.length === 0) {
    return json("Come on, at least try!", { status: 400 });
  }
  
  if (answer !== "egg") {
    return json(`Sorry, ${answer} is not right.`, { status: 400 });
  }
  
  return redirect("/quiz/correct");
}

export default function Questions() {
  let actionMessage = useActionData();
  let transition = useTransition();
  let answerRef = useRef(null);
  
  useEffect(() => {
    if (actionMessage && answerRef.current) {
      answerRef.current.select();
    }
  }, [actionMessage]);
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Question time</h1>
      
      <Form method="post">
        <p>
          <i>What is more useful when it is broken?</i>
        </p>
        <label>
          <div>Answer:</div>
          <input ref={answerRef} name="answer" type="text" />
        </label>
        <div>
          <button type="submit">
            {transition.state === "submitting"
              ? "Submitting..."
              : "Sumbit"}
          </button>
        </div>
        {actionMessage ? (
          <p>
            <b>{actionMessage}</b>
          </p>
        ) : null}
      </Form>
      
    </div>
  );
}
