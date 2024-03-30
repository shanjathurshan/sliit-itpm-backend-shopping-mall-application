const Game = require("./gameModel");
// const Enrolment = require("../enrolments/enrolmentsModel");
const asyncHandler = require("express-async-handler");
const { z } = require("zod");

// @desc Get all games
// @route GET /games
// @access Private
const getAllGames = asyncHandler(async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Get all games from MongoDB with pagination
  const games = await Game.find().skip(startIndex).limit(limit).lean();

  // If no games
  if (!games?.length) {
    return res.status(400).json({ message: "No games found" });
  }

  res.json(games);
});

// @desc Create new game
// @route POST /games
// @access Private
const createNewGame = asyncHandler(async (req, res) => {
  const { userId, title, price } = req.body;
  console.log(req.body)

  image = req.file.filename
  // Check for duplicate gameId
  const duplicate = await Game.findOne({ title })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate title" });
  }

  const gameObject = {
    userId,
    title,
    price,
    image
  };

  // Create and store new game
  const game = await Game.create(gameObject);

  if (game) {
    res.status(201).json({ message: `New game ${game._id} created` });
  } else {
    res.status(400).json({ message: "Invalid game data received" });
  }
});

// @desc Update game
// @route PATCH /games
// @access Private
const updateGame = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  // Find the game by userId
  const game = await Game.findOne({ userId }).lean().exec();
  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  // Update the game with the new data
  const updatedGame = await Game.findOneAndUpdate(
    { userId },
    { $set: req.body },
    { new: true }
  ).lean().exec();
  res.json(updatedGame);
});

// @desc Delete game
// @route DELETE /games
// @access Private
const deleteGame = asyncHandler(async (req, res) => {
  const { id } = req.body;
  // Find the game by userId
  const game = await Game.findById( id ).lean().exec();
  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  console.log(game)
  // Delete the game
  await Game.findOneAndDelete({ _id: id }).lean().exec();
  res.json({ message: "Game deleted successfully" });
});

// @desc Get game by Id
// @route GET /games/id
// @access Private
const getGameById = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const game = await
    Game
      .findById(id)
      .lean()
      .exec();
  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  res.json(game);
});

// @desc Get game by game id
// @route GET /games/sid
// @access Private

const getGameByGameId = asyncHandler(async (req, res) => {
  const { gameId } = req.body;
  const game = await Game.findOne({ gameId }).lean().exec();
  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  res.json(game);
});

// @desc Get game enrolled courses details
// @route GET /games/courses
// @access Private
const getGameEnrolledCourses = asyncHandler(async (req, res) => {
  const { gameId } = req.body;
  const enrolments = await Enrolment.find({ gameId }).populate('courseId').lean().exec();
  if (!enrolments) {
    return res.status(404).json({ message: "Enrolments not found" });
  }
  res.json(enrolments);
});

module.exports = {
  getAllGames,
  createNewGame,
  deleteGame,
  updateGame,
  getGameById,
  getGameByGameId,
  getGameEnrolledCourses
};
