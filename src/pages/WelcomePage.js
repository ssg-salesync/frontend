import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function WelcomePage() {
  const [showSplash, setShowSplash] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      navigate('/login')
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  const splashStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  };

  const splashTextStyle = {
    textAlign: 'center',
    fontFamily: 'Giants-Bold',
    fontSize: '5em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const logoStyle = {
    width: '130%',
    height: '130%',
    transform: 'translate(-5%, -4%)',
    animation: 'fadeIn 1s forwards',
  };

  const colors = ['#2D69C4', '#2D69C4', '#2D69C4', '#2D69C4'];

  const salesyncStyle = {
    color: '#2D69C4',
  };

  return (
    <div style={showSplash ? splashStyle : {}}>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .fadeInItem {
            opacity: 0;
            animation: fadeIn 1s forwards;
          }

          @font-face {
            font-family: 'Giants-Bold';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Giants-Bold.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
          }
        `}
      </style>
      {showSplash ? (
        <div style={splashTextStyle}>
          <img src="/img/Logo2.png" alt="logo" style={logoStyle} />
          {Array.from('Sale').map((char, index) => (
            <div key={index} className="fadeInItem" style={{ animationDelay: `${0.3 * (index + 1)}s`, color: colors[index] }}>
              {char}
            </div>
          ))}
          <div className="fadeInItem" style={{ animationDelay: `${0.3 * (Array.from('Sale').length + 1)}s` }}>
            <span style={salesyncStyle}>sync</span>
          </div>
        </div>
      ) : (
        <div className="main-content">
          {/* <Link to="/login" /> */}
        </div>
      )}
    </div>
  );
};


export default WelcomePage;