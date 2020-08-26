import React,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom'
import M from 'materialize-css';

const MakePost = () => {
  const history = useHistory()
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [image,setImage] = useState("")
  const [url,setUrl] = useState("")
  useEffect(()=>{
    if(url){
    fetch("/createpost",{
      method:"post",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
          title,
          description,
          img:url
      })
  }).then(resp=>resp.json())
  .then(data=>{
      console.log(data)
      if(data.error){
          M.toast({html: data.error, classes:"#e57373 red lighten-2"})
      }else{
          M.toast({html: "Publicado", classes:"#e57373 red lighten-2"})
          history.push('/login')
      }
  }).catch(err=>{
      console.log(err)
  })}
  },[url])

  const imgPost = () => {
    const data= new FormData()
    data.append("file",image)
    data.append("upload_preset","social-example")
    data.append("cloud_name","diyx0knsn")
    fetch("https://api.cloudinary.com/v1_1/diyx0knsn/image/upload",{
      method:"post",
      body:data
    }).then(res=>res.json())
    .then(data=>{
      setUrl(data.url)
    })
    .catch(err=>{
      console.log(err)
    })




  }
//	https://api.cloudinary.com/v1_1/diyx0knsn
      return(
        <div className="card infile" style={{
            margin:"10px auto",
            maxWidth: "500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" placeholder="Titulo" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="descripcion" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <div className="file-field input-field">
      <div className="btn">
        <span>Imagen</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button className="btn waves-effect waves-light" onClick={()=>imgPost()}>
                Guardar
                </button>
        </div>
    )
}

export default  MakePost;