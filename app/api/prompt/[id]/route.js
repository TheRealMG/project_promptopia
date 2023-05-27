import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    // Connect to the database
    await connectToDB();

    // Find the prompt by its ID and populate the "creator" field
    const prompt = await Prompt.findById(params.id).populate("creator");

    // If the prompt is not found, return a response with an error message and a status of 404 (Not Found)
    if (!prompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    // Return a response with the prompt in JSON format and a status of 200 (OK)
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    // If an error occurs, return a response with an error message and a status of 500 (Internal Server Error)
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  // Extract the updated prompt and tag from the request body
  const { prompt, tag } = await request.json();

  try {
    // Connect to the database
    await connectToDB();

    // Find the existing prompt by its ID
    const existingPrompt = await Prompt.findById(params.id);

    // If the prompt is not found, return a response with an error message and a status of 404 (Not Found)
    if (!prompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    // Update the existing prompt with the new prompt and tag
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    // Save the updated prompt
    await existingPrompt.save();

    // Return a response with the updated prompt in JSON format and a status of 200 (OK)
    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error) {
    // If an error occurs, return a response with an error message and a status of 500 (Internal Server Error)
    return new Response("Failed to update prompt", {
      status: 500,
    });
  }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    // Connect to the database
    await connectToDB();

    // Find and remove the prompt by its ID
    await Prompt.findByIdAndRemove(params.id);

    // Return a response with a success message and a status of 200 (OK)
    return new Response("Prompt deleted successfully", {
      status: 200,
    });
  } catch (error) {
    // If an error occurs, return a response with an error message and a status of 500 (Internal Server Error)
    return new Response("Failed to delete prompt", {
      status: 500,
    });
  }
};
