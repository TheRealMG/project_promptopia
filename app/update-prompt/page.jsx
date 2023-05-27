"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  // Initializing router for navigation
  const router = useRouter();

  // Getting search parameters from the URL using useSearchParams hook
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  // Declaring state variables for submitting state and post data
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    // Function to fetch prompt details
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      // Updating the post state with the retrieved prompt details
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    // Fetch prompt details only if the promptId exists
    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  // Function to update the prompt
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Check if promptId exists, if not, display an alert
    if (!promptId) {
      return alert("Prompt ID not found");
    }

    try {
      // Sending a PATCH request to update the prompt details
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      // If the response is successful, navigate to the home page
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Resetting the submitting state after the request is complete
      setSubmitting(false);
    }
  };

  return (
    // Rendering the Form component with relevant props
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
