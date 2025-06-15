import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/";
import { RootLayout } from "./layouts/RootLayout";
import { CoinDetails } from "./pages/CoinDetails/";

const App = () =>  (
  <Routes>
    <Route element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<CoinDetails />} />
    </Route>
  </Routes>
);

export default App;
