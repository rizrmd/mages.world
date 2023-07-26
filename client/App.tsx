import { Prasi } from "./prasi";
import * as props from "./exports";
import "./prasi/index.css";

function App() {
  return (
    <>
      <Prasi
        notfound={
          <div className="flex h-screen flex-1 items-center justify-center">
            ...
          </div>
        }
        loading={
          <div className="flex h-screen flex-1 items-center justify-center">
            Now Loading ...
          </div>
        }
        live={{
          site_id: "0da219da-7a2e-4dcc-b7a7-687549aa7a9d",
          pathname: location.pathname,
        }}
        props={props}
      />
    </>
  );
}

export default App;
