import Image from "next/image";
import x from "@/assets/x.png";
import o from "@/assets/o.png";

interface GridItemProps {
	state: int;
	location: [int, int];
	handleClick: (location: [int, int]) => void;
}

export default function GridItem({
	state,
	location,
	handleClick,
}: GridItemProps) {
	return (
		<button onClick={() => handleClick(location)}>
			<div className="w-64 h-64 border border-gray-300 flex items-center justify-center">
				{state === 0 ? (
					" "
				) : state === 1 ? (
					<Image priority src={x} width={100} height={100} alt={""} />
				) : (
					<Image priority src={o} width={100} height={100} alt={""} />
				)}
			</div>
		</button>
	);
}
