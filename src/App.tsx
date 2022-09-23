import History from "./components/History";
import Translate from "./components/Translate";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <Translate />
      <History />
    </MainLayout>
  );
}

export default App;
