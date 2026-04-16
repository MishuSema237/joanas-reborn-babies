import { useState } from "react";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  imageUrl?: string;
  images?: string[];
  slug: string;
  description?: string;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
  itemsPerPage?: number;
  enablePagination?: boolean;
  mobileLayout?: "carousel" | "grid";
}

export function ProductGrid({
  products,
  title = "Our Latest Creations",
  showViewAll = true,
  itemsPerPage = 5,
  enablePagination = false,
  mobileLayout = "carousel",
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = itemsPerPage || 30;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = enablePagination ? products.slice(startIndex, startIndex + ITEMS_PER_PAGE) : products;

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <section className="mb-8">
      <div className="container px-2 md:px-4">
        {title && (
          <h2 className="text-center mb-8 md:mb-12 text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
        )}

        {/* Grid Layout - Default for shop page */}
        {mobileLayout === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 mb-10">
            {currentProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                id={product._id || product.id || ""}
                name={product.name}
                price={product.price}
                slug={product.slug}
                imageUrl={product.imageUrl || (product.images && product.images[0])}
                description={product.description}
              />
            ))}
          </div>
        ) : (
          /* Horizontal Scroll - For homepage carousel */
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-6 px-2 scrollbar-hide">
            {products.slice(0, enablePagination ? itemsPerPage * totalPages : undefined).map((product) => (
              <div key={product._id || product.id} className="snap-center shrink-0 w-[160px] sm:w-[180px] md:w-[200px]">
                <ProductCard
                  id={product._id || product.id || ""}
                  name={product.name}
                  price={product.price}
                  slug={product.slug}
                  imageUrl={product.imageUrl || (product.images && product.images[0])}
                  description={product.description}
                />
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls with page numbers */}
        {enablePagination && totalPages > 1 && (
          <div className="flex flex-col items-center gap-3 mt-6">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="rounded-full w-8 h-8 p-0 flex items-center justify-center disabled:opacity-30 text-gray-700 border-gray-200 hover:bg-rose-50"
              >
                <FaChevronLeft className="text-xs" />
              </Button>
              
              {getPageNumbers().map((page, idx) => (
                typeof page === 'number' ? (
                  <Button
                    key={idx}
                    variant={page === currentPage ? "solid" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 p-0 text-xs rounded-full ${
                      page === currentPage 
                        ? 'bg-rose-500 text-white border-rose-500' 
                        : 'border-gray-200 text-gray-600 hover:bg-rose-50'
                    }`}
                  >
                    {page}
                  </Button>
                ) : (
                  <span key={idx} className="text-gray-400">...</span>
                )
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="rounded-full w-8 h-8 p-0 flex items-center justify-center disabled:opacity-30 text-gray-700 border-gray-200 hover:bg-rose-50"
              >
                <FaChevronRight className="text-xs" />
              </Button>
            </div>
          </div>
        )}

        {showViewAll && !enablePagination && (
          <div className="text-center mt-6">
            <Button 
              variant="outline" 
              href="/shop"
              className="border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 rounded-full px-6"
            >
              View All
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}