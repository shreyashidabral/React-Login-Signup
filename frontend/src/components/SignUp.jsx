import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiMail } from 'react-icons/hi'
import { BsFillLockFill, BsFillPersonFill } from 'react-icons/bs'
import { MdDateRange } from 'react-icons/md'
import { useState } from 'react'
import axios from 'axios'

import "../styles/LoginSignup.css"

const SignUp = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    date: "",
    email: "",
    password: ""
  })

  const [data, setData] = useState([])
  const navigate = useNavigate()

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
    const { name, date, email, password } = inputValues

    if (name === "" || date === "" || email === "" || password === "") {
      alert("All fields are required")
    } else if (!email.includes("@")) {
      alert("Please enter valid email address")
    } else {
      setData(JSON.parse(localStorage.getItem("users")))
      localStorage.setItem('users', JSON.stringify([...data, inputValues]))
      axios.post('http://localhost:3008/api/signup', inputValues)
        .then(res => {
          console.log(res);
          navigate('/signin')
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="header-text"> Sign Up </div>
        <div className="underline"></div>
      </div>
      <div>
        <Form>
          <Form.Group className="mb-3 input" controlId="formBasicEmail">
            <BsFillPersonFill className='icons' />
            <Form.Control type="text" name='name' placeholder="Name" onChange={getValues} required />
          </Form.Group>

          <Form.Group className="mb-3 input" controlId="formBasicPassword">
            <MdDateRange className='icons' />
            <Form.Control type="date" name='date' placeholder='Date of Birth' onChange={getValues} required />
          </Form.Group>

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
        </Form>
        <p className='mt-3 text'>Already have an account <span> <NavLink to="/signin">SignIn</NavLink></span></p>
      </div>
    </div>
  )
}

export default SignUp