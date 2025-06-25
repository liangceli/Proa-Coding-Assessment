export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 fixed bottom-0 w-full">
      © {new Date().getFullYear()} Proa Energy. All rights reserved.
    </footer>
  );
}