"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  // Initializing router for navigation
  const router = useRouter();

  // Getting user session data using useSession hook from NextAuth
  const { data: session } = useSession();

  // Declaring state variables for submitting state and post data
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  // Function to create a new prompt
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Sending a POST request to the "/api/prompt/new" API endpoint
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
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
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
