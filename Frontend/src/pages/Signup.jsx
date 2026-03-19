// import { useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"

// const Signup = () => {

//   const navigate = useNavigate()

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   })

//   const handleChange = (e) => {

//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     })

//   }

//   const handleSubmit = async (e) => {

//     e.preventDefault()

//     const res = await axios.post(
//       "http://localhost:5000/api/auth/signup",
//       form
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

//         <h2 className="text-xl mb-4">Signup</h2>

//         <input
//           name="name"
//           placeholder="Name"
//           className="border p-2 w-full mb-3"
//           onChange={handleChange}
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           className="border p-2 w-full mb-3"
//           onChange={handleChange}
//         />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full mb-3"
//           onChange={handleChange}
//         />

//         <button className="bg-black text-white w-full p-2">
//           Signup
//         </button>

//       </form>

//     </div>

//   )

// }

// export default Signup







import { useState } from "react"
import { Link } from "react-router-dom"

const Signup = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, email, password })
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">

      <div className="w-full max-w-md">

        {/* Top Wave */}
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-t-3xl p-10 text-center relative overflow-hidden">

          {/* Logo */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
            className="w-16 mx-auto mb-4"
          />

          <h1 className="text-white text-2xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Join our AI assistant
          </p>

        </div>

        {/* Form */}
        <div className="bg-[#020617] p-8 rounded-b-3xl shadow-xl">

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white outline-none"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white outline-none"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white outline-none"
            />

            {/* Button */}
            <button
              className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg mt-2"
            >
              Sign Up
            </button>

          </form>

          {/* Login link */}
          <p className="text-gray-400 text-sm text-center mt-5">

            Already have an account?{" "}
            <Link to="/login" className="text-white underline">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  )

}

export default Signup