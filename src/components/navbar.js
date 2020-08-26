import React,{useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import { UserContext } from '../App'
const Navbar = () =>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = () =>{
    if(state){
      return[
        <li><Link to="/profile">Perfil</Link></li>,
        <li><Link to="/makepost">Nueva Entrada</Link></li>,
        <li>
                  <button className="btn waves-effect waves-light" onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push("/login")
          }
        }>
        Logout
        </button>
        </li>

      ]
    }else{
      return[
        <li><Link to="/login">Iniciar Sesión</Link></li>,
        <li><Link to="/signup">Registro</Link></li>
      ]
    }
  }
    return(
      
        <nav>
        <div className="nav-wrapper blue lighten-3">
          <Link to={state?"/":"/login"} className="brand-logo left">Logo</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}

          </ul>
        </div>
      </nav>
            
    )
}

export default Navbar;