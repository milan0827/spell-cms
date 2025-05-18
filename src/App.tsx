import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AppRouter from "./routes/routes";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
