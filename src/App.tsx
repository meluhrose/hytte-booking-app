import { ApiConfigProvider } from './context/ApiConfigProvider';
import { CabinList } from './components/Cabin';

function App() {
  return (
    <ApiConfigProvider baseUrl="https://api.example.com">
      <CabinList />
    </ApiConfigProvider>
  );
}

export default App;