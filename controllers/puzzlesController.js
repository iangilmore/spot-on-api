import Puzzle from '../models/puzzlesModel.js'

export const getPuzzles = async (req, res) => {
  try {
    const puzzles = await Puzzle.find()
    res.status(200).json(puzzles)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPuzzle = async (req, res) => {
  const { puzzleId } = req.params
  try {
    const puzzle = await Puzzle.find({ _id: puzzleId })
    res.status(200).json(puzzle)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPuzzles = async (req, res) => {
  const puzzleData = req.body
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