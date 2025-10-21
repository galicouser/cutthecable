import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerificationFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [coutdown, setCountdown] = useState(5);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fromVerification = params.get('from');

    if (fromVerification !== 'verification') {
      navigate('/', { replace: true });
    }

    if (countdown === 0) {
      navigate('/', { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [location, navigate]);

  return (
    <div>
      <h1>Verification Failed</h1>
      <p>The verification link is invalid or expired.</p>
    </div>
  );
};

export default VerificationFailed;