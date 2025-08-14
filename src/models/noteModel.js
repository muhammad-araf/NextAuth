import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        notes: {
        type: [String],
        default: [],
        },
        postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
    },
    { timestamps: true }
);

if (process.env.NODE_ENV !== "production" && mongoose.models.Note) {
  delete mongoose.models.Note;
}

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);
export default Note;