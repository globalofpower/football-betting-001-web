import { withLoader } from "./loadable";


// main
export const BodyPage = withLoader(() => import("@/pages/BodyPage"));
export const ParlayPage = withLoader(() => import("@/pages/ParlayPage"));