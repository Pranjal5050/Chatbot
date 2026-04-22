import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)
    setError("")

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        { name, email, password }
      )

      localStorage.setItem("token", res.data.token)

      navigate("/")

    } catch (err) {

      setError("User ALready Exist")

    }
    setLoading(false)
    setName('');
    setEmail('');
    setPassword('')
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

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              required={true}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white outline-none"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white outline-none"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white outline-none"
            />

            {/* Button */}
            <button
              className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg mt-2"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

          </form>

          {/* Login link */}
          <p className="text-gray-400 text-sm text-center mt-5">

            Already have an account?{" "}
            <Link to="/login" className="text-white underline">
              Login
            </Link>

          </p>
          <p style="font-size:12px; color:gray;">
            Your data is सुरक्षित and used only for authentication purposes.
          </p>

        </div>

      </div>

    </div>

  )

}

export default Signup