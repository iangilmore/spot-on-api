import mongoose from 'mongoose'

const resultDetailsSchema = new mongoose.Schema({
  puzzleCard: { type: mongoose.Schema.Types.ObjectId, ref: 'PuzzleCard', required: true },
  correct: { type: Boolean, required: true },
})

const resultSchema = new mongoose.Schema({
  puzzle: { type: mongoose.Schema.Types.ObjectId, ref: 'Puzzle', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  duration: { type: Number, required: true },
  results: { type: [Number], required: true, min: 0, max: 1 },
  resultDetails: { type: [resultDetailsSchema] },
})

const Result = mongoose.model('Result', resultSchema)

export default Result