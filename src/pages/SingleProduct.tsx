import { useState } from "react";
import { Typography, Spin, Button, Rate, Avatar, Progress, Badge } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleCarsQuery } from "../redux/features/bikes/bikesManagement";
import {
  ShoppingCart,
  Heart,
  Share2,
  ChevronRight,
  Star,
  Shield,
  Truck,
  RotateCcw,
  Award,
  // Users,
  MessageCircle,
  ThumbsUp,
  Calendar,
  CheckCircle,
  Info,
  Zap,
  Settings,
  Globe,
} from "lucide-react";

const { Title, Text } = Typography;

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: CarData, isFetching } = useGetSingleCarsQuery(id);
  const [isWishlist, setIsWishlist] = useState(false);
  const [selectedImage] = useState(0);
  // const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for enhanced features
  const mockReviews = [
    {
      id: 1,
      user: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5,
      date: "2024-05-15",
      comment:
        "Excellent bike! Perfect for city commuting. The build quality is outstanding and the ride is smooth.",
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      user: "Sarah Smith",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4,
      date: "2024-05-10",
      comment:
        "Great value for money. Love the design and performance. Minor issues with assembly instructions.",
      helpful: 8,
      verified: true,
    },
    {
      id: 3,
      user: "Mike Johnson",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 5,
      date: "2024-04-28",
      comment:
        "Best purchase I've made this year! Highly recommend for anyone looking for a reliable bike.",
      helpful: 15,
      verified: false,
    },
  ];

  const specifications = {
    "Frame Material": "Aluminum Alloy",
    "Wheel Size": "26 inches",
    "Gear System": "21-Speed Shimano",
    "Brake Type": "Disc Brakes",
    Weight: "12.5 kg",
    "Max Load": "120 kg",
    Warranty: "2 Years",
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-700 to-teal-300">
        <Spin size="large" />
      </div>
    );
  }

  if (!CarData || !CarData.data) {
    return <div className="text-center text-white">No data available</div>;
  }

  const car = Array.isArray(CarData.data) ? CarData.data[0] : CarData.data;

  if (!car) {
    return <div className="text-center text-white">No bike found</div>;
  }

  const handleBuyNow = () => {
    navigate(`/checkout/${car?._id}`);
  };

  const mockImages = [
    car?.image,
    "https://images.unsplash.com/photo-1558618047-b0a56ad15e22?w=500",
    "https://images.unsplash.com/photo-1558618048-b0a56ad1e3c8?w=500",
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500",
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 70, count: 105 },
    { stars: 4, percentage: 20, count: 30 },
    { stars: 3, percentage: 7, count: 11 },
    { stars: 2, percentage: 2, count: 3 },
    { stars: 1, percentage: 1, count: 1 },
  ];

  return (
    // <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div className="min-h-screen">
      {/* Header Section */}
      {/* <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-6"> */}
      <div className="bg-gradient-to-r py-6">
        {/* <div className="max-w-7xl mx-auto px-6"> */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-black mb-4">
            <a href="/">
              <span className="cursor-pointer">Home</span>
            </a>
            <ChevronRight size={16} />
            <a href="/allproduct">
              <span className="cursor-pointer">Products</span>
            </a>
            <ChevronRight size={16} />
            <span className="text-black font-medium">{car?.brand}</span>
          </div>
        </div>
      </div>

      {/* <div className="max-w-7xl mx-auto px-6 py-8"> */}
      <div className=" mx-auto px-6 py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 shadow-2xl"> */}
            <div className="rounded-2xl p-6 shadow-2xl">
              <div className="relative overflow-hidden rounded-xl bg-white">
                <img
                  alt={car?.brand}
                  src={mockImages[selectedImage]}
                  className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge.Ribbon text="Best Seller" color="red">
                    <div className="w-16 h-16"></div>
                  </Badge.Ribbon>
                </div>
              </div>

              {/* Thumbnail Images */}
              {/* <div className="flex gap-3 mt-4">
                {mockImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-teal-400 shadow-lg' 
                        : 'border-slate-600 hover:border-slate-400'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
               */}
            </div>
          </div>

          {/* Product Info */}
          {/* <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 shadow-2xl"> */}
          <div className="rounded-2xl p-8 shadow-2xl">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge count="NEW" color="green" />
                  <span className="text-teal-600 font-medium">
                    {car?.category}
                  </span>
                </div>
                <Title level={1} className="text-3xl font-bold text-white mb-4">
                  {car?.brand} {car?.modelNumber}
                </Title>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Rate
                      disabled
                      defaultValue={4.5}
                      className="text-yellow-400"
                    />
                    <span className="text-white font-semibold">4.5</span>
                  </div>
                  <span className="">(150 Reviews)</span>
                  <span className="text-teal-600 font-semibold">
                    • 1.2k Sold
                  </span>
                </div>

                <div className="flex items-baseline gap-4 mb-6">
                  <Text className="text-4xl font-bold text-teal-600">
                    ${car?.price}
                  </Text>
                  <Text className="text-xl text-slate-400 line-through">
                    ${(car?.price * 1.2).toFixed(2)}
                  </Text>
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    20% OFF
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-600 pt-6">
                {/* <Text className="text-slate-300 leading-relaxed text-lg"> */}
                <Text className="leading-relaxed text-lg text-black font-semibold">
                  {car?.description}
                </Text>
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-2 gap-4">
                {/* <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg"> */}
                <div className="flex items-center gap-3 p-3 bg-slate-700/5 rounded-lg">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm">2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-700/5 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-700/5 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">30-Day Return</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-700/5 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">Quality Assured</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="bg-slate-700/5 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Stock Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      car?.quantity > 10
                        ? "bg-green-500/20 text-green-700"
                        : car?.quantity > 0
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {car?.quantity > 10
                      ? "In Stock"
                      : car?.quantity > 0
                      ? `Only ${car.quantity} left`
                      : "Out of Stock"}
                  </span>
                </div>
                <Progress
                  percent={Math.min((car?.quantity / 20) * 100, 100)}
                  strokeColor="#10B981"
                  trailColor="#374151"
                  showInfo={false}
                />
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                {/* <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center bg-slate-700 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-white hover:bg-slate-600 rounded-l-lg transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-white border-x border-slate-600">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(car?.quantity, quantity + 1))
                      }
                      className="px-4 py-2 text-white hover:bg-slate-600 rounded-r-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div> */}

                <div className="flex gap-3">
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleBuyNow}
                    // className="flex-1 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 border-none flex items-center justify-center gap-2 hover:from-teal-600 hover:to-cyan-600"
                    className="flex-1 h-12 border-none flex items-center justify-center gap-2 bg-teal-600"
                    icon={<ShoppingCart className="w-5 h-5" />}
                    disabled={!car?.quantity}
                  >
                    Buy Now
                  </Button>

                  <Button
                    size="large"
                    onClick={() => setIsWishlist(!isWishlist)}
                    className={`h-12 w-12 flex items-center justify-center border-slate-600 ${
                      isWishlist
                        ? "text-red-500 bg-red-500/10"
                        : "text-slate-400 hover:text-red-400"
                    }`}
                    icon={
                      <Heart
                        className="w-5 h-5"
                        fill={isWishlist ? "currentColor" : "none"}
                      />
                    }
                  />

                  <Button
                    size="large"
                    className="h-12 w-12 flex items-center justify-center text-slate-400 border-slate-600 hover:text-white"
                    icon={<Share2 className="w-5 h-5" />}
                  />
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        {/* <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-2xl overflow-hidden"> */}
        <div className=" rounded-2xl shadow-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-slate-600">
            <div className="flex">
              {[
                { key: "overview", label: "Overview", icon: Info },
                {
                  key: "specifications",
                  label: "Specifications",
                  icon: Settings,
                },
                { key: "reviews", label: "Reviews (150)", icon: MessageCircle },
                { key: "shipping", label: "Shipping", icon: Truck },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                    activeTab === key
                      ? "text-white border-b-2 border-white bg-slate-500"
                      : "text-slate-800 hover:text-white hover:bg-slate-700/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Product Overview
                  </h3>
                  <p className="text-slate-800 text-lg leading-relaxed">
                    {car?.description} This premium bicycle combines
                    cutting-edge technology with superior craftsmanship to
                    deliver an unmatched riding experience. Whether you're
                    commuting through the city or exploring mountain trails,
                    this bike offers the perfect balance of performance,
                    comfort, and style.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-500 p-6 rounded-xl">
                    <Zap className="w-8 h-8 text-yellow-400 mb-4" />
                    <h4 className="text-white font-semibold mb-2">
                      High Performance
                    </h4>
                    <p className="text-white text-sm">
                      Advanced engineering for maximum efficiency and speed
                    </p>
                  </div>
                  <div className="bg-slate-500 p-6 rounded-xl">
                    <Shield className="w-8 h-8 text-green-400 mb-4" />
                    <h4 className="text-white font-semibold mb-2">
                      Durable Build
                    </h4>
                    <p className="text-white text-sm">
                      Premium materials ensure long-lasting reliability
                    </p>
                  </div>
                  <div className="bg-slate-500 p-6 rounded-xl">
                    <Globe className="w-8 h-8 text-blue-400 mb-4" />
                    <h4 className="text-white font-semibold mb-2">
                      Eco-Friendly
                    </h4>
                    <p className="text-white text-sm">
                      Sustainable transportation for a greener future
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center p-4 bg-slate-500 rounded-lg"
                    >
                      <span className="text-white font-medium">{key}</span>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Rating Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-500 p-6 rounded-xl">
                    <div className="text-center mb-6">
                      <div className="text-6xl font-bold text-white mb-2">
                        4.5
                      </div>
                      <Rate
                        disabled
                        defaultValue={4.5}
                        className="text-yellow-400 text-lg mb-2"
                      />
                      <div className="text-white">Based on 150 reviews</div>
                    </div>

                    <div className="space-y-3">
                      {ratingDistribution.map((item) => (
                        <div
                          key={item.stars}
                          className="flex items-center gap-3"
                        >
                          <div className="flex items-center gap-1 w-12">
                            <span className="text-white text-sm">
                              {item.stars}
                            </span>
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          </div>
                          <Progress
                            percent={item.percentage}
                            strokeColor="#10B981"
                            trailColor="#374151"
                            showInfo={false}
                            className="flex-1"
                          />
                          <span className="text-slate-300 text-sm w-8">
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-500 p-6 rounded-xl">
                    <h4 className="text-white font-semibold mb-4">
                      Review Highlights
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-white">
                          Build Quality (95% positive)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-white">
                          Value for Money (88% positive)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-white">
                          Performance (92% positive)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-white">
                          Design (87% positive)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-white">
                    Customer Reviews
                  </h4>
                  {mockReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-slate-600 p-6 rounded-xl"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar src={review.avatar} size={48} />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-white font-semibold">
                              {review.user}
                            </span>
                            {review.verified && (
                              <Badge count="Verified Purchase" color="green" />
                            )}
                            <span className="text-white text-sm">
                              <Calendar className="w-4 h-4 inline mr-1" />
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <Rate
                            disabled
                            defaultValue={review.rating}
                            className="text-yellow-400 mb-3"
                          />
                          <p className="text-white mb-4">
                            {review.comment}
                          </p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-white hover:text-white transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">
                                Helpful ({review.helpful})
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Shipping Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-500 p-6 rounded-xl">
                    <Truck className="w-8 h-8 text-blue-400 mb-4" />
                    <h4 className="text-white font-semibold mb-2">
                      Free Standard Shipping
                    </h4>
                    <p className="text-white text-sm">
                      5-7 business days delivery
                    </p>
                  </div>
                  <div className="bg-slate-500 p-6 rounded-xl">
                    <Zap className="w-8 h-8 text-yellow-400 mb-4" />
                    <h4 className="text-white font-semibold mb-2">
                      Express Shipping
                    </h4>
                    <p className="text-white text-sm">
                      2-3 business days ($15.99)
                    </p>
                  </div>
                </div>
                <div className="bg-slate-500 p-6 rounded-xl">
                  <h4 className="text-white font-semibold mb-4">
                    Shipping Policy
                  </h4>
                  <ul className="text-white space-y-2">
                    <li>• Orders placed before 2 PM EST ship the same day</li>
                    <li>• Free shipping on orders over $50</li>
                    <li>• Tracking information provided via email</li>
                    <li>• Insurance included on all shipments</li>
                    <li>• International shipping available</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
