import PuzzleCard from '../models/puzzleCardsModel.js'

export const getPuzzleCards = async (req, res) => {
  try {
    const puzzleCards = await PuzzleCard.find()
    res.status(200).json(puzzleCards)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPuzzleCard = async (req, res) => {
  const { puzzleCardId } = req.params
  try {
    const puzzleCard = await PuzzleCard.find({ _id: puzzleCardId })
    res.status(200).json(puzzleCard)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPuzzleCards = async (req, res) => {
  const puzzleCardData = req.body
  // If puzzleCardData is not an array, and createdBy doesn't exist, add createdBy
  if (!Array.isArray(puzzleCardData)) {
    if (!puzzleCardData.createdBy) {
      puzzleCardData.createdBy = req.userId
    }
  } else {
    // Add createdBy to each object in the array
    puzzleCardData.forEach(cardData => {
      if (!cardData.createdBy) {
        cardData.createdBy = req.userId
      }
    })
  }
  try {
    const newPuzzleCards = await PuzzleCard.create(puzzleCardData)
    res.status(201).json(newPuzzleCards)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updatePuzzleCard = async (req, res) => {
  const { puzzleCardId } = req.params
  const puzzleCardData = req.body
  try {
    const updatedPuzzleCards = await PuzzleCard.findByIdAndUpdate(puzzleCardId, puzzleCardData, { new: true })
    res.status(200).json(updatedPuzzleCards)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const deletePuzzleCard = async (req, res) => {
  const { puzzleCardId } = req.params
  try {
    await PuzzleCard.findByIdAndRemove(puzzleCardId)
    res.json({ message: 'Puzzle Card deleted successfully' })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}