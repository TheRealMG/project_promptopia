import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    // Connect to the database
    await connectToDB();

    // Find prompts that belong to a specific creator (identified by params.id) and populate the "creator" field
    const prompts = await Prompt.find({
      creator: params.id
    }).populate("creator");

    // Return a response with the prompts in JSON format and a status of 200 (OK)
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    // If an error occurs, return a response with an error message and a status of 500 (Internal Server Error)
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
