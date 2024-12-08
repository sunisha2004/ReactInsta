import userSchema from "./model/user.js"
import profileSchema from "./model/profile-model.js"
import postSchema from "./model/post-model.js"
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const { sign } = pkg



const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "sunishams2004@gmail.com",
    pass: "xgrj cojw wpfl stau",
  },
});




export async function addUser(req, res) {
  console.log(req.body);

  const { username, email, password, confirmpassword,pic } = req.body;


  if (!(username && email && password && confirmpassword&&pic)) {
    return res.status(400).send({ msg: "Fields are empty" });
  }


  if (password !== confirmpassword) {
    return res.status(400).send({ msg: "Passwords do not match" });
  }

  try {

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ msg: "Email already used" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    await userSchema.create({ username, email, password: hashedPassword,pic });
    return res.status(201).send({ msg: "Registration successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Server error" });
  }
}




export async function login(req, res) {
  console.log(req.body);
  const { email, password } = req.body
  if (!(email && password))
    return res.status(500).send({ msg: "fields are empty" })
  const user = await userSchema.findOne({ email })
  if (!user)
    return res.status(500).send({ msg: "email donot exist" })
  const success = await bcrypt.compare(password, user.password)
  // console.log(success);
  if (success !== true)
    return res.status(500).send({ msg: "email or password not exist" })
  const token = await sign({ UserID: user._id }, process.env.JWT_KEY, { expiresIn: "24h" })
  // console.log(token);
  res.status(201).send({ token })
}

export async function verifyEmail(req, res) {
  const { email } = req.body
  console.log(email);
  if (!(email)) {
    return res.status(500).send({ msg: "fields are empty" })
  }
  const user = await userSchema.findOne({ email })
  if (!user) {
    const info = await transporter.sendMail({
      from: 'sunishams2004@gmail.com',
      to: email,
      subject: "verify",
      text: "VERIFY! your email",
      html: `
    <div class=" page" style="width: 500px; height: 300px; display: flex; 
    align-items: center; justify-content: center; flex-direction: column;
     background-color: gainsboro;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; ">
        <h2>Email verification</h2>
        <p>Click This Button to verify its you</p>
        <a href="http://localhost:5173/Register"><button style="padding: 5px 15px; border: none; border-radius: 4px; 
        background-color: white;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        font-size: 18px; color: red; font-style: italic;" >Verify</button></a>
    </div>`,
    })
    console.log("Message sent: %s", info.messageId)
    res.status(201).send({ msg: "Verificaton email sented" })
  } else {
    return res.status(500).send({ msg: "email already exist" })
  }
}



//Display user
export async function display(req, res) {
  // console.log(req.user);
  const usr = await userSchema.findOne({ _id: req.user.UserID })
  // console.log(usr);
  res.status(200).send({ userid: usr._id, name: usr.username });


}

//Profile page
export async function profile(req, res) {
  // console.log(req.user.UserID);

  const usr = await userSchema.findOne({ _id: req.user.UserID })
  // console.log(usr);

  const data = await profileSchema.findOne({ userId: req.user.UserID })
  if (!data) res.status(200).send({ usr })
  else {
    res.status(200).send({ usr, data })
  }
}

//Add user Data
export async function addUserData(req, res) {
  try {
    const { name, dob, note } = req.body
    await profileSchema.create({ userId: req.user.UserID, name, dob, note })
    res.status(200).send({ message: "Data added successfully!" })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Failed to add data. Please try again." })
  }
}

//Edit user
export async function editUserData(req, res) {
  try {
    const { name, dob, note } = req.body
    const updatedData = await profileSchema.updateOne({ userId: req.user.UserID }, { $set: { name, dob, note } },)
    res.status(200).send({ message: "Data updated successfully!", data: updatedData })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Failed to update data. Please try again." })
  }
}

//Delete user
export async function deleteUser(req, res) {

  try {

    await profileSchema.deleteOne({ userId: req.user.UserID });
    await userSchema.deleteOne({ _id: req.user.UserID });

    res.status(200).send({ msg: "Data Deleted Successfully" });


  }
  catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Faild to Delete Data. Please try again" })

  }

}

//Add Post
export async function addPost(req, res) {
  try {
    // console.log(req.user.UserID)
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString(); 

    const {caption,description,images}=req.body
    const post = await postSchema.create({userId: req.user.UserID,caption,description,images,date,time});
    res.status(200).send({ msg: "Post added successfully!", data: post })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: "Failed to add data. Please try again." })
  }
}

//Get the post

export async function getPosts(req, res) {
  try {
    const posts = await postSchema.find({ userId: req.user.UserID });
    if (!posts || posts.length === 0) {
      return res.status(200).send({ msg: "No posts found", data: [] });
    }
    res.status(200).send({ data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Failed to fetch posts. Please try again." });
  }
}

export async function getPost(req, res) {
  try {
    const post = await postSchema.findOne({_id: req.params.id});
    console.log(req.params.id);
    
    // if (!post) {
    //   return res.status(404).send({ msg: "Post not found" });
    // }
    console.log(post);
    
    res.status(200).send({ post });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Failed to fetch post. Try again later." });
  }
}

export async function getAllPosts(req, res) {
  try {
    const posts = await postSchema.find();
    // if (!posts || posts.length === 0) {
    //   return res.status(200).send({ msg: "No posts found", data: [] });
    // }
    res.status(200).send({ data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Failed to fetch posts. Please try again." });
  }
}

export async function deletePost(req, res) {
  try {
    const post = await postSchema.deleteOne({_id: req.params.id});
    res.status(200).send({ msg: "Post deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Failed to delete post. Try again later." });
  }
}







