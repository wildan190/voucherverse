export function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-6 shadow-inner">
      <div className="container mx-auto px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Latsubnet. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
