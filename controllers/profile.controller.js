const express=require('express');
const mongoose=require('mongoose');


const getProfile=async(req,res)=>{
    res.json({
User: "details"
    });
};

module.exports = getProfile;