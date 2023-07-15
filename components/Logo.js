import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="flex justify-center font-bold">
      <span>Administrator</span>
    </Link>
  );
}
