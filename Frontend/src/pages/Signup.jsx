import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const res = await axios.post(
      "http://localhost:5000/api/auth/signup",
      form
    )

    localStorage.setItem("token", res.data.token)

    navigate("/")

  }

  return (

    <div className="h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-80"
      >

        <h2 className="text-xl mb-4">Signup</h2>

        <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <button className="bg-black text-white w-full p-2">
          Signup
        </button>

      </form>

    </div>

  )

}

export default Signup