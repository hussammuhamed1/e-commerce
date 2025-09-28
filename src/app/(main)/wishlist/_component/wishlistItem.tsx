import { Button } from "@/components/ui/button";

interface WishlistItemProps {
    item: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
}

export default function WishlistItem({ item }: WishlistItemProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
                <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p>{item.price} EGP</p>
                </div>
            </div>
            <Button variant="destructive">Remove</Button>
        </div>
    );
}
