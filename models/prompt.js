import { Schema, model, models } from "mongoose";

// Define the schema for the Prompt model
const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

// Check if the Prompt model already exists in the models cache,
// otherwise create a new model using the PromptSchema
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
