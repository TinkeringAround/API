const express = require("express");
const router = express.Router();

const PuzzleController = require("../controller/puzzles");

//----------------------------------------------------------------//
router.get("/", PuzzleController.root);
router.post("/", PuzzleController.postPuzzle);

router.get("/:puzzleID", PuzzleController.getPuzzle);
router.patch("/:puzzleID", PuzzleController.patchPuzzle);
router.delete("/:puzzleID", PuzzleController.deletePuzzle);

router.get("/search", PuzzleController.searchPuzzles);

module.exports = router;
