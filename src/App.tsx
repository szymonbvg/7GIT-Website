import AuthWrapper from "./components/Auth/AuthWrapper";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <AuthWrapper>
      <NavBar />
      <Home />
    </AuthWrapper>
  );
}

export default App;
