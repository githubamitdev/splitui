import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UI from '../components/Container/SplitUI/UI';

export const RouteComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UI />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteComponent;
