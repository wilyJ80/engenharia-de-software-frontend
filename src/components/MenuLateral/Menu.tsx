import MenuItem from "../MenuItem/MenuItem";

export default function Menu() {
    return (
        <div className="w-full h-full p-4 flex flex-col items-center">
            <div
                className="
                    flex flex-col items-center
                    bg-azul-escuro w-[85%] h-[500px]
                    rounded-xl px-4 py-6 gap-3
                "
                style={{
                    boxShadow: "0 0 10px rgba(0, 0, 0, .5)"
                }}
            >
                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <MenuItem key={index}>
                            <p>Home</p>
                        </MenuItem>
                    ))
                }

            </div>
        </div>
    )
}