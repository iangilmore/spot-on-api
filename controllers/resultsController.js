import Result from "../models/resultsModel.js"

export const getResults = async (req, res) => {
  try {
    const session = await getSessionFromCookie(req.cookies)
    const { userId } = session.user._id
    const results = await Result.find({ user: userId })
    res.status(200).json(results)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getResult = async (req, res) => {
  const { resultId } = req.params
  try {
    const result = await Result.find({ _id: resultId })
    res.status(200).json(result)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createResults = async (req, res) => {
  const resultData = req.body
  try {
    const newResults = await Result.create(resultData)
    res.status(201).json(newResults)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updateResult = async (req, res) => {
  const { resultId } = req.params
  const resultData = req.body
  try {
    const updatedResults = await Result.findByIdAndUpdate(resultId, resultData, { new: true })
    res.status(200).json(updatedResults)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const deleteResult = async (req, res) => {
  const { resultId } = req.params
  try {
    await Result.findByIdAndRemove(resultId)
    res.json({ message: 'Result deleted successfully' })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}