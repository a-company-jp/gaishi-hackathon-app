import Image from "next/image";

interface AllergyIconProps {
  src: string;
  alt: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function AllergyIcon({
  src,
  alt,
  label,
  selected,
  onClick,
}: AllergyIconProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
        selected ? "bg-primary text-primary-foreground" : ""
      }`}
      onClick={onClick}
    >
      <Image src={src} alt={alt} width={40} height={40} />
      <span className="text-xs text-center">{label}</span>
    </div>
  );
}
