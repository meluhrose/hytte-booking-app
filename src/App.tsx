import { ApiConfigProvider } from './context/ApiConfigProvider';
import { CabinList } from './components/Cabin';
import { KontaktForm } from './components/KontaktOss';

function App() {
  return (
    <ApiConfigProvider baseUrl="https://api.example.com">
      <CabinList />
      <KontaktForm />
    </ApiConfigProvider>
  );
}

export default App;