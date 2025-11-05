
import Menu from "@/components/MenuLateral/Menu";
import { Header } from "@/components/ui/header";
import UserProvider from "@/core/providers/UserProvider";
import { User } from "lucide-react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <>
      <div
        className="w-[400px] h-full flex flex-col items-center"
        style={{
          boxShadow: "2px 0 3px rgba(0, 0, 0, .4)"
        }}
      >
        <img src="/logo.png" className="w-[65%]" alt="Logo" />
        <Menu />
      </div>

      <div className="w-full flex-col flex">
        <Header />
        <div className="p-4 w-full overflow-y-scroll">
          {children}
        </div>
      </div>
   </>
  );
}
