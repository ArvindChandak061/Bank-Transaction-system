const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    email: {
        type: String,
        require:[true,"Email is require by the user"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
        unique:[true,"Email already exists"]
    },
    name: {
        type: String,
        require:[true,"name is required for creating an account"],
    },
    password:{
        type: String,
        require:[true,"password is required for creating an account"],
        minlength:[6,"password should contain 6 characters"],
        select: false
    },
},{
    timestamps:true
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    return

})

userSchema.methods.comparePassword = async function (password) {

    console.log(password, this.password)

    return await bcrypt.compare(password, this.password)

}


const userModel = mongoose.model("user", userSchema)

module.exports = userModel