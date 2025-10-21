import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fromVerification = params.get('from');

    if (fromVerification !== 'verification') {
      // If accessed directly without ?from=verification, redirect home
      navigate('/', { replace: true });
      return;
    }

   if (countdown === 0) {
      navigate('/login', { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [location, navigate]);

  return (
    <div>
      <h1>Account Verified Successfully!</h1>
      <p>You can now log in.</p>
    </div>
  );
};

export default VerificationSuccess;
