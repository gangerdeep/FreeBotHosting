import fs from "fs"

let users = {}

const MAIN_BOT = "8568616659:AAFWRmOpEJ1PNupLL_uNyJUkxBK_a16tX1o"

export default async function handler(req,res){

const update = typeof req.body === "string" ? JSON.parse(req.body) : req.body

if(update.message){

let chat = update.message.chat.id
let text = update.message.text

// START
if(text == "/start"){

users[chat] = {step:"token"}

await send(chat,"🤖 Pehle bot ka TOKEN bhejo")

}

// TOKEN
else if(users[chat]?.step == "token"){

users[chat] = {step:"json",token:text}

await send(chat,"📁 Ab JSON file bhejo")

}

// JSON FILE
else if(update.message.document && users[chat]?.step == "json"){

let token = users[chat].token

let data = JSON.parse(fs.readFileSync("./data/bots.json"))

data.push({
user:chat,
token:token,
file:update.message.document.file_id
})

fs.writeFileSync("./data/bots.json",JSON.stringify(data,null,2))

let webhook = `https://free-bot-hosting-rose.vercel.app/api/bot/${token}`

await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${webhook}`)

await send(chat,"✅ Bot hosted successfully")

}

}

res.status(200).send("ok")

}

async function send(chat,text){

await fetch(`https://api.telegram.org/bot${MAIN_BOT}/sendMessage`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
chat_id:chat,
text:text
})
})

}
