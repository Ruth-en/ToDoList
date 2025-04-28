import { Route, Routes } from "react-router-dom"
import { BacklogView } from "../components/screens/BacklogView/BacklogView"
import { SprintView } from "../components/screens/SprintView/SprintView"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<BacklogView />} ></Route>
        <Route path="/sprint/:sprintId" element={<SprintView />} ></Route>

    </Routes>
  )
}
