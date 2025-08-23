/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";

const Loadable = (Component: React.LazyExoticComponent<any>) => (props: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;