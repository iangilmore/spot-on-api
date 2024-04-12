import mongoose from 'mongoose';

const answerHistorySchema = new mongoose.Schema({
  correct: { type: Number, required: true, default: 0 },
  incorrect: { type: Number, required: true, default: 0 },
})

const puzzleCardSchema = new mongoose.Schema({
  levelValue: { type: Number, required: true, min: 0, max: 2 },
  url: { type: String, required: true },
  credit: { type: String, required: true },
  correct: { type: String, required: true },
  incorrects: { type: [String], required: true },
  answerHistory: answerHistorySchema,
  active: { type: Boolean, required: true, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const PuzzleCard = mongoose.model('PuzzleCard', puzzleCardSchema)

export default PuzzleCard