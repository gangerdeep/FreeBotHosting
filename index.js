export default async function handler(req, res) {

const token = "8568616659:AAHuHJFpXjTrp_mjxJ4MYxFBgUK61J9s88E";

const update = req.body;

if(update.message){

let chat = update.message.chat.id
let text = update.message.text

if(text == "/start"){

await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
chat_id:chat,
text:"🤖 Bot Hosting Bot Ready"
})
})

}

}

res.status(200).send("ok")

}
