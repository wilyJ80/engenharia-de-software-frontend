import { FormLogin } from "@/components/Login/formLogin";

export default function Page(){
    return <div className="flex flex-col items-center gap-8 w-full h-full p-2 ">
        <h1 className="text-2xl font-bold">Login</h1>
            <FormLogin />
        </div>
}