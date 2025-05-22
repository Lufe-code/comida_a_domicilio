import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage: React.FC = () => {
  const handleSuccess = (credentialResponse: any) => {
    localStorage.setItem('google_token', credentialResponse.credential);
    console.log('Google Token:', credentialResponse.credential);
    window.location.href = '/'; // Redirect after login
  };

  const handleError = () => {
    alert('Login Failed');
  };

  React.useEffect(() => {
    const token = localStorage.getItem('google_token');
    if (token) {
      console.log('Google Token:', token);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default LoginPage;