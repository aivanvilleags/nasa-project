const launches = new Map()

let latestFlightNumber = 100

const launch = {
    flightNumber: 100,
    mission:'Mission X',
    rocket:'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination:'Kepler-442 b',
    customers:['ANASA','ZTM'],
    upcoming:true,
    success:true
}

launches.set(launch.flightNumber, launch)

function getAllLaunches(){
    return Array.from(launches.values())
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

module.exports ={
    getAllLaunches,
    addNewLaunch
}