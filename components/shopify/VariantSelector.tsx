'use client';

import { ShopifyVariant } from '@/lib/types/shopify';

interface VariantOption {
  name: string;
  values: string[];
}

interface VariantSelectorProps {
  variants: ShopifyVariant[];
  selectedOptions: Record<string, string>;
  onOptionChange: (optionName: string, value: string) => void;
}

export default function VariantSelector({
  variants,
  selectedOptions,
  onOptionChange,
}: VariantSelectorProps) {
  // Extract all unique option names and their values from variants
  const options: VariantOption[] = [];

  variants.forEach((variant) => {
    variant.selectedOptions.forEach((option) => {
      const existingOption = options.find((opt) => opt.name === option.name);
      if (existingOption) {
        if (!existingOption.values.includes(option.value)) {
          existingOption.values.push(option.value);
        }
      } else {
        options.push({
          name: option.name,
          values: [option.value],
        });
      }
    });
  });

  // Helper to check if a specific option value is available given current selections
  const isOptionAvailable = (optionName: string, optionValue: string): boolean => {
    // Create a test selection with this option value
    const testSelection = {
      ...selectedOptions,
      [optionName]: optionValue,
    };

    // Check if any variant matches this combination
    return variants.some((variant) => {
      const matches = variant.selectedOptions.every((opt) => {
        return testSelection[opt.name] === opt.value;
      });
      return matches && variant.availableForSale;
    });
  };

  if (options.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {options.map((option) => (
        <div key={option.name}>
          <label className="block font-bold text-sm mb-3 uppercase">
            {option.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              const isAvailable = isOptionAvailable(option.name, value);

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onOptionChange(option.name, value)}
                  disabled={!isAvailable}
                  className={`
                    px-4 py-2 border-2 rounded-sm font-medium transition-all
                    ${
                      isSelected
                        ? 'border-black bg-black text-white'
                        : isAvailable
                        ? 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                    }
                  `}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
