import CategoriesGrid from "./_components/CategoriesGrid";

export default function CategoriesPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <CategoriesGrid apiUrl="https://ecommerce.routemisr.com/api/v1/categories" />
    </main>
  );
}