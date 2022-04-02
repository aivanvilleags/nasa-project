const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const defaultFlightNumber = 0

const launch = {
    flightNumber: 0,
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

async function getLatestFlightNumber(){
    const latestLaunch =  await launches
        .findOne()
        .sort('-flightNumber')
    
    if (!latestLaunch) {
        return defaultFlightNumber
    }

    return latestLaunch.flightNumber
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

    await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    },launch,{
        upsert:true
    })
}

async function scheduleNewLaunch(launch) {

    const newFlightNumber =  await getLatestFlightNumber() + 1

    const newLaunch = Object.assign(launch, {
        customers:['ZTM','NASA'],
        upcoming:true,
        success:true,
        flightNumber: newFlightNumber
        })
    
    await saveLaunch(newLaunch)
    
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
    scheduleNewLaunch,
    abortLaunchById
}