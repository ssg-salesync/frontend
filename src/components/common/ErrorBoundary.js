import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InternalErrorPage from '../../pages/InternalErrorPage';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStatusCode = () => {
      const statusCode = 500;
      if (statusCode === 500) {
        setHasError(true);
        // 500 에러가 발생하면 '/internalerror' 페이지로 라우팅
        navigate('/internalerror');
      }
    };

    // 화면 랜더링 시 상태 코드 체크
    handleStatusCode();
  }, [navigate]);

  if (hasError) {
    // 에러가 발생한 경우, 여기에서 라우팅을 처리했으므로 특별히 렌더링할 내용은 없습니다.
    return <InternalErrorPage />;
  }

  return children;
};

export default ErrorBoundary;