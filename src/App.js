import './App.css'
// import GlobalStyle from './styles/GlobalStyle';
// import { Reset } from "styled-reset"
import { RecoilRoot } from 'recoil';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Routing from './routes/Routing';

function App() {
  return (
    <>
      {/* <Reset/> /}
      {/ <GlobalStyle/>  /}
      {/ Recoil 사용하기 위한 설정 */}
      <RecoilRoot>
      <Header/>
      <main>
        <div>
          <Routing/>
        </div>
      </main>
      <Footer/>
      </RecoilRoot>
    </>
  );
};
export default App;