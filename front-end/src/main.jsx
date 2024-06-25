import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RouterProvider from './routes';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MyContextProvider } from './components/context';
const queryClient = new QueryClient();
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MyContextProvider>
        <RouterProvider />
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer></ToastContainer>
      </MyContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
