import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [state, setState] = useState("Login");
  const { backendUrl, token, setToken } = useContext(AppContext)

  const [ first_name, setFirst_name ] = useState('')
  const [ last_name, setLast_name ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (state === 'Create Account') {
        const response = await axios.post(backendUrl + '/api/user/createaccount', {first_name, last_name, email, password})
        
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          console.error(response.data.message)
        }
      }
      
    } catch (error) {
      
    }
  }

  return (
    <div className="bg-black w-full h-screen text-white grid grid-cols-1 md:grid-cols-2">
      <img src={assets.header} className="h-screen" />
      <div className="flex flex-col items-center py-20 px-10 gap-10">
        <img src={assets.logo} className="w-50" />

        {state === "Login" ? (
  <form className="flex flex-col gap-10 w-full">
    <div className="flex flex-col gap-5 w-full">
      <label htmlFor="email" className="text-xl flex flex-col items-center w-full">
        Email:
        <input
          className="outline-2 outline-[#FF0036] p-2 px-5 rounded-md text-base block mt-2 text-center w-full"
          id="email"
          type="email"
          placeholder="example@mail.com"
        />
      </label>

      <label htmlFor="password" className="text-xl flex flex-col items-center w-full">
        Password:
        <input
          className="outline-2 outline-[#FF0036] p-2 px-5 rounded-md text-base block mt-2 text-center w-full"
          id="password"
          type="password"
          placeholder="* * * * * * *"
        />
      </label>
    </div>

    <div className="flex flex-col gap-2 items-center">
  <button className="bg-linear-to-b from-[#FF0036] to-[#321234] p-2 rounded-md outline-2 outline-[#FF0036] w-80">
    {state}
  </button>
  <p onClick={() => setState(state === "Login" ? "Create Account" : "Login")} 
     className="underline text-sm cursor-pointer text-center">
    {state === "Login" ? "Not already a user? Create an account" : "Already have an account? Login"}
  </p>
</div>
  </form>
) : (
  <form onSubmit={onSubmitHandler} className="flex flex-col gap-10 w-full">
    <div className="flex flex-col gap-5 w-full">
      <div className="flex gap-5 w-full">
        <label htmlFor="firstname" className="text-xl flex flex-col items-center w-full">
          First Name:
          <input
            onChange={ (e) => setFirst_name(e.target.value)}
            value={first_name}
            className="outline-2 outline-[#FF0036] p-2 px-5 rounded-md text-base block mt-2 text-center w-full"
            id="firstname"
            type="text"
            placeholder="Jane"
          />
        </label>
        <label htmlFor="lastname" className="text-xl flex flex-col items-center w-full">
          Last Name:
          <input
          onChange={ (e) => setLast_name(e.target.value)}
          value={last_name}
            className="outline-2 outline-[#FF0036] p-2 px-5 rounded-md text-base block mt-2 text-center w-full"
            id="lastname"
            type="text"
            placeholder="Doe"
          />
        </label>
      </div>

      <label htmlFor="email" className="text-xl flex flex-col items-center w-full">
        Email:
        <input
          onChange={ (e) => setEmail(e.target.value)}
          value={email}
          className="outline-2 outline-[#FF0036] p-2 px-5 rounded-md text-base block mt-2 text-center w-full"
          id="email"
          type="email"
          placeholder="example@mail.com"
        />
      </label>

      <label htmlFor="password" className="text-xl flex flex-col items-center w-full">
        Password:
        <input
          onChange={ (e) => setPassword(e.target.value)}
          value={password}
          className="outline-2 outline-[#FF0036] p-2 px-5 rounded-md text-base block mt-2 text-center w-full"
          id="password"
          type="password"
          placeholder="* * * * * * *"
        />
      </label>
    </div>

    <div className="flex flex-col gap-2 items-center">
  <button className="bg-linear-to-b from-[#FF0036] to-[#321234] p-2 rounded-md w-80 outline-2 outline-[#FF0036]">
    {state}
  </button>
  <p onClick={() => setState(state === "Login" ? "Create Account" : "Login")} 
     className="underline text-sm cursor-pointer text-center">
    {state === "Login" ? "Not already a user? Create an account" : "Already have an account? Login"}
  </p>
</div>
  </form>
)}
        
      </div>
    </div>
  );
};

export default Login;
