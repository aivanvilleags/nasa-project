const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 0

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

async function existsLaunchId(id) {
    return await launches.findOne({
        flightNumber: id
    })
}

async function getLatestFlightNumber(){
    const latestLaunch =  await launches
        .findOne()
        .sort('-flightNumber')
    
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
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


async function abortLaunchById(id) {
    const aborted = await launches.updateOne({
        flightNumber:id
    },{
        success:false,
        upcoming:false
    })

    return aborted.modifiedCount === 1;
}

module.exports ={
    existsLaunchId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById
}