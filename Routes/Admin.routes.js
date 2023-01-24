const { Router } = require('express');
const AdminRouter = Router();

const { AdminModel } = require('../Models/Admin.model')

AdminRouter.post('/create', async (req, res) => {
    const {name,position,contract,location} = req.body;
    try {
        const CreateJob = await AdminModel({name,position,contract,location});
        await CreateJob.save( );
        res.send({"message" : "Job Posted Successfully!!"})
    } catch (error) {
        res.status(400).send({"message" : "Something Went Wrong, Try Again"});
    }
})

module.exports = {
    AdminRouter
};