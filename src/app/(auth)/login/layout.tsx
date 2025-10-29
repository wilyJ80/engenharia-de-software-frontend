import Image from "next/image";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full gap-2">
        <div className="w-1/2 flex flex-col items-center justify-center border-r-2 border-azul-escuro">
                <Image
                  src="/logo.png"
                  alt="Logo GPS SuperA"
                  width={350}
                  height={350}
                  className="object-contain"
                />
              </div>

        {children}
        </div>
  );
}
