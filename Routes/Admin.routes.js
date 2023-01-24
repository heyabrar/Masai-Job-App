const { Router } = require('express');
const AdminRouter = Router();

const { AdminModel } = require('../Models/Admin.model');

AdminRouter.get('/jobs', async(req,res)=>{
    try {
        const AllJobs = await AdminModel.find();
        res.send(AllJobs);
    } catch (error) {
        res.status(400).send({"mesage" : "Something Went Wrong"})
    }
})

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


AdminRouter.patch('/edit/:id', async (req,res)=>{
    const payload = req.body;
    const {id} = req.params;
    if(payload === '') res.status(400).send({"message" : "Look's like you have not logged in"})
    else
    {
        try {
            await AdminModel.findByIdAndUpdate({_id : id},payload);
            res.send({"message" : "Task Updated Successfully!!"});
        } catch (error) {
            res.status(400).send({"message" : "Something Went Wrong"});
        }
    }
});

AdminRouter.delete('/delete/:id', async (req,res) =>{
    const {id} = req.params;
    try {
        await AdminModel.findByIdAndDelete({_id : id});
        res.send({"message" : "Job Deleted Successfully!!"})
    } catch (error) {
        res.status(400).send({"message" : "Something Went Wrong"});
    }
});

module.exports = {
    AdminRouter
};