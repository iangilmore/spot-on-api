import mongoose from "mongoose"

const puzzleSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{8}$/.test(v);
      },
      message: props => `${props.value} is not a valid date in YYYYMMDD format!`
    }
  },
  levelValue: { type: Number, required: true, min: 0, max: 2 },
  puzzleCards: { type: [mongoose.Schema.Types.ObjectId], ref: 'PuzzleCard' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

puzzleSchema.virtual('spotOnId').get(function () {
  return `${this.date}-${this.levelValue}`
})

const Puzzle = mongoose.model("Puzzle", puzzleSchema)

export default Puzzle