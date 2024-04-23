const userModel = require('../models/userModel')
const contactModel = require('../models/contactModel')


// get all users
const getAllUsers = async (req, res)=>{
    try {
        const users = await userModel.find({}, {password: 0})
        if(!users){
            return res.status(404).json({
                message: "No users registered",
            })
        }
        return res.status(200).json({
            message: "Users fetched successfully",
            users: users
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Could not fetch users"});
    }
}
const deleteUser = async (req, res)=>{
    try {
        const {id} = req.params
        const deletedUser = await userModel.findByIdAndDelete({_id: id});
        if(!deletedUser){
            return res.status(404).json({
                message: "User couldn't be deleted",
            })
        }
        return res.status(200).json({
            message: "User Deleted successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Could not delete user"});
    }
}

const editUser = async (req, res)=>{
    try {
        const {id} = req.params;
        const updatedUser = await userModel.findByIdAndUpdate({_id: id}, {
            $set: req.body
        }, {new: true}).select("-password")
        if(!updatedUser){
            return res.status(404).json({
                message: "User couldn't be updated",
            })
        }
        return res.status(200).json({
            message: "User Updated successfully",
            user: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Could not update user"});
    }
}

const getSingleUser = async (req, res)=>{
    try {
        const {id} = req.params;
        const user = await userModel.findById({_id: id}, {password: 0, __v: 0, _id: 0});
        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        return res.status(200).json({
            message: "User fetched successfully",
            user: user
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Could not fetch user"});
    }
}


// get all contacts
const getAllContacts = async (req, res)=>{
    try {
        const contacts = await contactModel.find({})
        if(!contacts){
            return res.status(404).json({
                message: "No contacts found",
            })
        }
        return res.status(200).json({
            message: "Contacts fetched successfully",
            contacts: contacts
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Could not fetch contacts"});
    }
}

const deleteContact = async (req, res)=>{
    try {
        const {id} = req.params
        const deletedContact = await contactModel.findByIdAndDelete({_id: id})
        if(!deleteContact){
            return res.status(404).json({
                message: "No contact deleted",
            })
        }
        return res.status(200).json({
            message: "Contact deleted successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Could not delete contact"});
    }
}

module.exports = {getAllUsers, getAllContacts, deleteUser, editUser, getSingleUser, deleteContact}