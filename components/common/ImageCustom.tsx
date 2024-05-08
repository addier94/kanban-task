import Image from "next/image";

interface ImageCustomProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  width?: string | number;
  height?: string | number;
}

export const ImageCustom = ({
  src,
  alt,
  className,
  onClick = () => {},
  width,
  height,
}: ImageCustomProps) => {
  const containerStyles: React.CSSProperties = {
    position: "relative",
    width:
      width !== undefined
        ? typeof width === "number"
          ? `${width}px`
          : width
        : "24px",
    height:
      height !== undefined
        ? typeof height === "number"
          ? `${height}px`
          : height
        : "24px",
  };

  return (
    <div style={containerStyles} className={className} onClick={onClick}>
      <Image src={src} alt={alt} width={0} height={0} className="w-full" />
    </div>
  );
};
