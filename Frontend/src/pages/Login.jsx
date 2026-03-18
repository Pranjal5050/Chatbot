// import { useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"

// const Login = () => {

//   const navigate = useNavigate()

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleSubmit = async (e) => {

//     e.preventDefault()

//     const res = await axios.post(
//       "http://localhost:5000/api/auth/login",
//       { email, password }
//     )

//     localStorage.setItem("token", res.data.token)

//     navigate("/")

//   }

//   return (

//     <div className="h-screen flex items-center justify-center">

//       <form
//         onSubmit={handleSubmit}
//         className="border p-6 rounded w-80"
//       >

//         <h2 className="text-xl mb-4">Login</h2>

//         <input
//           placeholder="Email"
//           className="border p-2 w-full mb-3"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full mb-3"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="bg-black text-white w-full p-2">
//           Login
//         </button>

//       </form>

//     </div>

//   )

// }

// export default Login

import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)
    setError("")

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      )

      localStorage.setItem("token", res.data.token)

      navigate("/")

    } catch (err) {

      setError("Invalid email or password")

    }

    setLoading(false)

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">

      <div className="w-full max-w-md">

        {/* Top Section */}
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-t-3xl p-10 text-center">

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
            className="w-16 mx-auto mb-4"
          />

          <h1 className="text-white text-2xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Login to continue chatting
          </p>

        </div>

        {/* Form Section */}
        <div className="bg-[#020617] p-8 rounded-b-3xl shadow-xl">

          <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white outline-none"
            />

            <button
              className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg"
            >

              {loading ? "Logging in..." : "Login"}

            </button>

          </form>

          {/* Signup Link */}
          <p className="text-gray-400 text-sm text-center mt-5">

            Don't have an account?{" "}
            <Link to="/signup" className="text-white underline">
              Sign up
            </Link>

          </p>

        </div>

      </div>

    </div>

  )

}

export default Login