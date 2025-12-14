import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import OverlayPanel from './components/OverlayPanel';
import GoldenBridge from '../../assets/GoldenBridge.jpg';

function AuthSection() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setSuccessMessage('');
  };

  const handleSignupSuccess = (message: string) => {
    setSuccessMessage(message);
    setIsSignUp(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundSize: '100% 100%', backgroundImage: `url(${GoldenBridge})` }}
    >
      <div className="relative w-full max-w-5xl h-[600px] bg-gray-200/60 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-300/50">
        
        {/* Success Message */}
        {successMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-green-100 text-green-700 px-6 py-2 rounded-full text-sm">
            {successMessage}
          </div>
        )}

        {/* Login Form - Left Side */}
        <LoginForm isActive={!isSignUp} />

        {/* Signup Form - Right Side */}
        <SignupForm isActive={isSignUp} onSuccess={handleSignupSuccess} />

        {/* Overlay Panel - Sliding */}
        <OverlayPanel isSignUp={isSignUp} onToggle={handleToggle} />
      </div>
    </div>
  );
}

export default AuthSection;
