export default class MessageService{

    constructor(url,webSocketUrl){
        this.url=url;
        this.webSocketUrl=webSocketUrl;
        this.webSocket=null;
        this.chatWsOpened=false;
    }

    async getMessages(size,page){
        let url=this.url+"/messages"
        if (size && page)
            url=url+"?size="+size+"&page="+page;
        return await fetch(url,{
            method:"GET",
            mode:"cors",
            credentials:"include",
        }).then(resp=>{
            return (resp.ok)?resp.json():null
        })
        .catch(err=>{
            console.log(err);
            return null;
        });
    }

    connectToChat(handler){
        if (!this.chatWsOpened){
            if (this.webSocket)
                this.webSocket.close();
            this.webSocket=new WebSocket(this.webSocketUrl+"/chat");
            this.webSocket.onopen=()=>{
                this.webSocket.onmessage=handler;
                this.chatWsOpened=true;
                this.webSocket.onclose=()=>{
                    this.chatWsOpened=false;  
                };
            };
        }
    }

    disconnectFromChat(){
        this.webSocket.close();
    }
    
    async sendMessageToChat(message){
        if (!this.webSocket || !this.chatWsOpened)
            return false;
        this.webSocket.send(JSON.stringify(message));
        return true;
    }

}