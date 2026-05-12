import DashboardLayout from "./layouts/DashboardLayout";
import Footer from "./pages/Footer";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <DashboardLayout />
      <Footer />
    </ThemeProvider>
  );
}

export default App;