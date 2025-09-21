import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Тут будет лендинг</h1>
      <Link href="/organizations" className="underline">Перейти на /organizations</Link>
    </div>
  );
}
