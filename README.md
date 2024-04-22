# Hugging Face Text to Image :page_facing_up: 2 :camera:

This project is for my students who don't have access to search and download images on their own, so they can build this project and make their own **Hugging Face/Stable Diffusion** based AI images and not have to ask the instructor for images and wait. I expect this to impact the productivity of my entire class and hopefully all of the classes at my company.

The original idea came from the need of my students but also from [Josh tried coding](https://www.youtube.com/@joshtriedcoding) and his video that included a bit about [RoomGPT](https://www.youtube.com/watch?v=RvyCAdDmFaw). Of course I don't want to use OpenAI so I immediately started looking for open source options. The original proof of concept was from [Nicholas Renotte](https://www.youtube.com/@NicholasRenotte) on YouTube was in Python. I got that one working thanks to his code but I quickly realized that I would need to make my own version in Node for my students. So there are working versions in both Python and Node.js.

## Node :rocket:
The Node version uses **Hugging Face**, **Stable Diffusion** and **Express**. The current iteration does not have an front-end.

Node works better for my students because they already have it installed, it seems to tax the computer less and it is more resource independent. The current version assumes they don't have access to run the external fetch commands locally so it is designed to run on the instructor computer, which they do have access to make requests of in the browser. Something like http://192.168.0.30:3000/url%20encoded%20inputs/url%20encoded%20negative_prompts/url%20encoded%20guidance_scale. They can call it from a front-end or their own back-end.

## Python :snake:

The Python version uses **Hugging Face**, **Stable Diffusion**, **Uvicorn** and **FastAPI** and is literally lifted from Nicholas' video. Thanks bruv. I never used FastAPI before and I was impressed with the "try it out" feature. The setup to get this working was a little more involved as I had to install Cuda, [here](https://developer.nvidia.com/cuda-downloads), and then install the correct versions of PyTorch and associated libraries, see [here](https://pytorch.org/get-started/locally/), to get this working, something Nicholas had already done off camera.

## Getting Started in Node :rocket:

Git clone the project, then:
```
cd node
npm install
npm start
```

Then you will need to go to [Hugging Face](https://huggingface.co/) and create an account if you don't already have one. Any of the accounts types should work. The free one works.

Next create a token. Go to [Settings > Tokens](https://huggingface.co/settings/tokens)  and create a new one if you don't already have one.

Grab that token, don't lose it, although Hugging Face doesn't seem to hide it from you but some sites do. The token should start with "hf". Create a .env file in the top level of the node folder. Add the line of code below, replacing the text with your actual token:
```
HF_TOKEN="your token goes here"
```

## Usage

The Express endpoint is just "/", and you would call it the way you would call any endpoint. If you have it running locally then [localhost:3000/](localhost:3000/). It takes 3 parameters:
```
inputs: string
negative_prompt: string
guidance_scale: string but actually it's a float
```
Inputs are simply normal prompts and it helps to be at least a little specific. Negative prompts are simply what you don't want, and you can comma separate them. The Guidance Scale is how strictly you want the engine to follow your inputs.

For more information on the Hugging Face interface: https://huggingface.co/docs/huggingface.js/inference/classes/HfInference.


## Getting Started in Python
Watch the [video](https://www.youtube.com/watch?v=3l16wCsDglU) I guess? I don't have plans to elaborate on the Python portion any time soon, although I would love to at some point.


### TODOS
- [ ] Need to add validation for Express endpoint parameters
- [ ] Need to either delete images on a schedule or if possible pass them straight through to the API response without saving.
