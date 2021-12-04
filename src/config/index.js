require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3001,
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    twimlAppSid: process.env.TWILIO_TWIML_APP_SID,
    callerId: process.env.TWILIO_CALLER_ID,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET
}