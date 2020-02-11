const mongoose = require('mongoose');


const userShema = mongoose.Schema({
    name: {
        type: String
    },
    comment: {
        type: String
    },
    time :{
        type : String
    },
    parentId : {
        type : String
}
},{
    timestamps: true
})
const user = mongoose.model('user', userShema)
  

module.exports = user;