import "@/app/globals.css";
import Header from "@/components/Header";
import InteractiveLines from "@/components/InteractiveLines";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";

export const metadata = {
  title: "Abhijith M",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description"/>
      </head>
      <body className="relative overflow-x-hidden">
        {/* Optional */}
        <InteractiveLines />
        <Header />
        {/* <StairTransition /> */}
        {/* <PageTransition></PageTransition> */}
        {children}
      </body>
    </html>
  );
}
