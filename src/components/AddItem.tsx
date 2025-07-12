import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react';

const categories = [
  'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories', 'Activewear', 'Sleepwear'
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

const conditions = [
  { value: 'new', label: 'New with Tags', points: 50 },
  { value: 'like-new', label: 'Like New', points: 40 },
  { value: 'excellent', label: 'Excellent', points: 30 },
  { value: 'good', label: 'Good', points: 20 },
  { value: 'fair', label: 'Fair', points: 10 }
];

export default function AddItem() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    type: 'swap',
    condition: '',
    tags: ''
  });
  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to add items</h2>
          <Link to="/login" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
    console.log('Files dropped');
  };

  const addImagePlaceholder = () => {
    const placeholderUrls = [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'
    ];
    
    const newImage = placeholderUrls[images.length % placeholderUrls.length];
    setImages([...images, newImage]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData, images);
    // Handle form submission
  };

  const selectedCondition = conditions.find(c => c.value === formData.condition);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="md:ml-64">
        <div className="p-4 md:p-6 pt-16 md:pt-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Add New Item</h1>
            <p className="text-sm md:text-base text-gray-600">List your clothing item for swapping or donation</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column - Images */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-3 md:mb-4">Item Images</label>
                  
                  {/* Image Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-colors ${
                      isDragging ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-green-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                    <p className="text-sm md:text-base text-gray-600 mb-2">Drag and drop images here, or</p>
                    <button
                      type="button"
                      onClick={addImagePlaceholder}
                      className="bg-green-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm md:text-base"
                    >
                      Choose Files
                    </button>
                    <p className="text-xs md:text-sm text-gray-500 mt-2">Upload up to 6 images</p>
                  </div>

                  {/* Image Preview Grid */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3 md:h-4 md:w-4" />
                          </button>
                        </div>
                      ))}
                      {images.length < 6 && (
                        <button
                          type="button"
                          onClick={addImagePlaceholder}
                          className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-green-400 transition-colors"
                        >
                          <Plus className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                    Item Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                    placeholder="e.g., Vintage Denim Jacket"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                    placeholder="Describe the item, its condition, styling tips, etc."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category.toLowerCase()}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="size" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                      Size
                    </label>
                    <select
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                      required
                    >
                      <option value="">Select size</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-3">
                    Listing Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <label className="flex items-center space-x-3 p-3 md:p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-400 transition-colors">
                      <input
                        type="radio"
                        name="type"
                        value="swap"
                        checked={formData.type === 'swap'}
                        onChange={handleInputChange}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900 text-sm md:text-base">Swap</div>
                        <div className="text-xs md:text-sm text-gray-500">Trade for other items</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 p-3 md:p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-400 transition-colors">
                      <input
                        type="radio"
                        name="type"
                        value="donate"
                        checked={formData.type === 'donate'}
                        onChange={handleInputChange}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900 text-sm md:text-base">Donate</div>
                        <div className="text-xs md:text-sm text-gray-500">Give away for free</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="condition" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                    required
                  >
                    <option value="">Select condition</option>
                    {conditions.map((condition) => (
                      <option key={condition.value} value={condition.value}>
                        {condition.label} ({condition.points} points)
                      </option>
                    ))}
                  </select>
                  {selectedCondition && (
                    <div className="mt-2 p-3 bg-green-50 rounded-lg">
                      <p className="text-xs md:text-sm text-green-700">
                        This item will be worth <strong>{selectedCondition.points} points</strong> when swapped.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                    Tags (optional)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                    placeholder="vintage, summer, casual (comma separated)"
                  />
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 md:pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white py-3 px-4 md:px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm md:text-base"
                  >
                    List Item
                  </button>
                  <Link
                    to="/dashboard"
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 md:px-6 rounded-lg font-semibold text-center hover:bg-gray-300 transition-colors text-sm md:text-base"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}