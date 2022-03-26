const express = require('express');
const {httpGetAllPlanets} = require('./planets.controller.js');
const planetsRouter = express.Router();

planetsRouter.get('/planets', httpGetAllPlanets)

module.exports = planetsRouter