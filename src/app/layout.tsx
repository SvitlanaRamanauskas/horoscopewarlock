const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body style={{ margin: "0" }}>
        <header>
          <h1>Гороскопи</h1>
        </header>

        {children}

        <footer>
          <p>© 2023 Гороскопи</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
