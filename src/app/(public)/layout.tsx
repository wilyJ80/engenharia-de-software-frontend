
import Menu from "@/components/MenuLateral/Menu";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
        <div
          className="w-[400px] flex flex-col items-center"
          style={{
            boxShadow: "2px 0 3px rgba(0, 0, 0, .4)"
          }}
        >
          <img src="/logo.png" className="w-[65%]" alt="Logo" />
          <Menu />
        </div>

        <div className="p-4 w-full">
          {children}
        </div>
   </>
  );
}
