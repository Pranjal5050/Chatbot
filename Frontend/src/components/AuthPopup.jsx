function AuthPopup({ onClose }) {

  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

      <div className="bg-slate-900 p-6 rounded-xl w-80 text-center">

        <h2 className="text-white text-xl mb-4">
          Login Required
        </h2>

        <p className="text-gray-400 mb-4">
          Please login or signup to continue chatting.
        </p>

        <button
          onClick={onClose}
          className="bg-indigo-600 px-4 py-2 rounded text-white"
        >
          Close
        </button>

      </div>

    </div>

  )

}

export default AuthPopup