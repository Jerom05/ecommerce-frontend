import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold">
          Welcome to Rigel
        </h1>
      </div>
    </div>
  );
}
