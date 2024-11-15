import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

interface AllergenButtonProps {
  src: string;
  alt: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  scale?: number;
}

export function AllergenButton({
  src,
  alt,
  label,
  selected,
  onClick,
  scale = 1,
}: AllergenButtonProps) {
  const baseHeight = 96;
  const baseWidth = 96;
  const baseImageSize = 40;

  return (
    <Button
      className={cn(
        "flex flex-col items-center bg-white text-black gap-2 p-4 border rounded-lg cursor-pointer transition-colors duration-200",
        selected ? "bg-primary" : ""
      )}
      onClick={onClick}
      style={{
        height: baseHeight * scale,
        width: baseWidth * scale,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={baseImageSize * scale}
        height={baseImageSize * scale}
      />
      <span className="text-xs text-center">{label}</span>
    </Button>
  );
}
