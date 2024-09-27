import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignInPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://migho-backend.onrender.com/v1/api/admin/auth/login', {
        email: email,
        password: password,
      });
  
      // Access the token from the nested structure
      const token = response.data?.data?.tokens?.accessToken;
  
      if (token) {
        // Store the token in localStorage
        localStorage.setItem('authToken', token);
  
        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        console.error('Access token not found in response');
      }
  
      console.log("Token:", token);  // Optional: Log token to verify
  
    } catch (error) {
      console.log("Error during login:", error.response);
    }
  };
  
  
  

  return (
    <div className='form-container flex flex-col-reverse w-full md:flex-row-reverse md:h-screen'>
      <form onSubmit={handleSubmit} className='p-10 flex flex-col justify-center md:w-1/2'>
        <h1 className='font-bold text-3xl md:text-4xl text-center mb-5 font-league'>Sign In</h1>
        <p className='text-base text-center md:text-lg mb-7 text-custom-grey'>or use your  account</p>

        <div className="inputs flex flex-col">
            <input
             type="email"
              className='bg-custom-ash p-4 rounded mb-5 placeholder:text-custom-grey'
               placeholder='Email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
            <input 
            type="password" 
            className='bg-custom-ash p-4 rounded mb-5 placeholder:text-custom-grey' 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
       <Link to='/password-reset' className='ml-auto text-custom-grey mb-10 underline decoration-custom-orange '>Forgot Password?</Link>
       <button type='submit' className='bg-custom-orange text-white px-10 py-3 w-full font-sans uppercase rounded-full md:w-fit mx-auto' >Sign In</button>
      </form>

      <div className="welcome bg-custom-orange text-white text-center w-full p-8 h-auto flex flex-col justify-center md:w-1/2 hidden md:block md:flex">
        <article>
          <h1 className='font-bold text-3xl md:text-4xl mb-5 font-league'>Hello, Admin!</h1>
          <p className='mb-7 font-sans md:text-lg'>Enter your administrator details to start <br />
          and manage your site.</p>
        </article>
        <Link to='/'><button  className='btn-sign mt-4 text-white rounded-full font-sans border-2 border-white w-full md:w-fit px-10 uppercase py-2 mx-auto '> Sign Up</button></Link>
      </div>
    </div>
  )
}

export default SignInPage
