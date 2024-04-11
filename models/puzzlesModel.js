import mongoose from "mongoose"

const puzzleSchema = new mongoose.Schema({
  spotOnId: { type: String, required: true },
  date: { type: Date, required: true },
  levelValue: { type: Number, required: true, min: 0, max: 2 },
  puzzleCards: { type: [mongoose.Schema.Types.ObjectId], ref: 'PuzzleCard' },
})

const Puzzle = mongoose.model("Puzzle", puzzleSchema)

export default Puzzle
