import Puzzle from '../models/puzzlesModel.js'

export const getPuzzles = async (req, res) => {
  try {
    const puzzles = await Puzzle.find().populate('puzzleCards')
    res.status(200).json(puzzles)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPuzzle = async (req, res) => {
  const { puzzleId } = req.params
  try {
    const puzzle = await Puzzle.findOne({ _id: puzzleId }).populate('puzzleCards')
    res.status(200).json(puzzle)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPuzzles = async (req, res) => {
  const puzzleData = req.body
  // If puzzleCardData is not an array, and createdBy doesn't exist, add createdBy
  if (!Array.isArray(puzzleData)) {
    if (!puzzleData.createdBy) {
      puzzleData.createdBy = req.userId
    }
  } else {
    // Add createdBy to each object in the array
    puzzleData.forEach(puzzle => {
      if (!puzzle.createdBy) {
        puzzle.createdBy = req.userId
      }
    })
  }
  try {
    const newPuzzles = await Puzzle.create(puzzleData)
    res.status(201).json(newPuzzles)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updatePuzzle = async (req, res) => {
  const { puzzleId } = req.params
  const puzzleData = req.body
  try {
    const updatedPuzzle = await Puzzle.findByIdAndUpdate(puzzleId, puzzleData, { new: true })
    res.status(200).json(updatedPuzzle)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const deletePuzzle = async (req, res) => {
  const { puzzleId } = req.params
  try {
    await Puzzle.findByIdAndRemove(puzzleId)
    res.json({ message: 'Puzzle deleted successfully' })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}