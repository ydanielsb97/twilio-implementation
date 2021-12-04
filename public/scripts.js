const makeCallForm = document.getElementById("makeCallForm");
const btnCall = document.getElementById("button-call");

const getToken = async () => await fetch("/token").then(res => res.json(0)).then(data => data);

window.addEventListener("DOMContentLoaded", () => {
    getToken().then(data => {
        console.log({ data })
        let device = new Twilio.Device(data.token);

        device.on("ready", (_device) => {
            makeCallForm.addEventListener("submit", (e) => {
                e.preventDefault();

                var params = {
                    To: document.getElementById("phone-number").value
                };

                console.log("Calling " + params.To + "...");
                var outgoingConnection = _device.connect(params);

                outgoingConnection.on("ringing", function () {
                    btnCall.classList.add("btn-calling")
                    console.log("Ringing...");
                });
            });
        })

        device.on("error", function (error) {
            console.log("Twilio.Device Error: " + error.message);
            btnCall.classList.remove("btn-calling")
        });

        device.on("connect", function () {
            console.log("Call initiated");
            document.getElementById("button-call").style.display = "none";
            document.getElementById("button-hangup").style.display = "inline";
        });

        device.on("disconnect", function () {
            console.log("Call ended.");
            document.getElementById("button-call").style.display = "inline";
            document.getElementById("button-hangup").style.display = "none";
        });

        document.getElementById("button-hangup").onclick = function () {
            console.log("Disconnecting...");
            if (device) {
                device.disconnectAll();
                btnCall.classList.remove("btn-calling")
            }
        };
    })
})


