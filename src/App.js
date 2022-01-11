// import logo from './logo.svg';
import './App.css';
// import LoadingSpinner from './components/LoadingSpinner';
import NavBar from './components/NavBar';
import NewsComponent from './components/NewsComponent';
// import LoadingBar from 'react-top-loading-bar'

// setProgress(progress){



function App() {
  // this.state = {
  //   progress: progress
  // }
  return (
    <div div >
      <NavBar />
      {/* <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      /> */}
      <div className="container my-3"><NewsComponent category="business" /></div>
    </div>
  );
}

export default App;
