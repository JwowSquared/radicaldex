import { PageController } from "./PageController";

export default function App({ database }) {
  return (
  <>
    <PageController database={database} />
  </>
  )
}