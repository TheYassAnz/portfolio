export default function FooterSection() {
  return (
    <footer className="mx-auto my-4 flex w-full items-center justify-between rounded-full bg-surface px-6 py-4">
      <span className="text-sm text-muted/50">
        © {new Date().getFullYear()} Yassine ANZAR BASHA
      </span>
      <span className="text-sm text-accent">Full-Stack Developer</span>
    </footer>
  );
}
