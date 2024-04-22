import "dotenv/config"
import express from "express"
import { writeFile } from "fs/promises"
import { join, resolve } from "path"
import { HfInference } from "@huggingface/inference"

// Express
const app = express()
const port = 3000

// Get Hugging Face token
const HF_TOKEN = process.env.HF_TOKEN || ""

const inference = new HfInference(HF_TOKEN)

app.get('/:inputs/:negative_prompt/:guidance_scale', async (req, res) => {
  // TODO: need param validation
  const blob = await inference.textToImage({
    model: 'stabilityai/stable-diffusion-2',
    inputs: req.params.inputs,
    parameters: {
      negative_prompt: req.params.negative_prompt,
      guidance_scale: parseFloat(req.params.guidance_scale)
    }
  })
  // Convert Hugging Face response blob to buffer
  const buffer = await blob.arrayBuffer()
  // Get blob file extension
  const fileExt = blob.type.split('/')[1]
  // New file name
  const fileName = `hf${Date.now().toString()}.${fileExt}`
  // Path, save to images folder
  const filePath = resolve(join(`${process.cwd()}/images`, fileName))
  // Save file
  await writeFile(filePath, Buffer.from(buffer))
  // TODO: delete all the files, maybe a cron job once a night or something?
  // Respond with file
  res.sendFile(filePath)
})

app.listen(port, () => {
  console.log(`Image maker app listening on port ${port}`)
})

// NOTES: from stackoverflow, my suggested edit on answer that helped me
// result should be blob, const fileExt = result.type.split('/')[1] should be const fileExt = blob.type.split('/')[1]. Also you haven't defined currentDir, but  in this context you could replace it with process.cwd() or your preference of Node's path methods.