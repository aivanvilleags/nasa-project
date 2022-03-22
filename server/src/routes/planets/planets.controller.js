const planets = require('../../models/planets.model.js');

function getAllPlanets(req,res) {
    return res.status(200).json(planets)
}

module.exports = {getAllPlanets}