interface StockIndicatorProps {
  availableForSale: boolean;
}

export default function StockIndicator({ availableForSale }: StockIndicatorProps) {
  if (availableForSale) {
    return (
      <span className="inline-flex items-center text-green-600 font-medium" role="status" aria-live="polite">
        <svg
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        In Stock
      </span>
    );
  }

  return (
    <span className="inline-flex items-center text-red-600 font-medium" role="status" aria-live="polite">
      <svg
        className="w-5 h-5 mr-2"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
      Out of Stock
    </span>
  );
}
