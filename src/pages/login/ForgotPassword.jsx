import { useState } from "react";
import { auth } from "../../authentication/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    
    const sendForgotPasswordToEmail = () => {
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        //? email format check
        if(email.match(reg)) {
          setEmailError(false)
        }else {
          setEmailError(true)
          setEmail("")
          alert("Invalid email format!")
        }

        if(!emailError) {
            sendPasswordResetEmail(auth, email)
              .then(() => {
                setEmail("")
                alert("Please check your mailbox!")
              })
              .catch((error) => {
                console.log(error.message);
              })
        }
    }
  return (
    <div className="modal" id="forgotPassword" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Forgot Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
            <form>
        <div className="form-group">
          <label className="mb-2" htmlFor="exampleInputEmail1">Email : </label>
          <input type="email" value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)}/>
        </div>
      </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={sendForgotPasswordToEmail}>Send</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ForgotPassword;