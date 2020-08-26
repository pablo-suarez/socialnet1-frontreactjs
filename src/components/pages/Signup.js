import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'
import M from 'materialize-css';

const Signup = () => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const Post = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Por favor digitar bien su email", classes:"#e57373 red lighten-2"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(resp=>resp.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#e57373 red lighten-2"})
            }else{
                M.toast({html: data.message, classes:"#e57373 red lighten-2"})
                history.push('/login')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div>
                    <div className="formcard">
            <div className="card ">
                <input type="text" placeholder="username" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" placeholder="Contrasena"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light" onClick={()=>Post()}>
                Registro
                </button>
            </div>
        </div>
        </div>
    )
}

export default Signup;