import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplitUI from '../components/Container/SplitUI/SplitUI';

export const RouteComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplitUI />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteComponent;
