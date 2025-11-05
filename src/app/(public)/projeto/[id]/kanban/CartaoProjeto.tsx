import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Cartao } from "@/core/interface/Cartao";
import { StatusProjeto } from "@/core/constants/StatusProjeto";

export default function CartaoProjeto({ cartao, containerId }: { cartao: Cartao, containerId: StatusProjeto }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: String(cartao.id),
    data: {
      type: "cartao",
      containerId, // <---- ESSENCIAL
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-md shadow p-3 cursor-grab"
    >
      <h3 className="font-semibold">{cartao.descricao}</h3>
      <p className="text-sm text-gray-500">{cartao.created_at}</p>
    </div>
  );
}
