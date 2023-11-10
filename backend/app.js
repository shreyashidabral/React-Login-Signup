import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())

app.post("/signup", (req, res) => {
  try {
    const { name, date, email, password } = req.body
    console.log("server values: ", name, date, email, password);


    // Check if the user already exists
    

    // Save the new user
    const newUser = { name, date, email, password };
    existingUsers.push(newUser);

    // Save the updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));
    return res.status(200).json({ msg: "Signup Successful" })
  } catch (error) {
    return res.status(500).json({ msg: "Signup Unsuccessful" })
  }
})

app.listen(3008, () => {
  console.log("Server started at port 3008");
})