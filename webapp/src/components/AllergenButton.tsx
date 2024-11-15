import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

interface AllergenButtonProps {
  src: string;
  alt: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function AllergenButton({
  src,
  alt,
  label,
  selected,
  onClick,
}: AllergenButtonProps) {
  return (
    <Button
      className={cn(
        "flex flex-col items-center bg-white text-black h-24 w-24 gap-2 p-4 border rounded-lg cursor-pointer transition-colors duration-200",
        selected ? "bg-primary" : ""
      )}
      onClick={onClick}
    >
      <Image src={src} alt={alt} width={40} height={40} />
      <span className="text-xs text-center">{label}</span>
    </Button>
  );
}
