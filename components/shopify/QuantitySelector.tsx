interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  max?: number;
  min?: number;
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  max = 99,
  min = 1,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="mb-6">
      <label htmlFor="quantity" className="block font-bold mb-2 text-sm">
        Quantity
      </label>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= min}
          className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease quantity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          className="w-16 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Quantity"
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= max}
          className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Increase quantity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
