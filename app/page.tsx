// app/page.tsx
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur Labelshop</h1>
      <p>
        Visitez la{' '}
        <a href="/products" className="text-blue-500 underline">
          liste des produits
        </a>
        .
      </p>
    </main>
  );
}
