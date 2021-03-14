import '@/styles/global.css';
import 'antd/dist/antd.css';
import { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default App;
