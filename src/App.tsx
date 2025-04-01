import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load detail components for better performance
const CourseDetails = lazy(() => import("./components/CourseDetails"));
const TestDetails = lazy(() => import("./components/TestDetails"));
const ClassDetails = lazy(() => import("./components/ClassDetails"));
const AllCourses = lazy(() => import("./components/AllCourses"));
const AllTests = lazy(() => import("./components/AllTests"));
const ClassSchedule = lazy(() => import("./components/ClassSchedule"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/test/:testId" element={<TestDetails />} />
          <Route path="/class/:classId" element={<ClassDetails />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/tests" element={<AllTests />} />
          <Route path="/schedule" element={<ClassSchedule />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
