import { createRoot } from "react-dom/client"
import { Route, Router } from "wouter"
import { Splash } from "./views/Splash"

createRoot(document.getElementById("root")!).render(
    <Router>
        <Route path="/" component={Splash} />
    </Router>
)
