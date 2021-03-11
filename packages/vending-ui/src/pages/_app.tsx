import '@/styles/global.css';
import 'antd/dist/antd.css';
import { AppProps } from 'next/app';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
