import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "./context/authprovider";
export const metadata = {
  title: "Next.js App",
  description: "A simple Next.js app with Bootstrap styling",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <div className="container mt-4">{children}</div>
          <Footer></Footer>
        </AuthProvider>
      </body>
    </html>
  );
}

// import Header from "@/components/header";
// import Footer from "@/components/footer";
// export default function RootLayout({ children }) {
//   return (
//     <html>
//       <body>
//         <div>
//           <Header />
//           {children}
//           <button className="btn btn-primary">{process.env.DB_HOST}</button>
//           <Footer />
//         </div>
//       </body>
//     </html>
//   );
// }
