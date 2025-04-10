import HomePage from "./components/Home";
import { HoroscopeProvider } from "./Context/horoscopeContext";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body style={{ margin: "0" }}>
        <HoroscopeProvider>
          <header>
            <h1>Гороскопи</h1>
          </header>
            <main>
              <div className="w-1/2 p-4 border-r">
                <HomePage />
              </div>
              <div className="w-1/2 p-4">
                {children}
              </div>
            </main>
          <footer>
            <p>© 2023 Гороскопи</p>
          </footer>
        </HoroscopeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
