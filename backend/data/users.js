//to hash passswords we will be using a package called Bcrypt
//We are creating data in accordance to our userModel.js
import bcrypt from 'bcryptjs'
const users=[
    {
        name:'Admin User',
        email:'admin@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
    {
        name:'John Doe',
        email:'john@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
    {
        name:'Jane Doe',
        email:'jane@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
]
export default users