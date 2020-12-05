export default class NoteService{

    constructor(url){
        this.url=url;
    }

    async getNotes(size,page){
        let url=this.url+"/user/notes"
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

    async countNotes(){
        return await fetch(this.url+"/user/notes/count",{
            method:"GET",
            mode:"cors",
            credentials:"include",
        }).then(resp=>(resp.ok)?resp.json():null)
        .then(resp=>resp.count)
        .catch(err=>{
            console.log(err);
            return null;
        });
    }

    async postNote(note){
        let myHeaders=new Headers();
        myHeaders.append("Content-Type","application/json");
        return await fetch(this.url+"/note",{
            headers:myHeaders,
            method:"POST",
            mode:"cors",
            credentials:"include",
            body:JSON.stringify(note)
        }).then(resp=>(resp.ok)?resp.json():null)
        .catch(err=>{
            console.log(err);
            return null;
        });
    }

    async putNote(note){
        let myHeaders=new Headers();
        myHeaders.append("Content-Type","application/json");
        return await fetch(this.url+"/note",{
            headers:myHeaders,
            method:"PUT",
            mode:"cors",
            credentials:"include",
            body:JSON.stringify(note)
        }).then(resp=>(resp.ok)?resp.json():null)
        .catch(err=>{
            console.log(err);
            return null;
        });
    }

    async deleteNote(id){
        return await fetch(this.url+"/note/"+id,{
            method:"DELETE",
            mode:"cors",
            credentials:"include",
        }).then(resp=>resp.ok)
        .catch(err=>{
            console.log(err);
            return false;
        });
    }

}