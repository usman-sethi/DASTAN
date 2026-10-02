import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (!items || items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-2.5 px-4 text-xs font-mono text-neutral-500">
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-bold text-[#0C2B22] uppercase tracking-wider"
                >
                  {item.name}
                </span>
              ) : (
                <button
                  onClick={item.onClick}
                  className="hover:text-[#0C2B22] hover:underline transition-colors uppercase tracking-wider cursor-pointer"
                >
                  {item.name}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
