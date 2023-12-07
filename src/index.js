import React from "react"; // React로 작성한 코드를 브라우저가 읽을 수 있도록 변환
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);