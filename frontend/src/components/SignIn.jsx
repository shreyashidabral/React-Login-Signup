import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { HiMail } from 'react-icons/hi'
import { BsFillLockFill } from 'react-icons/bs'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../styles/LoginSignup.css"

const SignIn = () => {
  const history = useNavigate();

  const [inputValues, setInputValues] = useState({
    email: "",
    password: ""
  })

  const [data, setData] = useState([])

  const getValues = (e) => {
    const { value, name } = e.target;

    setInputValues(() => {
      return {
        ...inputValues,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = localStorage.getItem("users")

    const { email, password } = inputValues

    if (email === "" || password === "") {
      alert("All fields are required")
    } else if (!email.includes("@")) {
      alert("Please enter valid email address")
    } else {
      console.log(userData);
      if (userData && userData.length) {
        const users = JSON.parse(userData)
        const userlogin = users.filter((el, index) => {
          return el.email === email && el.password === password
        })

        if (userlogin.length === 0) {
          alert("Invalid Details")
        } else {
          localStorage.setItem("user_login", JSON.stringify(userlogin))
          axios.post('http://localhost:3008/api/signin', inputValues)
            .then(res => {
              console.log(res);
              history("/userdetails")
            })
            .catch(err => console.log(err))
        }
      }
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="header-text"> Sign In </div>
        <div className="underline"></div>
      </div>
      <div>
        <Form>
          <Form.Group className="mb-3 input" controlId="formBasicEmail">
            <HiMail className='icons' />
            <Form.Control type="email" name='email' placeholder="Email" onChange={getValues} required />
          </Form.Group>

          <Form.Group className="mb-3 input" controlId="formBasicPassword">
            <BsFillLockFill className='icons' />
            <Form.Control type="password" name='password' placeholder="Password" onChange={getValues} required />
          </Form.Group>

          <Form.Group className="mb-3 text" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me " />
          </Form.Group>

          <Button variant="primary" type="submit" className='submit' onClick={handleSubmit}>
            Submit
          </Button>
          <p className='mt-3 text'>Don't have an account <span> <NavLink to="/">Signup</NavLink></span></p>
        </Form>
      </div>
    </div>
  )
}


export default SignIn