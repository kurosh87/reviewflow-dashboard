import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl w-full p-8">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ReviewFlow Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Enterprise admin dashboard for WordPress ReviewFlow plugin
          </p>

          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
            >
              Open Dashboard →
            </Link>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">75%</div>
                <div className="text-sm text-gray-600">Security Score</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-600">25+</div>
                <div className="text-sm text-gray-600">Security Tests</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">147</div>
                <div className="text-sm text-gray-600">Files</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Powered by Next.js • Deployed on Vercel • Connected to WordPress
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
