const VoiceResponse = require("twilio").twiml.VoiceResponse;
const AccessToken = require("twilio").jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;
const config = require("../config");
const { phoneNumberValidation } = require("../utils/phoneNumber");

module.exports.token = () => {
    const name = "testing";
    const accessToken = new AccessToken(
        config.accountSid,
        config.apiKey,
        config.apiSecret
    );

    accessToken.identity = name;

    const grant = new VoiceGrant({
        outgoingApplicationSid: config.twimlAppSid,
        incomingAllow: true
    });

    accessToken.addGrant(grant);

    return {
        identity: name,
        token: accessToken.toJwt()
    };
};

module.exports.voiceResponse = (toNumber) => {

    const twiml = new VoiceResponse();
    console.log({valid: phoneNumberValidation(toNumber)})
    if(toNumber) {

        const attribute = phoneNumberValidation(toNumber) ? "number" : "client";

        const dial = twiml.dial({
            callerId: config.callerId,
        })

        dial[attribute](toNumber)
    } else {

        twiml.say("Hello Moto");
    }

    return twiml.toString();
}

