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
  Row,
  Col,
  Collapse,
  Pagination,
} from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import "./pagination.css";

const { Option } = Select;
const { Panel } = Collapse;

export type TTableData = Pick<
  Bike,
  "price" | "model" | "brand" | "category" | "quantity" | "image"
> & { key: string };

const AllProduct = () => {
  const [params] = useState<TQueryParam[] | undefined>(undefined);
  const [searchParams] = useSearchParams();

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

  // Get active filter display
  const getActiveFiltersDisplay = useMemo(() => {
    const filters = [];
    if (selectedCategory) filters.push(`Category: ${selectedCategory}`);
    if (selectedBrand) filters.push(`Brand: ${selectedBrand}`);
    if (selectedModel) filters.push(`Model: ${selectedModel}`);
    if (searchTerm) filters.push(`Search: "${searchTerm}"`);
    return filters;
  }, [selectedCategory, selectedBrand, selectedModel, searchTerm]);

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
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-3 sm:px-5 py-6"
      // style={{
      //   background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      // }}
    >
      {/* Title Card */}
      <Card
        className="w-full max-w-6xl text-center shadow-lg mb-6"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${tealColors.secondary}`,
        }}
      >
        <h1
          className="text-xl sm:text-2xl font-semibold text-gray-800"
          style={{ color: tealColors.primary }}
        >
          Explore Our Bike Collection
        </h1>
        <p className="text-gray-600 text-sm">
          Find the perfect bike for your journey.
        </p>

        {/* Active Filters Display */}
        {getActiveFiltersDisplay.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {getActiveFiltersDisplay.map((filter, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium"
              >
                {filter}
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* Search and Filters Section */}
      <Card
        className="w-full max-w-6xl shadow-lg mb-6"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${tealColors.secondary}`,
        }}
      >
        {/* Mobile Collapsible Filters */}
        <div className="block sm:hidden mb-4">
          <Collapse
            ghost
            expandIcon={({ isActive }) => (
              <FilterOutlined
                style={{
                  color: tealColors.primary,
                  transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            )}
          >
            <Panel
              header={
                <span style={{ color: tealColors.primary, fontWeight: "bold" }}>
                  Advanced Filters
                </span>
              }
              key="1"
            >
              <div className="space-y-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <Select
                    placeholder="Select Category"
                    value={selectedCategory || undefined}
                    onChange={handleCategoryChange}
                    className="w-full"
                    allowClear
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <Select
                    placeholder="Select Brand"
                    value={selectedBrand || undefined}
                    onChange={handleBrandChange}
                    className="w-full"
                    allowClear
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model
                  </label>
                  <Select
                    placeholder="Select Model"
                    value={selectedModel || undefined}
                    onChange={handleModelChange}
                    className="w-full"
                    allowClear
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0].toLocaleString()} - $
                    {priceRange[1].toLocaleString()}
                  </label>
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
                  />
                </div>

                {/* Clear Filters Button */}
                <Button
                  onClick={clearFilters}
                  className="w-full"
                  style={{
                    borderColor: tealColors.secondary,
                    color: tealColors.primary,
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </Panel>
          </Collapse>
        </div>

        {/* Desktop Filters Layout */}
        <div className="hidden sm:block">
          <Row gutter={[16, 16]} align="middle">
            {/* Search Input */}
            <Col xs={24} sm={12} md={6}>
              <Input
                placeholder="Search by brand, model, category"
                value={searchTerm}
                onChange={handleSearch}
                prefix={<SearchOutlined className="text-teal-500" />}
                className="border-2 border-teal-500 focus:border-teal-700 rounded-xl transition-all"
              />
            </Col>

            {/* Category Filter */}
            <Col xs={24} sm={6} md={4}>
              <Select
                placeholder="Category"
                value={selectedCategory || undefined}
                onChange={handleCategoryChange}
                className="w-full"
                allowClear
              >
                {categories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Col>

            {/* Brand Filter */}
            <Col xs={24} sm={6} md={4}>
              <Select
                placeholder="Brand"
                value={selectedBrand || undefined}
                onChange={handleBrandChange}
                className="w-full"
                allowClear
              >
                {brands.map((brand) => (
                  <Option key={brand} value={brand}>
                    {brand}
                  </Option>
                ))}
              </Select>
            </Col>

            {/* Model Filter */}
            <Col xs={24} sm={6} md={4}>
              <Select
                placeholder="Model"
                value={selectedModel || undefined}
                onChange={handleModelChange}
                className="w-full"
                allowClear
              >
                {models.map((model) => (
                  <Option key={model} value={model}>
                    {model}
                  </Option>
                ))}
              </Select>
            </Col>

            {/* Price Range */}
            <Col xs={24} sm={12} md={4}>
              <div>
                <div className="text-xs text-gray-600 mb-1">
                  Price: ${priceRange[0].toLocaleString()} - $
                  {priceRange[1].toLocaleString()}
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
                />
              </div>
            </Col>

            {/* Clear Filters */}
            <Col xs={24} sm={6} md={2}>
              <Button
                onClick={clearFilters}
                className="w-full"
                style={{
                  borderColor: tealColors.secondary,
                  color: tealColors.primary,
                }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </div>

        {/* Mobile Search Bar */}
        <div className="block sm:hidden">
          <Input
            placeholder="Search by brand, model, category"
            value={searchTerm}
            onChange={handleSearch}
            prefix={<SearchOutlined className="text-teal-500" />}
            className="w-full border-2 border-teal-500 focus:border-teal-700 rounded-xl transition-all"
          />
        </div>

        {/* Results Counter and Pagination Info */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-sm text-gray-600">
            Showing {paginationInfo.startItem}-{paginationInfo.endItem} of{" "}
            {paginationInfo.totalItems} bikes
          </span>
          {paginationInfo.totalItems > 0 && (
            <span className="text-xs text-gray-500">
              Page {currentPage} of {paginationInfo.totalPages}
            </span>
          )}
        </div>
      </Card>

      {/* Products Grid */}
      {isFetching ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : filteredData.length === 0 ? (
        <Card
          className="w-full max-w-md text-center shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${tealColors.secondary}`,
          }}
        >
          <div className="py-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No bikes found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button
              onClick={clearFilters}
              style={{
                backgroundColor: tealColors.secondary,
                borderColor: tealColors.secondary,
                color: "white",
              }}
            >
              Clear All Filters
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 w-full max-w-7xl mb-8"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 w-full max-w-6xl mb-8">
            {paginatedData.map((bike) => (
              <Card
                key={bike.key}
                className="rounded-2xl shadow-lg transition-transform hover:scale-105 hover:shadow-xl bg-teal-50"
                style={{
                  // background: "white",
                  border: `1px solid ${tealColors.secondary}`,
                }}
                bodyStyle={{ padding: "1rem" }}
              >
                {/* Image */}
                <img
                  src={bike.image}
                  alt={bike.model}
                  className="h-32 sm:h-40 w-full object-cover rounded-md mb-4"
                />

                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 truncate">
                  {bike.model}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">
                  Brand: {bike.brand}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">
                  Category: {bike.category}
                </p>
                <p className="text-sm sm:text-base font-bold text-green-600 mb-2">
                  ${bike.price.toLocaleString()}
                </p>

                <p
                  className={`text-xs sm:text-sm font-semibold mb-3 ${
                    bike.quantity > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {bike.quantity > 0
                    ? `In Stock: ${bike.quantity}`
                    : "Out of Stock"}
                </p>

                <Button
                  onClick={() => navigateToProduct(bike.key)}
                  className="w-full text-xs sm:text-sm font-bold py-1 rounded-md"
                  style={{
                    backgroundColor: tealColors.secondary,
                    borderColor: tealColors.secondary,
                    color: "white",
                  }}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>

          {/* Pagination Component */}
          {paginationInfo.totalItems > 0 && (
            <Card
              className="w-full max-w-6xl shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${tealColors.secondary}`,
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Pagination Info - Mobile */}
                <div className="block sm:hidden text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    {paginationInfo.startItem}-{paginationInfo.endItem} of{" "}
                    {paginationInfo.totalItems} items
                  </div>
                  <div className="text-xs text-gray-500">
                    Page {currentPage} of {paginationInfo.totalPages}
                  </div>
                </div>

                {/* Pagination Info - Desktop */}
                <div className="hidden sm:block text-sm text-gray-600">
                  Showing {paginationInfo.startItem}-{paginationInfo.endItem} of{" "}
                  {paginationInfo.totalItems} bikes
                </div>

                {/* Pagination Component */}
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
                  className="flex justify-center custom-pagination"
                />
                {/* Page Size Selector - Mobile */}
                <div className="block sm:hidden">
                  <Select
                    value={pageSize}
                    onChange={(value) => handlePageChange(1, value)}
                    size="small"
                    style={{ width: 80 }}
                  >
                    <Option value={10}>10</Option>
                    <Option value={20}>20</Option>
                    <Option value={40}>40</Option>
                    <Option value={60}>60</Option>
                    <Option value={100}>100</Option>
                  </Select>
                </div>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default AllProduct;
