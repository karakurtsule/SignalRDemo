   "use strict";

    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    document.getElementById("sendButton").disabled = true;

    connection.on("ReceiveMessage", function (user, message) {
        var li = document.createElement("li");
        document.querySelector("#messagesList").appendChild(li);
        li.textContent = `${user} says ${message}`;
    });

    connection.start().then(function () {
        document.querySelector("#sendButton").disabled = false;
    }).catch(function (err) {
        return console.error(err.toString());
    });

document.querySelector("#sendButton").addEventListener("click", function (e) {
        var user = document.getElementById("userInput").value;
        var message = document.getElementById("messageInput").value;
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
        e.preventDefault();
    });
    

