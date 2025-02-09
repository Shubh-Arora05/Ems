const mongoose = require('mongoose') ;
const bcrypt = require('bcrypt') ;
const employeeSchema = new mongoose.Schema({
    email :{
        type:String,
        required:true,
        unique:true
    },
    firstname :{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },tasks:[
        {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            date: {
                type: Date ,
            },
            category: {
                type: String,
            },
            active: {
                type: Boolean,
            },
            newTask: {
                type: Boolean,
            },
            completed:{
                type:Boolean
            },
            failed: {
                type: Boolean,
            }
            ,assignedto:{
                type:String,
            }
            
        },
    ]
    
})



employeeSchema.pre('save' ,async function (next) {
    const employee = this ;
    if(!employee.isModified('password')){
        return next() ;
    }

    try{
        const salt = await bcrypt.genSalt(10) ;
        const hashedPassowrd = await bcrypt.hash(employee.password, salt) ;
        employee.password = hashedPassowrd ;
        next() ;
    }
    catch(err){
         return next(err) ;
    }
})

employeeSchema.methods.comparePassword = async function(password){

    try{
        const isMatch = await bcrypt.compare(password, this.password) ;
        return isMatch ;

    }catch(err){
        throw err ;
    }
}


const Employee = mongoose.model('Employee' ,employeeSchema) ;

module.exports = Employee ;