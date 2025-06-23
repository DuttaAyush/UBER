const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapService = require('./maps.service')
const crypto = require('crypto')

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Origin and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination)

    const baseFares = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRates = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinRates = {
        auto: 2,
        car: 3,
        moto: 1.5
    };


    const fare = {
        auto: Math.round(baseFares.auto + perKmRates.auto * (distanceTime.distance.value / 1000) + perMinRates.auto * (distanceTime.duration.value / 60)),
        car: Math.round(baseFares.car + perKmRates.car * (distanceTime.distance.value / 1000) + perMinRates.car * (distanceTime.duration.value / 60)),
        moto: Math.round(baseFares.moto + perKmRates.moto * (distanceTime.distance.value / 1000) + perMinRates.moto * (distanceTime.duration.value / 60))
    };

    return fare;

}

module.exports.getFare = getFare

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }

    return generateOtp(num);
}



module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    });

    return ride;
};

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride is Required')
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp')

    if (!ride) {
        throw new Error('Ride not found')
    }

    return ride

}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are Required')
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp')

    if (!ride) {
        throw new Error('Ride not found')
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted')
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP')
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing',
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    return ride

}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}