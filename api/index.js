let users = {}

export default async function handler(req, res) {

const BOT_TOKEN = "8568616659:AAHuHJFpXjTrp_mjxJ4MYxFBgUK61J9s88E"

const update = req.body

if(update.message){

let chat = update.message.chat.id
let text = update.message.text

// START
if(text == "/start"){

users[chat] = {step:"file"}

await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
chat_id:chat,
text:"📁 Apni PHP file bhejo"
})
})

}

// FILE RECEIVE
else if(update.message.document){

users[chat] = {step:"token"}

await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
chat_id:chat,
text:"🤖 Ab apna BOT TOKEN bhejo"
})
})

}

// TOKEN RECEIVE
else if(users[chat] && users[chat].step == "token"){

let token = text

let webhook = `https://free-bot-hosting-rose.vercel.app/api/${token}`

await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
chat_id:chat,
text:`✅ Hosting Ready

Webhook URL:

${webhook}

Yaha BOT_TOKEN ki jagah apna token dalo`
})
})

}

}

res.status(200).send("ok")

}
