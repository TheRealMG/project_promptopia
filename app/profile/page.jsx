"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  // Initializing router for navigation
  const router = useRouter();

  // Getting user session data using useSession hook from NextAuth
  const { data: session } = useSession();

  // Declaring state variable for posts
  const [posts, setPosts] = useState([]);

  // Fetching user's posts when the component mounts or when the session user ID changes
  useEffect(() => {
    // Function to fetch posts
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      // Updating the state variable with fetched posts
      setPosts(data);
    };

    // Fetch posts only if there is a valid session user ID
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  // Event handler for editing a post
  const handleEdit = (post) => {
    // Navigating to the update prompt page with the post ID as a query parameter
    router.push(`/update-prompt?id=${post._id}`);
  };

  // Event handler for deleting a post
  const handleDelete = async (post) => {
    // Prompting the user for confirmation before deleting the post
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        // Sending a DELETE request to delete the post
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        // Removing the deleted post from the state variable
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    // Rendering the Profile component with relevant props
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
