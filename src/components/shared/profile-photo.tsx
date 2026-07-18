import Image from "next/image";

export function ProfilePhoto({
  alt,
  className = "size-28",
  priority = false,
}: {
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`${className} relative overflow-hidden rounded-full ring-2 ring-indigo-400/40 shadow-lg shadow-indigo-500/20`}
    >
      <Image
        src="/profile.jpg"
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 160px, 200px"
        className="object-cover"
      />
    </div>
  );
}
