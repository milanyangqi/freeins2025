import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image }) => {
  return (
    <div className="product-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
      </div>
    </div>
  );
};

export default ProductCard;