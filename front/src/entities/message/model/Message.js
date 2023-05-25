export class Message{

    constructor(senderId, text = "", timeStamp = new Date().toString(), status = "access") {
        this.senderId = senderId;
        this.text = text;
        this.timeStamp = timeStamp;
        this.status = status;
    }
}