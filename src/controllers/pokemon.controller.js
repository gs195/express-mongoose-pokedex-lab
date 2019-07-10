require("../models/pokemon.model");
const mongoose = require("mongoose");
const Pokemon = mongoose.model("pokemon");
const { flattenObj } = require("../utils/objectHelper");

const findAll = async (req, res) => {
  const foundPokemon = await Pokemon.find();
  res.json(foundPokemon);
};

const findOne = async (req, res, next) => {
  const foundOne = await Pokemon.findOne({ name: req.params.id }).catch(
    err => {
      err.message = `Could not find pokemon with name ${req.body.name.english}`;
      next(err);
    }
  );
  res.sendStatus(200);
  return foundOne;
};

const createOne = async (req, res, next) => {
  const newPokemon = new Pokemon(req.body); //try catch here
  await newPokemon.save().catch(err => {
    err.message = `Could not create pokemon ${req.body.name.english}`;
    next(err);
  });
  res.sendStatus(200);
};

const deleteOne = async (req, res, next) => {
  await Pokemon.findOneAndRemove(req.params.id).catch(err => {
    err.message = `Could not delete pokemon with id ${req.params.id}`;
    next(err);
  });

  res.sendStatus(200);
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("req.params is ", { id });
    const update = req.body;

    const updateFields = flattenObj(update);

    await Pokemon.findOneAndUpdate({ id }, updateFields);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  createOne,
  deleteOne,
  updateOne
};
