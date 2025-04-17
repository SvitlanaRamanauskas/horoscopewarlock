import './styles/global.scss';
import { HoroscopeProvider } from './appcontext/horoscopeContext';
import { Suspense } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body style={{ margin: '0' }}>
        <HoroscopeProvider>
          <Header />
          <main>
            <Suspense fallback={<div>Завантаження...</div>}>
              <Home />
            </Suspense>
            <div>{children}</div>
          </main>
          <Footer />
        </HoroscopeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
