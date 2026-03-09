import fs from "fs"

const MAIN_BOT = "8568616659:AAGWJD0DVCaZS9SJzvcZx4ZyjWGXYtvUG_0"

export default async function handler(req,res){

const update = req.body

if(update.message){

let chat = update.message.chat.id
let token = update.message.text

let webhook = `https://YOUR_DOMAIN.vercel.app/api/bot/${token}`

await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${webhook}`)

let data = JSON.parse(fs.readFileSync("./database/bots.json"))

data.push({token:token,user:chat})

fs.writeFileSync("./database/bots.json",JSON.stringify(data))

await fetch(`https://api.telegram.org/bot${MAIN_BOT}/sendMessage`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
chat_id:chat,
text:`✅ Bot hosted successfully

Webhook:
${webhook}`
})
})

}

res.status(200).send("ok")

}