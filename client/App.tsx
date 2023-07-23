import { Prasi } from "./prasi";
import * as props from "./exports";

function App() {
  return (
    <>
      <Prasi
        notfound={<div>--NOT FOUND--</div>}
        loading={<div>--LOADING--</div>}
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
