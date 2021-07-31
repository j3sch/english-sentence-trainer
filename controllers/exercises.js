const Exercise = require('../models/Exercise')

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getExercises = async (req, res, next) => {
  try {
    const transactions = await Exercise.find()

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    })
  }
}

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addExercise = async (req, res, next) => {
  try {
    const { textToTranslate, translatedText, translationResult, letterEqual } =
      req.body

    const exercise = await Exercise.create(req.body)

    return res.status(201).json({
      success: true,
      data: exercise,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message)

      return res.status(400).json({
        success: false,
        error: messages,
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      })
    }
  }
}
