import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors closeButton />
    </>
  )
}

export default App
