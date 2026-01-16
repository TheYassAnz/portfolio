import Image from "next/image";

export default function ServiceCard({
  title,
  description,
  imageUrl,
  ctaLabel,
  ctaHref,
}: {
  title?: string;
  description?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="grid grid-cols-3 items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-center">
        <Image
          alt={title ?? "Service"}
          src={imageUrl ?? ""}
          width={100}
          height={100}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="col-span-2">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
