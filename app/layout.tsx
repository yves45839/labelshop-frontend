// app/layout.jsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
