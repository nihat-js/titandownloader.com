$botToken = "7121194804:AAH-mhE6mGUz8PEJRyZXJ7FVq8psSoRxcU0"
$webhookUrl = "https://a0ba-5-134-62-205.ngrok-free.app/api/telegram/webhook"

$uri = "https://api.telegram.org/bot$botToken/setWebhook"
$body = @{
    url = $webhookUrl
}

# Send the POST request
Invoke-RestMethod -Uri $uri -Method Post -Body $body