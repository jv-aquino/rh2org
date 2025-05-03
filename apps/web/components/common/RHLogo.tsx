import Image from "next/image";
import clsx from "clsx";

function RHLogo({ className, imgWidth, imgHeight, imgClassName }: { 
  className?: string, 
  imgWidth?: number, 
  imgHeight?: number, 
  imgClassName?: string 
}) {
  return ( 
    <p className={clsx("font-sansation text-green-700 flex items-center justify-between", className)}>
      R<span className="text-lightBlue">H</span>
        <Image src={'/icons/gota.png'} alt="" width={imgWidth ?? 16} height={imgHeight ?? 29} className={imgClassName}  />
        <span className="text-lightBlue">O</span>rg
    </p>
   );
}

export default RHLogo;