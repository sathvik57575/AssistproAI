import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs';
import pdf from 'pdf-parse'

// const openai = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// });

import { GoogleGenAI } from "@google/genai";
import axios from "axios";
const ai = new GoogleGenAI({});

export const generateArticle = async(req,res)=>{
    try {
        const {userId} = req.auth();
        const {prompt, length} = req.body;

        const plan = req.plan; //premium or free
        const free_usage = req.free_usage; //remaining free usage for free users

        if(plan!='premium' && free_usage>=5){
            return res.json({success: false, message: 'Free limit reached. Please upgrade to premium plan to continue.'});
        }


        //continuing, we'll use google gemini API
        const finalPrompt = `
Write an article of about the following topic in ${length} words.
Don't you DARE exceed the given word limit too much (THIS IS MANDATORY).
KEEP the article above the word limit but only by a slight margin

Topic: ${prompt}

Structure:
- Introduction
- Chronological sections
- Conclusion

Rules:
- Do not summarize
- Do not stop early
- Use complete sentences
- Recommended to use bullet point symbols if necessary
- Use bold text for headings and subheadings if you need any and place the heading/subheadings in a new line
`;

        // const response = await openai.chat.completions.create({
        //     model: "gemini-2.5-flash",
        //     messages: [
        //         {
        //             role: "user",
        //             content: finalPrompt,
        //         },
        //     ],
        //     temperature: 0.7,
        //     max_tokens: Math.ceil(length * 1.5) 
        // });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: finalPrompt,
        });

        //our answer will be in this
        // const content = response.choices[0].message.content
        const content = response.text;

        //next we will store our content in the DB, for that we'll use our sql query, go to neon DB
        let ans = await sql `INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`

        if(plan!='premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata:{
                    free_usage : free_usage+1
                }
            })
        }

        res.json({success: "true", content })

    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


export const generateBlogTitle = async(req,res)=>{
    try {
        const {userId} = req.auth();
        const {prompt} = req.body;

        const plan = req.plan; 
        const free_usage = req.free_usage; 

        if(plan!='premium' && free_usage>=5){
            return res.json({success: false, message: 'Free limit reached. Please upgrade to premium plan to continue.'});
        }


        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const content = response.text;

        let ans = await sql `INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`

        if(plan!='premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata:{
                    free_usage : free_usage+1
                }
            })
        }

        res.json({success: "true", content })

    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


export const generateImage = async(req,res)=>{
    try {
        const {userId} = req.auth();
        const {prompt, publish} = req.body;

        const plan = req.plan; 

        if(plan!='premium'){
            return res.json({success: false, message: 'This feature is only available for premium subscriptions'});
        }


        // const response = await ai.models.generateContent({
        //     model: "imagen-4.0-generate-001",
        //     contents:prompt,
        // });

        const form = new FormData()
        form.append('prompt', prompt)
        let {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', form, {
            headers:{'x-api-key': process.env.CLIPDROP_API},
            responseType: "arraybuffer"

        })

        // const content = response.candidates[0].content.parts;
        // const imagePart = parts.find(p => p.inlineData);
        // const base64Image = imagePart.inlineData.data;
        // const mimeType = imagePart.inlineData.mimeType; //mimeType means just what is the .extention of image(.png, .jpg, .jpeg, .gif etc)

        //converting to base64 image
        const imageBase64 = `data:image/png;base64,${Buffer.from(data,'binary').toString('base64')}`;

        let {secure_url} = await cloudinary.uploader.upload(imageBase64,{
            folder: "AssistProAI",
            resource_type: "image"
        })

        let ans = await sql `
        INSERT INTO creations (user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`

        res.json({success: "true", content: secure_url })

    } catch (error) {
        // console.log(error);
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


export const removeImageBackground = async(req,res)=>{
    try {
        const {userId} = req.auth();
        const image = req.file; 

        const plan = req.plan; 

        if(plan!='premium'){
            return res.json({success: false, message: 'This feature is only available for premium subscriptions'});
        }


        let {secure_url} = await cloudinary.uploader.upload(image.path,{
            folder: "AssistProAI",
            resource_type: "image",
            transformation: [{
                effect: 'background_removal',
                background_removal: 'remove_the_background'
            }],
        })

        let ans = await sql `
        INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`

        res.json({success: "true", content: secure_url })

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


export const removeImageObject = async(req,res)=>{
    try {
        const {userId} = req.auth();
        const image = req.file; 
        const {object} = req.body

        const plan = req.plan; 

        if(plan!='premium'){
            return res.json({success: false, message: 'This feature is only available for premium subscriptions'});
        }


        const uploadResult = await cloudinary.uploader.upload(image.path, {
            transformation: [{ effect: `gen_remove:${object}` }],
            folder: "AssistProAI",
            resource_type: "image"
        });

        const secure_url = uploadResult.secure_url;

        let ans = await sql `
        INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${`Remove ${object} from image`}, ${secure_url}, 'image')`

        res.json({success: "true", content:secure_url })

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}



export const resumeReview = async(req,res)=>{
    try {
        const {userId} = req.auth();
        const resume = req.file; 

        const plan = req.plan; 

        if(plan!='premium'){
            return res.json({success: false, message: 'This feature is only available for premium subscriptions'});
        }

        // max size of resume is 5mb as our gemini API tokens are limited
        if(resume.size > 5*1024*1024){
            return res.json({success:false, message: 'Resume file size exceeds allowed limit (5MB)'})
        }

        const dataBuffer = fs.readFileSync(resume.path);
        const pdfData = await pdf(dataBuffer);

        const finalPrompt = `Review the following resume and provide constructive feedback on it's strengths, weaknesses, and areas for improvement. Go in depth and detail. Resume Content: \n\n ${pdfData.text}`

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: finalPrompt,
        });

        const content = response.text;

        let ans = await sql `
        INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`

        res.json({success: "true", content })

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}