import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebase.init';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const auth = getAuth(app);







function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const [success, setSuccess] = useState('');
  const [name, setName] = useState('');


  const handleNameBlur = event =>{
    setName(event.target.value)
    updateProfile(auth.currentUser, {
      displayName : name
      .then( ()=>{
        console.log('Updating name')
      })
      .catch(error =>{
        console.error(error);
      })

    })
    
  }

  const handleEmailBlur = event => {
    setEmail(event.target.value)
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value)
  }

  const handleRegisteredChange = event => {
    setRegistered(event.target.checked)
  }

  const handleFormSubmit = event => {
    console.log('Form Submitted', email)
    event.preventDefault();


    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError('Please give special character (?=.*[!@#$%^&*])')
      return;
    }
    setError('');


    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
         
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
          setEmail('')
          setPassword('')
          verifyEmail();
          setSuccess('Successfully Created User');
        })
        .catch(error => {
          console.error(error);
          setError(error.message)
        })
        
    }


  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email Verification Send');
      })

  }


  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset Email sent')
      })
  }




  return (
    <div>


      <div className='registration w-50 mx-auto mt-3 '>
        <h2 className='text-primary'>Please {registered ? 'Login' : 'Registered'}</h2>

        <Form onSubmit={handleFormSubmit}>

          { !registered && <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Enter Your Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Enter Your Name" required />
          </Form.Group> }

          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Enter Your Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter Your Email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Enter Your Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Enter Your Password" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered?" />
          </Form.Group>
          <p className='text-success'>{success}</p>
          <p className='text-danger'>{error}</p>
          <Button onClick={handleForgetPassword} variant="link">Forget Password</Button> <br />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Registered'}
          </Button>
        </Form>
      </div>





      {/* <form onSubmit={handleFormSubmit} >

        <input onBlur={handleEmailBlur}  type="email" name="" id="" placeholder='Enter Your Email' /> 
        <br /> <br />
        <input onBlur={handlePasswordBlur} type="password" name="" id="" placeholder='Enter Your Password' />
        <br />

        <input type="submit" value="Login" />
      
      </form> */}

    </div>
  );
}

export default App;
