import { RouterProvider } from 'react-router'; // Handles page navigation (e.g., moving from Home -> Aoubt -> Contact)
import { router } from './routes'; //route folder you're providing

export default function App() {
  return <RouterProvider router={router} />;
}
