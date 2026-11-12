import { Suspense } from 'react';
import { Dashboard } from './Dashboard';
import { RealTimeProvider } from '@/components/RealTimeProvider';

export default function Page() {
  return (
    <RealTimeProvider>
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando dashboard...</p>
          </div>
        </div>
      </Suspense>
      <Dashboard />
    </RealTimeProvider>
  );
}

export default Page;