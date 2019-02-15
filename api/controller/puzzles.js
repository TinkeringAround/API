const mongoose = require("mongoose");

// Models
const Puzzle = require("../models/Puzzle");

//----------------------------------------------------------------//
// /puzzles
exports.root = (req, res, next) => {
  return res.status(200).json({
    routes: [
      {
        type: "POST",
        url: "/puzzles",
        description:
          "Make a POST request with valid body for creating a Puzzle",
        header: {
          authorization: "Bearer token"
        },
        body: {
          title: "string",
          description: "string",
          type: "string",
          meta: {
            author: "string",
            tags: "[string]"
          },
          content: {
            task: "string",
            clue: "string",
            solution: "[string]",
            media: "string",
            puzzle: "[string]",
            data: "Object"
          }
        }
      },
      {
        type: "GET",
        url: "/puzzles/search/",
        description: "Make a GET request for filtering Puzzles",
        header: {
          authorization: "Bearer token"
        },
        queryParams: {
          title: {
            path: "/puzzles/search/?title=",
            example: "/puzzles/search/?title=Some_title"
          },
          tag: {
            path: "/puzzles/search/?tags=",
            example: "/puzzles/search/?tags=tag1_tag2_tag3"
          },
          type: {
            path: "/puzzles/search/?type=",
            example: "/puzzles/search/?type=type"
          },
          author: {
            path: "/puzzles/search/?author=",
            example: "/puzzles/search/?author=Some_author"
          },
          createdAt: {
            path: "/puzzles/search/?createdAt=",
            example: "/puzzles/search/?createdAt=15_02_2019"
          },
          updatedAt: {
            path: "/puzzles/search/?updatedAt=",
            example: "/puzzles/search/?updatedAt=15_02_2019"
          },
          page: {
            path: "puzzles/search/?page=",
            example: "/puzzles/search/?page=1"
          }
        }
      },
      {
        type: "GET",
        url: "/puzzles/:puzzleID",
        description: "Make a GET request for fetching a Puzzle",
        header: {
          authorization: "Bearer Token"
        }
      },
      {
        type: "PATCH",
        url: "/puzzles/:puzzleID",
        description: "Make a PATCH request to update a Puzzle",
        header: {
          authorization: "Bearer Token"
        },
        body: {
          title: "string",
          description: "string",
          meta: {
            tags: "[string]"
          },
          content: {
            task: "string",
            clue: "string",
            solution: "[string]",
            media: "string",
            puzzle: "[string]",
            data: "Object"
          }
        }
      },
      {
        type: "DELETE",
        url: "puzzles/:puzzleID",
        description: "Make a DELETE request for deleting a Puzzle",
        header: {
          authorization: "Bearer Token"
        }
      }
    ],
    time: new Date().toLocaleDateString()
  });
};

exports.postPuzzle = (req, res, next) => {
  let { title, description, type, meta, content } = req.body;

  if (
    title == null ||
    description == null ||
    type == null ||
    meta == null ||
    meta.author == null ||
    content == null ||
    content.task == null
  ) {
    return res.status(409).json({
      message: "Creating Puzzle has failed.",
      time: new Date().toISOString()
    });
  } else {
    meta.tags = meta.tags ? meta.tags : [];
    content.clue = content.clue ? content.clue : "";
    content.solution = content.solution ? content.solution : [];
    content.media = content.media ? content.media : "";
    content.puzzle = content.puzzle ? content.puzzle : [];
    content.data = content.data ? content.data : {};
  }

  Puzzle.find({ title: title })
    .exec()
    .then(puzzles => {
      if (puzzles.length >= 1) {
        return res.status(409).json({
          message: "Creating Puzzle has failed.",
          time: new Date().toISOString()
        });
      } else {
        const newPuzzle = new Puzzle({
          _id: new mongoose.Types.ObjectId(),
          title: title,
          description: description,
          type: type,
          meta: {
            author: meta.author,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
            tags: meta.tags
          },
          content: {
            task: content.task,
            clue: content.clue,
            solution: content.solution,
            media: content.media,
            puzzle: content.puzzle,
            data: content.data
          }
        });

        newPuzzle.save().then(result => {
          console.log(result);

          res.status(201).json({
            message: "Puzzle has been created.",
            title: newPuzzle.title,
            time: new Date().toISOString()
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err,
        time: new Date().toISOString()
      });
    });
};

// /puzzles/:puzzleID
exports.getPuzzle = (req, res, next) => {
  return res.status(200).json({
    time: new Date().toISOString()
  });
};

exports.patchPuzzle = (req, res, next) => {
  return res.status(200).json({
    time: new Date().toISOString()
  });
};

exports.deletePuzzle = (req, res, next) => {
  return res.status(200).json({
    time: new Date().toISOString()
  });
};

// /puzzles/search/
exports.searchPuzzles = (req, res, next) => {
  return res.status(200).json({
    time: new Date().toISOString()
  });
};
