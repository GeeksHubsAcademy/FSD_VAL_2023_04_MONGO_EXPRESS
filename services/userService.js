const User = require("../models/User");
const bcrypt =  require("bcrypt")

const userService = {};

userService.createUser = async(name, email, password) => {
     // todo export to a utils function
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     const isValidEmail = emailRegex.test(email);

     if (!isValidEmail) {
         throw new Error('not a valid email')
     }

     // Esta expresión regular garantiza que la contraseña cumpla con los siguientes requisitos:
     // Al menos una letra mayúscula.
     // Al menos una letra minúscula.
     // Al menos un número.
     // Al menos un carácter especial (@, $, !, %, *, ?, &).
     // Longitud entre 8 y 14 caracteres. 
     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
     const isValidPassword = passwordRegex.test(password)
     if (!isValidPassword) {
         throw new Error("not a valid password")
     }

     const newPassword = bcrypt.hashSync(password, 8);

     // todo export to a repository pattern
     const user = await User.create(
         {
             name,
             email: email,
             password: newPassword,
             role: "user",
         }
     )

     return user;
}


module.exports = userService;