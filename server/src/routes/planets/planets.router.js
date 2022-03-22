const express = require('express');
const {getAllPlanets} = require('./planets.controller.js');
const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets)

module.exports = planetsRouter