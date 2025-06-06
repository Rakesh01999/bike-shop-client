/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Bike, TQueryParam } from "../types";
import { useGetAllCarsQuery } from "../redux/features/bikes/bikesManagement";
import {
  Button,
  Input,
  Card,
  Spin,
  Select,
  Slider,
  Pagination,
  Badge,
  Drawer,
} from "antd";
import { useNavigate } from "react-router-dom";
import { 
  SearchOutlined, 
  FilterOutlined, 
  ClearOutlined,
  AppstoreOutlined,
  TagOutlined,
  DollarOutlined,
  CarOutlined
} from "@ant-design/icons";
import "./pagination.css";

const { Option } = Select;

export type TTableData = Pick<
  Bike,
  "price" | "model" | "brand" | "category" | "quantity" | "image"
> & { key: string };

const AllProduct = () => {
  const [params] = useState<TQueryParam[] | undefined>(undefined);
  const [searchParams] = useSearchParams();

  // Mobile drawer state
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const navigate = useNavigate();

  const { data: CarData, isFetching } = useGetAllCarsQuery([
    ...(params || []),
    { name: "page", value: currentPage.toString() },
    { name: "limit", value: pageSize.toString() },
  ]);

  // Memoize table data to prevent recreation on every render
  const tableData: TTableData[] = useMemo(() => {
    if (!CarData?.data) return [];

    return CarData.data.map(
      ({ _id, price, modelNumber, brand, category, quantity, image }) => ({
        key: _id,
        price,
        model: modelNumber ?? "N/A",
        brand,
        category,
        quantity,
        image,
      })
    );
  }, [CarData?.data]);

  // Memoize categories, brands, models and max price
  const { categories, brands, models, maxPrice } = useMemo(() => {
    if (!tableData.length) {
      return { categories: [], brands: [], models: [], maxPrice: 10000 };
    }

    const uniqueCategories = [
      ...new Set(tableData.map((item) => item.category)),
    ];

    const uniqueBrands = [...new Set(tableData.map((item) => item.brand))];

    const uniqueModels = [
      ...new Set(
        tableData.map((item) => item.model).filter((model) => model !== "N/A")
      ),
    ];

    const prices = tableData.map((item) => item.price);
    const maxPriceValue = Math.max(...prices);

    return {
      categories: uniqueCategories,
      brands: uniqueBrands,
      models: uniqueModels,
      maxPrice: maxPriceValue,
    };
  }, [tableData]);

  // Initialize filters from URL parameters and set initial state
  useEffect(() => {
    if (tableData.length > 0 && !isInitialized) {
      // Get URL parameters
      const urlCategory = searchParams.get("category");
      const urlBrand = searchParams.get("brand");
      const urlModel =
        searchParams.get("modelnumber") || searchParams.get("modelNumber");
      const urlPage = searchParams.get("page");
      const urlPageSize = searchParams.get("pageSize");

      // Set filters based on URL parameters
      if (urlCategory) {
        setSelectedCategory(urlCategory);
      }
      if (urlBrand) {
        setSelectedBrand(urlBrand);
      }
      if (urlModel) {
        setSelectedModel(urlModel);
      }
      if (urlPage) {
        setCurrentPage(parseInt(urlPage, 10) || 1);
      }
      if (urlPageSize) {
        setPageSize(parseInt(urlPageSize, 10) || 20);
      }

      // Initialize price range
      setPriceRange([0, maxPrice]);
      setIsInitialized(true);
    }
  }, [tableData.length, maxPrice, isInitialized, searchParams]);

  // Watch for URL parameter changes after initialization
  useEffect(() => {
    if (isInitialized && tableData.length > 0) {
      const urlCategory = searchParams.get("category");
      const urlBrand = searchParams.get("brand");
      const urlModel =
        searchParams.get("modelnumber") || searchParams.get("modelNumber");
      const urlPage = searchParams.get("page");
      const urlPageSize = searchParams.get("pageSize");

      // Update filters when URL parameters change
      setSelectedCategory(urlCategory || "");
      setSelectedBrand(urlBrand || "");
      setSelectedModel(urlModel || "");

      if (urlPage) {
        setCurrentPage(parseInt(urlPage, 10) || 1);
      }
      if (urlPageSize) {
        setPageSize(parseInt(urlPageSize, 10) || 20);
      }
    }
  }, [searchParams, isInitialized, tableData.length]);

  // Memoize filtered data
  const filteredData = useMemo(() => {
    if (!tableData.length) return [];

    let filtered = tableData;

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.model?.toLowerCase().includes(searchLower) ||
          item.brand.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter((item) => item.brand === selectedBrand);
    }

    // Model filter
    if (selectedModel) {
      filtered = filtered.filter((item) => item.model === selectedModel);
    }

    // Price range filter
    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    return filtered;
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    selectedModel,
    priceRange,
    tableData,
  ]);

  // Memoize paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  // Reset to first page when filters change
  useEffect(() => {
    if (currentPage > 1 && filteredData.length > 0) {
      const maxPages = Math.ceil(filteredData.length / pageSize);
      if (currentPage > maxPages) {
        setCurrentPage(1);
        updateURLParams({ page: "1" });
      }
    }
  }, [filteredData.length, currentPage, pageSize]);

  // Function to update URL parameters
  const updateURLParams = useCallback(
    (updates: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });

      navigate(`?${newSearchParams.toString()}`, { replace: true });
    },
    [navigate, searchParams]
  );

  // Memoize event handlers
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
      updateURLParams({ page: "1" });
    },
    [updateURLParams]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      setSelectedCategory(value);
      setCurrentPage(1);
      updateURLParams({ category: value, page: "1" });
    },
    [updateURLParams]
  );

  const handleBrandChange = useCallback(
    (value: string) => {
      setSelectedBrand(value);
      setCurrentPage(1);
      updateURLParams({ brand: value, page: "1" });
    },
    [updateURLParams]
  );

  const handleModelChange = useCallback(
    (value: string) => {
      setSelectedModel(value);
      setCurrentPage(1);
      updateURLParams({ modelnumber: value, page: "1" });
    },
    [updateURLParams]
  );

  const handlePriceRangeChange = useCallback(
    (value: number[]) => {
      setPriceRange(value);
      setCurrentPage(1);
      updateURLParams({ page: "1" });
    },
    [updateURLParams]
  );

  const handlePageChange = useCallback(
    (page: number, size?: number) => {
      setCurrentPage(page);
      if (size && size !== pageSize) {
        setPageSize(size);
        updateURLParams({ page: "1", pageSize: size.toString() });
        setCurrentPage(1);
      } else {
        updateURLParams({ page: page.toString() });
      }
    },
    [pageSize, updateURLParams]
  );

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedModel("");
    setPriceRange([0, maxPrice]);
    setCurrentPage(1);
    navigate("/allproduct", { replace: true });
  }, [maxPrice, navigate]);

  const navigateToProduct = useCallback(
    (productId: string) => {
      navigate(`/products/${productId}`);
    },
    [navigate]
  );

  // Get active filter count (excluding search)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory) count++;
    if (selectedBrand) count++;
    if (selectedModel) count++;
    if (priceRange[0] !== 0 || priceRange[1] !== maxPrice) count++;
    return count;
  }, [selectedCategory, selectedBrand, selectedModel, priceRange, maxPrice]);

  // Calculate pagination info
  const paginationInfo = useMemo(() => {
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return { totalItems, totalPages, startItem, endItem };
  }, [filteredData.length, pageSize, currentPage]);

  // Teal Theme
  const tealColors = {
    primary: "#0F766E",
    secondary: "#14B8A6",
    background: "#ECFDF5",
    light: "#F0FDFA",
  };

  // Filter Sidebar Component (without search - moved to header)
  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'p-0' : 'h-full'}`}>
      <div className="space-y-6">
        {/* Filter Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilterOutlined style={{ color: tealColors.primary, fontSize: '18px' }} />
            <h3 className="text-lg font-semibold" style={{ color: tealColors.primary }}>
              Filters
            </h3>
            {activeFilterCount > 0 && (
              <Badge 
                count={activeFilterCount} 
                style={{ backgroundColor: tealColors.secondary }}
              />
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button
              size="small"
              icon={<ClearOutlined />}
              onClick={clearFilters}
              style={{ 
                color: tealColors.primary,
                borderColor: tealColors.primary
              }}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AppstoreOutlined style={{ color: tealColors.primary }} />
            <label className="text-sm font-medium text-gray-700">Category</label>
          </div>
          <Select
            placeholder="All Categories"
            value={selectedCategory || undefined}
            onChange={handleCategoryChange}
            className="w-full"
            allowClear
            style={{ borderRadius: '8px' }}
          >
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>

        {/* Brand Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TagOutlined style={{ color: tealColors.primary }} />
            <label className="text-sm font-medium text-gray-700">Brand</label>
          </div>
          <Select
            placeholder="All Brands"
            value={selectedBrand || undefined}
            onChange={handleBrandChange}
            className="w-full"
            allowClear
            style={{ borderRadius: '8px' }}
          >
            {brands.map((brand) => (
              <Option key={brand} value={brand}>
                {brand}
              </Option>
            ))}
          </Select>
        </div>

        {/* Model Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CarOutlined style={{ color: tealColors.primary }} />
            <label className="text-sm font-medium text-gray-700">Model</label>
          </div>
          <Select
            placeholder="All Models"
            value={selectedModel || undefined}
            onChange={handleModelChange}
            className="w-full"
            allowClear
            style={{ borderRadius: '8px' }}
          >
            {models.map((model) => (
              <Option key={model} value={model}>
                {model}
              </Option>
            ))}
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <DollarOutlined style={{ color: tealColors.primary }} />
            <label className="text-sm font-medium text-gray-700">
              Price Range
            </label>
          </div>
          <div className="px-2">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
            <Slider
              range
              min={0}
              max={maxPrice}
              value={priceRange}
              onChange={handlePriceRangeChange}
              step={50}
              tooltip={{
                formatter: (value) => `$${value?.toLocaleString()}`,
              }}
              trackStyle={[{ backgroundColor: tealColors.secondary }]}
              handleStyle={[
                { borderColor: tealColors.secondary, backgroundColor: tealColors.secondary },
                { borderColor: tealColors.secondary, backgroundColor: tealColors.secondary }
              ]}
            />
            <div className="text-xs text-gray-500 mt-1 text-center">
              Max: ${maxPrice.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"> */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            {/* Title Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:mt-7 lg:mt-1">
              <div>
                <h1 className="text-2xl font-bold" style={{ color: tealColors.primary }}>
                  Bike Collection
                </h1>
                <p className="text-gray-600 text-sm">
                  Find the perfect bike for your journey
                </p>
              </div>
              
              {/* Results Info */}
              <div className="text-sm text-teal-700 font-semibold">
                {paginationInfo.totalItems > 0 ? (
                  <span>
                    Showing {paginationInfo.startItem}-{paginationInfo.endItem} of{" "}
                    {paginationInfo.totalItems} bikes
                  </span>
                ) : (
                  <span>No bikes found</span>
                )}
              </div>
            </div>

            {/* Search and Filter Controls Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Search Input - Prominent and Accessible */}
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search by brand, model, category..."
                  value={searchTerm}
                  onChange={handleSearch}
                  prefix={<SearchOutlined style={{ color: tealColors.secondary }} />}
                  className="h-10 border-2 rounded-lg transition-all duration-200 focus:shadow-lg"
                  style={{ 
                    borderColor: tealColors.secondary,
                    fontSize: '16px' // Prevents zoom on iOS
                  }}
                  allowClear
                />
              </div>

              {/* Filter Button and Active Filters Display */}
              <div className="flex items-center gap-3">
                <Button
                  icon={<FilterOutlined />}
                  onClick={() => setMobileFiltersVisible(true)}
                  className="lg:hidden h-10"
                  style={{ 
                    borderColor: tealColors.secondary,
                    color: tealColors.primary
                  }}
                >
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </Button>

                {/* Active Filters Count for Desktop */}
                <div className="hidden lg:flex items-center gap-2">
                  {activeFilterCount > 0 && (
                    <>
                      <Badge 
                        count={activeFilterCount} 
                        style={{ backgroundColor: tealColors.secondary }}
                      />
                      <span className="text-sm text-gray-600">filters active</span>
                      <Button
                        size="small"
                        icon={<ClearOutlined />}
                        onClick={clearFilters}
                        style={{ 
                          color: tealColors.primary,
                          borderColor: tealColors.primary
                        }}
                      >
                        Clear
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Search Results Indicator */}
            {searchTerm && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Search results for:</span>
                <span 
                  className="px-2 py-1 rounded-md text-white text-xs font-medium"
                  style={{ backgroundColor: tealColors.secondary }}
                >
                  "{searchTerm}"
                </span>
                {searchTerm && (
                  <Button
                    size="small"
                    type="text"
                    onClick={() => setSearchTerm("")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"> */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card
              className="sticky top-6"
              style={{
                background: "white",
                border: `1px solid ${tealColors.secondary}`,
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <FilterSidebar />
            </Card>
          </div>

          {/* Mobile Filter Drawer */}
          <Drawer
            title="Filters"
            placement="left"
            onClose={() => setMobileFiltersVisible(false)}
            open={mobileFiltersVisible}
            width={320}
            bodyStyle={{ padding: '24px' }}
          >
            <FilterSidebar isMobile={true} />
          </Drawer>

          {/* Products Section */}
          <div className="flex-1 min-w-0">
            {isFetching ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Spin size="large" />
              </div>
            ) : filteredData.length === 0 ? (
              <Card
                className="text-center py-12"
                style={{
                  background: "white",
                  border: `1px solid ${tealColors.secondary}`,
                  borderRadius: '12px',
                }}
              >
                <div className="text-6xl mb-4">🚲</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No bikes found
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm 
                    ? `No results found for "${searchTerm}". Try adjusting your search or filters.`
                    : "Try adjusting your search criteria or filters."
                  }
                </p>
                <Button
                  onClick={clearFilters}
                  style={{
                    backgroundColor: tealColors.secondary,
                    borderColor: tealColors.secondary,
                    color: "white",
                  }}
                  size="large"
                >
                  Clear All Filters
                </Button>
              </Card>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {paginatedData.map((bike) => (
                    <Card
                      key={bike.key}
                      className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      style={{
                        background: "white",
                        border: `1px solid ${tealColors.secondary}`,
                        borderRadius: '16px',
                        overflow: 'hidden'
                      }}
                      bodyStyle={{ padding: 0 }}
                      cover={
                        <div className="relative overflow-hidden" style={{ height: '200px' }}>
                          <img
                            src={bike.image}
                            alt={bike.model}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3">
                            <div 
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                bike.quantity > 0 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {bike.quantity > 0 ? `${bike.quantity} left` : 'Out of Stock'}
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                          {bike.model}
                        </h3>
                        <p className="text-sm text-gray-500 mb-1">{bike.brand}</p>
                        <p className="text-xs text-gray-400 mb-3">{bike.category}</p>
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xl font-bold" style={{ color: tealColors.primary }}>
                            ${bike.price.toLocaleString()}
                          </span>
                        </div>

                        <Button
                          onClick={() => navigateToProduct(bike.key)}
                          className="w-full font-semibold"
                          style={{
                            backgroundColor: tealColors.secondary,
                            borderColor: tealColors.secondary,
                            color: "white",
                            height: '40px',
                            borderRadius: '8px'
                          }}
                          disabled={bike.quantity === 0}
                        >
                          {bike.quantity > 0 ? 'View Details' : 'Out of Stock'}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {paginationInfo.totalItems > 0 && (
                  <Card
                    style={{
                      background: "white",
                      border: `1px solid ${tealColors.secondary}`,
                      borderRadius: '12px',
                    }}
                    bodyStyle={{ padding: '20px' }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-sm text-gray-600">
                        Showing {paginationInfo.startItem}-{paginationInfo.endItem} of{" "}
                        {paginationInfo.totalItems} bikes
                      </div>

                      <Pagination
                        current={currentPage}
                        total={paginationInfo.totalItems}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                        onShowSizeChange={handlePageChange}
                        showSizeChanger
                        showQuickJumper={paginationInfo.totalPages > 10}
                        pageSizeOptions={["10", "20", "40", "60", "100"]}
                        showTotal={(total, range) =>
                          window.innerWidth >= 640
                            ? `${range[0]}-${range[1]} of ${total} items`
                            : `${total} total`
                        }
                        size={window.innerWidth < 640 ? "small" : "default"}
                        responsive
                        className="custom-pagination"
                      />
                    </div>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;