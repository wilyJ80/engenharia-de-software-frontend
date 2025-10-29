import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      Teste das cores

      <div className="w-3 h-3 rounded-md bg-azul-claro" />
      <div className="w-3 h-3 rounded-md bg-azul-escuro" />
      <div className="w-3 h-3 rounded-md bg-red-500" />

    </div>
  );
}
