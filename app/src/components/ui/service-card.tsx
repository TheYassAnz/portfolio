import Image from "next/image";

export default function ServiceCard({
  title,
  description,
  imageUrl,
}: {
  title?: string;
  description?: string;
  imageUrl?: string;
}) {
  return (
    <div className="grid grid-cols-3 items-center border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center">
        <Image
          alt="Services"
          src={imageUrl ?? ""}
          width={100}
          height={100}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
