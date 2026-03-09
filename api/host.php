<?php

$update = json_decode(file_get_contents("php://input"),true);

$chat_id = $update["message"]["chat"]["id"];
$text = $update["message"]["text"];

$token = "USER_BOT_TOKEN";
$api = "https://api.telegram.org/bot$token/";

file_get_contents($api."sendMessage?chat_id=$chat_id&text=Hello From Hosted Bot");