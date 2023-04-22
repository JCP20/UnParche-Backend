//import App from "./app";
import App from "./app"

const port = process.env.PORT || 4000;
const app = new App(port);

app.start();