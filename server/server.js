import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {clerkClient, clerkMiddleware, requireAuth} from '@clerk/express'
import { aiRouter } from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import { userRouter } from './routes/userRoutes.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(clerkMiddleware())
connectCloudinary();


const PORT = process.env.PORT || 8000;

app.get('/', async (req,res)=>{
    // console.log(req);
    console.log(req.auth());
    const {userId, has, getToken} = req.auth();
    console.log(userId);
    console.log(has);

    let a = await getToken(); //this is how we get the JWT token
    console.log(a);

    const x = await has({plan:'premium'});
    console.log(x);

    // const user = await clerkClient.users.getUser(userId);
    // console.log(user);

    res.send('Server is Live!!!')
})

app.use(requireAuth()) //putting this after the home route, so that all the below routes are protected, and not the '/' route, So '/' will be public anyone can access it.


//AI generate routes
app.use('/api/ai', aiRouter);

//user routes
app.use('/api/user', userRouter);


app.listen(PORT, ()=>{
    console.log('server started on PORT', PORT);
})