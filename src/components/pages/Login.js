import React,{useState,useContext} from 'react';
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css';

const Login = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const Post = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Por favor digitar bien su email", classes:"#e57373 red lighten-2"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(resp=>resp.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#e57373 red lighten-2"})
            }else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Sesion iniciada", classes:"#e57373 red lighten-2"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="formcard">
            <div className="card ">
                <input type="text" placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" placeholder="Contrasena"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={()=>Post()}>
                Login
                </button>
            </div>
        </div>
    )
}

export default Login;