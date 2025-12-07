import { useState } from 'react'

function AuthSection() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Overlay Panel - Red Background */}
        <div
          className={`absolute top-0 w-1/2 h-full bg-gradient-to-br from-red-500 to-pink-500 transition-all duration-700 ease-in-out z-10 ${
            isSignUp ? 'left-0' : 'left-1/2'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full text-white px-12">
            {isSignUp ? (
              <>
                <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                <p className="text-center mb-8">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={() => setIsSignUp(false)}
                  className="border-2 border-white text-white px-12 py-3 rounded-full font-semibold hover:bg-white hover:text-red-500 transition-all duration-300"
                >
                  SIGN IN
                </button>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold mb-4">Hello, Friend!</h1>
                <p className="text-center mb-8">
                  Enter your personal details and start journey with us
                </p>
                <button
                  onClick={() => setIsSignUp(true)}
                  className="border-2 border-white text-white px-12 py-3 rounded-full font-semibold hover:bg-white hover:text-red-500 transition-all duration-300"
                >
                  SIGN UP
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex items-center justify-center transition-all duration-700 ease-in-out ${
            isSignUp ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          <div className="w-full px-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sign in</h2>
            
            {/* Social Icons */}
            <div className="flex justify-center gap-4 mb-6">
              <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="text-gray-600">f</span>
              </button>
              <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="text-gray-600">G+</span>
              </button>
              <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="text-gray-600">in</span>
              </button>
            </div>

            <p className="text-gray-500 text-sm text-center mb-6">or use your account</p>

            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <a href="#" className="text-gray-500 text-sm hover:text-red-500 block text-center">
                Forgot your password?
              </a>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>

        {/* Sign Up Form */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full flex items-center justify-center transition-all duration-700 ease-in-out ${
            isSignUp ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          <div className="w-full px-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create Account</h2>
            
            {/* Social Icons */}
            <div className="flex justify-center gap-4 mb-6">
              <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="text-gray-600">f</span>
              </button>
              <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="text-gray-600">G+</span>
              </button>
              <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="text-gray-600">in</span>
              </button>
            </div>

            <p className="text-gray-500 text-sm text-center mb-6">or use your email for registration</p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthSection
