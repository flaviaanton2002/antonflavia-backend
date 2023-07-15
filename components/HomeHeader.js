import { useSession } from "next-auth/react";

export default function HomeHeader() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between">
      <h2 className="my-0">
        <div className="flex items-center gap-2">
          <img
            alt=""
            src={session?.user?.image}
            className="w-6 h-6 rounded-lg md:hidden"
          />
          <div>
            Salut, <b>{session?.user?.name}</b>!
          </div>
        </div>
      </h2>
      <div className="hidden md:block">
        <div className="bg-myWhite flex gap-2 text-gray-500 rounded-lg overflow-hidden h-full items-center shadow-lg">
          <img alt="" src={session?.user?.image} className="w-7 h-7" />
          <span className="pr-2">{session?.user?.name}</span>
        </div>
      </div>
    </div>
  );
}
