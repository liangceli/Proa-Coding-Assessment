export default function Footer() {
  return (
    <footer className="bg-primary-700 text-center text-sm text-primary-100 py-4 fixed bottom-0 w-full">
      © {new Date().getFullYear()} Proa Energy. All rights reserved.
    </footer>
  );
}