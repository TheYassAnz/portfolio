import Button from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="h-15 flex justify-between items-center md:px-8 px-4 max-w-7xl mx-auto">
      <span className="text-lg font-semibold">Yassine ANZAR BASHA</span>
      {/* CTA */}
      <Button label="Book a call" />
    </nav>
  );
}
