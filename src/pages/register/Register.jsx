/* eslint-disable jsx-a11y/img-redundant-alt */
import registerimg from "../../assets/registerimg.png"
import { useSelector, useDispatch } from "react-redux"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../authentication/firebase"
import { registerInfos } from "../../redux/features/registerSlice"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate();

  const [ repeatPass, setRepeatPass ] = useState("")
  const [ agreeTerms, setAgreeTerms ] = useState(false)
  const [ emailError, setEmailError ] = useState(false)
  const [ passwordError, setPasswordError] = useState(false)
  const [ matchPassword, setMatchPassword ] = useState(false)
  const dispatch = useDispatch();
  const registerInformations = useSelector((state) => state.registerInfos)
  const { name, email, password } = registerInformations

  const handleRegister = async () => {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    //? email format check
    if(email.match(reg)) {
      setEmailError(false)
    }else {
      setEmailError(true)
      alert("Invalid email format!")
    }

    //? password length check
    if(password.toString().length < 6){
      setPasswordError(true)
      alert("Please enter a password at least 6 character!")
    }else{
      setPasswordError(false)
    }

    if(password.toString() === repeatPass.toString()){
      setMatchPassword(true)
    }else {
      setMatchPassword(false);
      alert("Entered passwords are different!")
    }

    if(name.toString().length < 3) {
      alert("Name information has to be at least 3 characters!")
    }

    if(!agreeTerms){
      alert("Please agree all statements in Terms of service!")
    }

    if(agreeTerms && !emailError && !passwordError && matchPassword && (name.toString().length >= 3)){
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        navigate("/login")
        alert("Registration Successful!")
      } catch(error) {
        console.log(error.message)
      }
    }
  }

  return (
    <section className="vh-100" style={{backgroundColor: '#eee'}}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{borderRadius: '25px'}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" style={{marginTop:"2rem"}}/>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example1c">Name : </label>
                            <input type="text" id="form3Example1c" className="form-control" onChange={(e) => dispatch(registerInfos({...registerInformations, name:e.target.value}))}/>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" style={{marginTop:"2rem"}}/>
                          <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c">Email : </label>
                            <input type="email" id="form3Example3c" className="form-control" onChange={(e) => dispatch(registerInfos({...registerInformations, email:e.target.value}))}/>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" style={{marginTop:"2rem"}}/>
                          <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4c">Password :</label>
                            <input type="password" id="form3Example4c" className="form-control" onChange={(e) => dispatch(registerInfos({...registerInformations, password:e.target.value}))}/>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw" style={{marginTop:"2rem"}}/>
                          <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4cd">Repeat Password :</label>
                            <input type="password" id="form3Example4cd" className="form-control" onChange={(e) => setRepeatPass(e.target.value)}/>
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                          <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3c" onClick={() => agreeTerms ? setAgreeTerms(false): setAgreeTerms(true)}/>
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg" onClick={handleRegister}>Register</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src={registerimg} className="img-fluid" alt="Sample image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Register