const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

let latestFlightNumber = 100

const launch = {
    flightNumber: 100,
    mission:'Mission X',
    rocket:'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target:'Kepler-442 b',
    customers:['ANASA','ZTM'],
    upcoming:true,
    success:true
}

saveLaunch(launch)

function existsLaunchId(id) {
    return true
}


async function getAllLaunches(){
    return await launches.
        find({},
            {
                '_id':0,
                '__v':0
            })
}

async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName: launch.target,
    })

    if (!planet) {
        throw new Error('No matching planet was found')
    }

    await launches.updateOne({
        flightNumber: launch.flightNumber,
    },launch,{
        upsert:true
    })
}

function addNewLaunch(launch) {
    latestFlightNumber ++
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            customers:['ZTM','NASA'],
            upcoming:true,
            flightNumber: latestFlightNumber,
            success:true
    }))
}

function abortLaunchById(id) {
    const aborted = launches.get(id)
    aborted.upcoming = false;
    aborted.success = false;

    return aborted;
}

module.exports ={
    existsLaunchId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
}