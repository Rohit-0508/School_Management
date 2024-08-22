const schoolModel= require('../models/schoolModel');


const addSchool = async(req, res)=>{
    const {name, address, latitude, longitude}=req.body;
    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ error: 'Invalid input data.' });
    }
    try {
        const id = await schoolModel.addSchool(name, address, latitude, longitude);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const listSchools = async(req, res)=>{
    let {latitude, longitude}=req.query;

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Invalid input data. Latitude and longitude must be numbers.' });
    }
    try {
        const schools = await schoolModel.listSchools(latitude, longitude);
        res.status(200).json(schools);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addSchool,
    listSchools
};