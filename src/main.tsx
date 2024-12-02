import { createRoot } from "react-dom/client";
import App from "./components/app/App.tsx";
import { Provider } from "react-redux";
import store from "./store.tsx";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>
);
