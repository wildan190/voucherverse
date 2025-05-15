export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground text-center py-6 border-t border-border">
      <div className="container mx-auto px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Latsubnet. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
