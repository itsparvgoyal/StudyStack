const mongoose = require("mongoose");

const reqFormSchema = new mongoose.Schema({ 
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }

} , {timeStamp:true});     

const ReqForm = mongoose.model("ReqForm",reqFormSchema);

module.exports = ReqForm;