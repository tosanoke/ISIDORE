import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";

const uri = process.env.REACT_APP_BASE_URL;
const cache = new InMemoryCache();

const client = new ApolloClient({ uri, cache, connectToDevTools: true });

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/create"} element={<CreateUser />} />
          <Route path={"/edit/:id"} element={<EditUser />} />

        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
