export default class UserService{

    constructor(url){
        this.url=url;
    }

    async loginUser(username,password){
        let myHeaders=new Headers();
        myHeaders.append("Content-Type","application/json");
        return await fetch(this.url+"/login",{
            headers:myHeaders,
            method:"POST",
            mode:"cors",
            credentials:"include",
            body:JSON.stringify({username,password})
        }).then(resp=>(resp.ok)?resp.json():null)
        .catch(err=>{
            console.log(err);
            return null;
        });
    }

    async postUser(user){
        let myHeaders=new Headers();
        myHeaders.append("Content-Type","application/json");
        return await fetch(this.url+"/user",{
            headers:myHeaders,
            method:"POST",
            mode:"cors",
            credentials:"include",
            body:JSON.stringify(user)
        }).then(resp=>(resp.ok)?resp.json():null)
        .catch(err=>{
            console.log(err);
            return null;
        });
    }

    async putUser(user){
        let myHeaders=new Headers();
        myHeaders.append("Content-Type","application/json");
        return await fetch(this.url+"/user",{
            headers:myHeaders,
            method:"PUT",
            mode:"cors",
            credentials:"include",
            body:JSON.stringify(user)
        }).then(resp=>(resp.ok)?resp.json():null)
        .catch(err=>{
            console.log(err);
            return null;
        });
    }

    async putUserImage(userId,image){
        let formData=new FormData();
        formData.append("image",image);
        return await fetch(this.url+"/user/"+userId+"/image",{
            method:"POST",
            mode:"cors",
            credentials:"include",
            body:formData
        }).then(resp=>resp.ok)
        .catch(err=>{
            console.log(err);
            return false;
        });
    }

    async getCurrentUser(){
        return await fetch(this.url+"/user",{
            method:"GET",
            mode:"cors",
            credentials:"include",
        }).then(resp=>(resp.ok)?resp.json():null)
        .catch(err=>{
            console.log(err);
            return null;
        });
    }

    async getUserById(id){
        return await fetch(this.url+"/user/"+id,{
            method:"GET",
            mode:"cors",
            credentials:"include",
        }).then(resp=>(resp.ok)?resp.json():null)
        .catch(err=>{
            console.log(err);
            return null;
        });
    }

    async getNotesByUserId(id){
        return await fetch(this.url+"/user/"+id+"/notes",{
            method:"GET",
            mode:"cors",
            credentials:"include",
        }).then(resp=>(resp.ok)?resp.json():null)
        .catch(err=>{
            console.log(err);
            return null;
        });
    }

    async getUserNotes(){
        return await fetch(this.url+"/user/notes",{
            method:"GET",
            mode:"cors",
            credentials:"include",
        }).then(resp=>(resp.ok)?resp.json():null)
        .catch(err=>{
            console.log(err);
            return null;
        });
    }

    async logoutUser(){
        return await fetch(this.url+"/logout",{
            method:"GET",
            mode:"cors",
            credentials:"include",
        }).then(resp=>resp.ok)
        .catch(err=>{
            console.log(err);
            return false;
        });
    }

}