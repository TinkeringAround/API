const mongoose = require("mongoose");

// Utils
const StringTransform = require("../util/stringTransform");

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
          author: "string",
          tags: "[string]",
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
        url: "/puzzles/search",
        description: "Make a GET request for filtering Puzzles",
        header: {
          authorization: "Bearer Token"
        },
        queryParams: {
          title: {
            path: "/puzzles/search?title=",
            example: "/puzzles/search?title=Some_title"
          },
          tags: {
            path: "/puzzles/search?tags=",
            example: "/puzzles/search?tags=tag1_tag2_tag3"
          },
          type: {
            path: "/puzzles/search?type=",
            example: "/puzzles/search?type=type"
          },
          author: {
            path: "/puzzles/search?author=",
            example: "/puzzles/search?author=Some_author"
          },
          createdAt: {
            path: "/puzzles/search?createdAt=",
            example: "/puzzles/search?createdAt=15_02_2019"
          },
          updatedAt: {
            path: "/puzzles/search?updatedAt=",
            example: "/puzzles/search?updatedAt=15_02_2019"
          },
          page: {
            path: "puzzles/search?page=",
            example: "/puzzles/search?page=1"
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
          tags: "[string]",
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
  let { title, description, type, author, tags, content } = req.body;

  if (
    title == null ||
    description == null ||
    type == null ||
    author == null ||
    content == null ||
    content.task == null
  ) {
    return res.status(409).json({
      message: "Creating Puzzle has failed.",
      time: new Date().toISOString()
    });
  } else {
    tags = tags != null ? tags : [];
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
          author: author,
          type: type,
          tags: tags,
          meta: {
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
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
            data: {
              newPuzzle
            },
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
  const { puzzleID } = req.params;

  if (puzzleID == null) {
    return res.status(409).json({
      message: "Finding the puzzle has failed.",
      time: new Date().toISOString()
    });
  } else {
    Puzzle.find({ _id: puzzleID })
      .exec()
      .then(puzzles => {
        if (puzzles.length < 1) {
          return res.status(409).json({
            message: "Finding the Puzzle has failed.",
            time: new Date().toISOString()
          });
        } else {
          const puzzle = puzzles[0];
          console.log(puzzle);

          return res.status(200).json({
            message: "Finding the Puzzle has been successful.",
            data: {
              puzzleID: puzzleID,
              title: puzzle.title,
              description: puzzle.description,
              author: puzzle.author,
              type: puzzle.type,
              tags: puzzle.tags,
              meta: puzzle.meta,
              content: puzzle.content
            },
            time: new Date().toISOString()
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
  }
};

exports.patchPuzzle = (req, res, next) => {
  const { puzzleID } = req.params;
  const { title, description, type, tags, meta, content } = req.body;

  if (puzzleID == null || Object.keys(req.body).length === 0) {
    return res.status(409).json({
      message: "Updating the puzzle has failed.",
      time: new Date().toISOString()
    });
  } else {
    Puzzle.find({ _id: puzzleID })
      .exec()
      .then(puzzles => {
        if (puzzles.length < 1) {
          return res.status(409).json({
            message: "Updating the Puzzle has failed.",
            time: new Date().toISOString()
          });
        } else {
          let updatedPuzzle = puzzles[0];

          updatedPuzzle.title = title == null ? updatedPuzzle.title : title;
          updatedPuzzle.description =
            description == null ? updatedPuzzle.description : description;
          updatedPuzzle.type = type == null ? updatedPuzzle.type : type;
          updatedPuzzle.tags = tags == null ? updatedPuzzle.tags : tags;

          updatedPuzzle.meta.updatedAt = new Date().toISOString();

          if (content != null) {
            updatedPuzzle.content.task =
              content.task == null ? updatedPuzzle.content.task : content.task;
            updatedPuzzle.content.clue =
              content.clue == null ? updatedPuzzle.content.clue : content.clue;
            updatedPuzzle.content.solution =
              content.solution == null
                ? updatedPuzzle.content.solution
                : content.solution;
            updatedPuzzle.content.media =
              content.media == null
                ? updatedPuzzle.content.media
                : content.media;
            updatedPuzzle.content.puzzle =
              content.puzzle == null
                ? updatedPuzzle.content.puzzle
                : content.puzzle;
            updatedPuzzle.content.data =
              content.data == null ? updatedPuzzle.content.data : content.data;
          }

          updatedPuzzle.save().then(result => {
            return res.status(200).json({
              message: "Updating the Puzzle was successful.",
              data: { updatedPuzzle },
              time: new Date().toISOString()
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err,
          time: new Date().toISOString()
        });
      });
  }
};

exports.deletePuzzle = (req, res, next) => {
  const { puzzleID } = req.params;

  if (puzzleID == null) {
    return res.status(409).json({
      message: "Deleting the puzzle has failed.",
      time: new Date().toISOString()
    });
  } else {
    Puzzle.find({ _id: puzzleID })
      .exec()
      .then(puzzles => {
        if (puzzles.length >= 1) {
          Puzzle.remove({ _id: puzzleID })
            .exec()
            .then(result => {
              return res.status(200).json({
                message: "Deleting the Puzzle has been successful.",
                data: { puzzleID: puzzleID },
                time: new Date().toISOString()
              });
            })
            .catch(err => {
              console.log(err);
              return res.status(500).json({
                error: err,
                time: new Date().toISOString()
              });
            });
        } else {
          return res.status(409).json({
            message: "Deleting the Puzzle has failed.",
            time: new Date().toISOString()
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
  }
};

// /puzzles/search/
exports.searchPuzzles = (req, res, next) => {
  const { page, title, tag, type, author, createdAt, updatedAt } = req.query;

  let searchQueries = false;
  let searchParameters = {};

  // Page & Limit
  const options = {
    skip: page == null ? 0 : 10 * parseInt(page),
    limit: page == null ? 15 : 10
  };

  if (title != null || tag != null || type != null || author != null) {
    searchQueries = true;

    // Search Parameters
    if (title != null) searchParameters.title = title;
    if (tag != null) searchParameters.tag = tag;
    if (type != null) searchParameters.type = type;
    if (author != null) {
      searchParameters.author = StringTransform.createAuthor(author);
    }
  }

  console.log(searchParameters);

  if (searchQueries) {
    Puzzle.find(searchParameters)
      .exec()
      .then(puzzles => {
        return res.status(200).json({
          message: "Search request has ben successful.",
          data: {
            puzzles: puzzles
          },
          time: new Date().toISOString()
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({
          error: err,
          time: new Date().toISOString()
        });
      });
  } else {
    Puzzle.find({}, null, options)
      .exec()
      .then(puzzles => {
        return res.status(200).json({
          message: "Search request has ben successful.",
          data: {
            puzzles: puzzles
          },
          time: new Date().toISOString()
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({
          error: err,
          time: new Date().toISOString()
        });
      });
  }
};
