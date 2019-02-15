const express = require("express");
const router = express.Router();

const PuzzleController = require("../controller/puzzles");

//----------------------------------------------------------------//
router.get("/", PuzzleController.root);
router.post("/", PuzzleController.postPuzzle);

router.get("/search", PuzzleController.searchPuzzles);

router.get("/:puzzleID", PuzzleController.getPuzzle);
router.patch("/:puzzleID", PuzzleController.patchPuzzle);
router.delete("/:puzzleID", PuzzleController.deletePuzzle);

module.exports = router;
