import './App.css'
// import GlobalStyle from './styles/GlobalStyle';
// import { Reset } from "styled-reset"
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Routing from './routes/Routing';

function App() {
  return (
    <>
      {/* <Reset/> */}
      {/* <GlobalStyle/>  */}
      <Header/>
      <main>
        <div>
          <Routing/>
        </div>
      </main>
      <Footer/>    
    </>
  );
};
export default App;
