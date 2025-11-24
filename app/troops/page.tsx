import TroopsGrid from '@/components/TroopsTable';

export default function TroopsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Army Troops
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Kelola dan lihat semua pasukan Anda
        </p>
        <TroopsGrid />
      </div>
    </div>
  );
}