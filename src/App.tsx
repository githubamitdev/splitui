import { Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import './App.css';
import { RouteComponent } from './Routes';

function App() {
  return (
    <div className="App">
      <Grommet theme={hpe} full>
        <RouteComponent />
      </Grommet>
    </div>
  );
}

export default App;
