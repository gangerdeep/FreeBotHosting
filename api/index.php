<?php

$token = "8568616659:AAHuHJFpXjTrp_mjxJ4MYxFBgUK61J9s88E";
$api = "https://api.telegram.org/bot$token/";

$update = json_decode(file_get_contents("php://input"),true);

$chat_id = $update["message"]["chat"]["id"];
$text = $update["message"]["text"];

function send($chat,$msg){
global $api;
file_get_contents($api."sendMessage?chat_id=".$chat."&text=".urlencode($msg));
}

if($text == "/start"){
send($chat_id,"🤖 Welcome

Apna Bot Token bhejo
Main use Vercel par host kar dunga.");
}

elseif(strpos($text,"bot") !== false){

$bot = trim($text);

$url = "https://".$_SERVER['HTTP_HOST']."/api/host.php";

file_get_contents("https://api.telegram.org/bot$bot/setWebhook?url=$url");

send($chat_id,"✅ Bot Hosted Successfully
Webhook Set Ho Gaya");
}

?>
