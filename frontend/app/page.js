import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            Welcome to{' '}
            <span className="text-primary-600">
              TaskFlow
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your ultimate task management solution. Organize, prioritize, and
            accomplish your goals with ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-[#3399FF] text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 hover:shadow-lg transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-white text-gray-900 border-2 border-gray-300 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-10 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-primary-300 transition-all duration-300">
            <div className="text-5xl mb-6" role="img" aria-label="Task creation">
              📝
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Easy Task Creation
            </h3>
            <p className="text-gray-700 leading-relaxed text-base">
              Create and manage tasks with a simple and intuitive interface
            </p>
          </div>

          <div className="bg-white p-10 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-primary-300 transition-all duration-300">
            <div className="text-5xl mb-6" role="img" aria-label="Priority management">
              🎯
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Priority Management
            </h3>
            <p className="text-gray-700 leading-relaxed text-base">
              Set priorities and track progress to stay on top of your work
            </p>
          </div>

          <div className="bg-white p-10 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-primary-300 transition-all duration-300">
            <div className="text-5xl mb-6" role="img" aria-label="Security">
              🔒
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Secure & Private
            </h3>
            <p className="text-gray-700 leading-relaxed text-base">
              Your data is encrypted and protected with industry-standard
              security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}