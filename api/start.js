const MAIN_BOT = "8568616659:AAGWJD0DVCaZS9SJzvcZx4ZyjWGXYtvUG_0"

export default async function handler(req,res){

const update = req.body

if(update.message){

let chat = update.message.chat.id
let text = update.message.text

if(text == "/start"){

await fetch(`https://api.telegram.org/bot${MAIN_BOT}/sendMessage`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
chat_id:chat,
text:"🤖 Apna BOT TOKEN bhejo hosting ke liye"
})
})

}

}

res.status(200).send("ok")

}
