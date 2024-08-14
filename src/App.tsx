import UploadFile from "./components/UploadFile";
import {Toaster} from "sonner"

export default function App() {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <UploadFile />
      <Toaster />
    </main>
  )
}
