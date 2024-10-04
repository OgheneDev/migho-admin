import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const SignUpPage = () => {

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();


   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log({
        name,
        email,
        password,
        role: 'admin'
      });
      
      const response = await axios.post('https://migho-backend.onrender.com/v1/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        name: name, 
        email: email,
        password: password,
        role: 'admin'  
      })
      console.log(response.data)
      navigate(-1)
    } catch (error) {
      console.log(error.response.data)
    }
    setLoading(false);
   }

  return (
    <div className="form-container flex flex-col md:flex-row w-full">
      <div className="welcome bg-custom-orange w-full md:w-1/2 p-8 flex flex-col justify-center text-center h-auto md:h-screen hidden md:block md:flex">
        <article>
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-5">Welcome Back!</h1>
          <p className="text-base md:text-lg text-white mb-7">
            To get connected, please login with <br />
            your admin details.
          </p>
        </article>
      </div>

      <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-12 flex flex-col justify-center h-auto md:h-screen text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-7">Create Account</h1>
        <p className="text-base md:text-lg text-custom-grey mb-5">Use your email for registration</p>
        <div className="inputs mt-4">
          <input
           type="text"
            placeholder="Username"
            name='username'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 md:p-5 mb-4 border border-gray-300 rounded bg-custom-ash placeholder:text-custom-grey " />
          <input 
           type="email"
           placeholder="Email"
           value={email}
           name='email'
           onChange={(e) => setEmail(e.target.value)}
           className="w-full p-4 md:p-5 mb-4 border border-gray-300 rounded bg-custom-ash placeholder:text-custom-grey"  />
          <input
            type="password"
            placeholder="Password"
            value={password}
            name='password'
            onChange={(e) => setPassword(e.target.value)}
             className="w-full p-4 md:p-5 mb-4 border border-gray-300 rounded bg-custom-ash placeholder:text-custom-grey" />
        </div>

        <button type='submit' className="btn-sign mt-5 bg-custom-orange font-sans w-full md:w-fit mx-auto px-10 py-3 rounded-full text-white uppercase ">
        {loading ? <ClipLoader size={20} color='fff' /> : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;




