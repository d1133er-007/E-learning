import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./components/Dashboard";

// Lazy load detail components for better performance
const CourseDetails = lazy(() => import("./components/CourseDetails"));
const TestDetails = lazy(() => import("./components/TestDetails"));
const ClassDetails = lazy(() => import("./components/ClassDetails"));
const AllCourses = lazy(() => import("./components/AllCourses"));
const AllTests = lazy(() => import("./components/AllTests"));
const ClassSchedule = lazy(() => import("./components/ClassSchedule"));

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  const { user, loading } = useAuth();

  // Add tempo routes for development
  const tempoRoutesElement =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={!user ? <AuthPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={!user ? <AuthPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/course/:courseId"
          element={
            <ProtectedRoute>
              <Suspense fallback={<p>Loading...</p>}>
                <CourseDetails />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/test/:testId"
          element={
            <ProtectedRoute>
              <Suspense fallback={<p>Loading...</p>}>
                <TestDetails />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/class/:classId"
          element={
            <ProtectedRoute>
              <Suspense fallback={<p>Loading...</p>}>
                <ClassDetails />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Suspense fallback={<p>Loading...</p>}>
                <AllCourses />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tests"
          element={
            <ProtectedRoute>
              <Suspense fallback={<p>Loading...</p>}>
                <AllTests />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <Suspense fallback={<p>Loading...</p>}>
                <ClassSchedule />
              </Suspense>
            </ProtectedRoute>
          }
        />
        {/* Add this before the catchall route for Tempo */}
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {tempoRoutesElement}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <AppRoutes />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
