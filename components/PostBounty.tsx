'use client';

import { useState } from 'react';
import { TextInput } from './TextInput';
import { PrimaryButton } from './PrimaryButton';
import { MapPin, Package, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { formatEth } from '@/lib/utils';
import { MIN_BOUNTY_AMOUNT, MAX_BOUNTY_AMOUNT, PLATFORM_FEE_PERCENTAGE } from '@/lib/constants';

interface BountyFormData {
  pickupLocation: string;
  dropoffLocation: string;
  itemDescription: string;
  rewardAmount: string;
  urgency: 'low' | 'medium' | 'high';
  specialInstructions: string;
}

export function PostBounty() {
  const [formData, setFormData] = useState<BountyFormData>({
    pickupLocation: '',
    dropoffLocation: '',
    itemDescription: '',
    rewardAmount: '',
    urgency: 'medium',
    specialInstructions: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BountyFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<BountyFormData> = {};
    
    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required';
    }
    
    if (!formData.dropoffLocation.trim()) {
      newErrors.dropoffLocation = 'Dropoff location is required';
    }
    
    if (!formData.itemDescription.trim()) {
      newErrors.itemDescription = 'Item description is required';
    }
    
    if (!formData.rewardAmount.trim()) {
      newErrors.rewardAmount = 'Reward amount is required';
    } else {
      const amount = parseFloat(formData.rewardAmount);
      if (isNaN(amount) || amount < parseFloat(MIN_BOUNTY_AMOUNT)) {
        newErrors.rewardAmount = `Minimum reward is ${MIN_BOUNTY_AMOUNT} ETH`;
      } else if (amount > parseFloat(MAX_BOUNTY_AMOUNT)) {
        newErrors.rewardAmount = `Maximum reward is ${MAX_BOUNTY_AMOUNT} ETH`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would:
      // 1. Create the bounty on-chain via smart contract
      // 2. Lock the reward amount in escrow
      // 3. Store metadata on IPFS via Pinata
      // 4. Update the UI with the new bounty
      
      console.log('Creating bounty:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form on success
      setFormData({
        pickupLocation: '',
        dropoffLocation: '',
        itemDescription: '',
        rewardAmount: '',
        urgency: 'medium',
        specialInstructions: '',
      });
      
      alert('Bounty posted successfully!');
      
    } catch (error) {
      console.error('Error creating bounty:', error);
      alert('Failed to create bounty. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof BountyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const calculatePlatformFee = () => {
    const amount = parseFloat(formData.rewardAmount) || 0;
    return (amount * PLATFORM_FEE_PERCENTAGE / 100).toFixed(4);
  };

  const calculateTotal = () => {
    const amount = parseFloat(formData.rewardAmount) || 0;
    const fee = parseFloat(calculatePlatformFee());
    return (amount + fee).toFixed(4);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Post a Delivery Bounty
          </h1>
          <p className="text-purple-200">
            Create a delivery request and connect with trusted couriers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <TextInput
                label="Pickup Location"
                placeholder="Enter pickup address..."
                value={formData.pickupLocation}
                onChange={(value) => updateFormData('pickupLocation', value)}
                variant="withLabel"
                required
              />
              {errors.pickupLocation && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.pickupLocation}
                </p>
              )}
            </div>
            
            <div>
              <TextInput
                label="Dropoff Location"
                placeholder="Enter delivery address..."
                value={formData.dropoffLocation}
                onChange={(value) => updateFormData('dropoffLocation', value)}
                variant="withLabel"
                required
              />
              {errors.dropoffLocation && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.dropoffLocation}
                </p>
              )}
            </div>
          </div>

          {/* Item Description */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Item Description <span className="text-red-400">*</span>
            </label>
            <textarea
              placeholder="Describe what needs to be delivered..."
              value={formData.itemDescription}
              onChange={(e) => updateFormData('itemDescription', e.target.value)}
              rows={3}
              className="input-field resize-none"
              required
            />
            {errors.itemDescription && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.itemDescription}
              </p>
            )}
          </div>

          {/* Reward and Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <TextInput
                label="Reward Amount (ETH)"
                placeholder="0.05"
                value={formData.rewardAmount}
                onChange={(value) => updateFormData('rewardAmount', value)}
                variant="withLabel"
                type="number"
                required
              />
              {errors.rewardAmount && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.rewardAmount}
                </p>
              )}
              <p className="text-purple-300 text-xs mt-1">
                Min: {MIN_BOUNTY_AMOUNT} ETH, Max: {MAX_BOUNTY_AMOUNT} ETH
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Urgency Level
              </label>
              <select
                value={formData.urgency}
                onChange={(e) => updateFormData('urgency', e.target.value)}
                className="input-field"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              placeholder="Any special handling instructions..."
              value={formData.specialInstructions}
              onChange={(e) => updateFormData('specialInstructions', e.target.value)}
              rows={2}
              className="input-field resize-none"
            />
          </div>

          {/* Cost Breakdown */}
          {formData.rewardAmount && !errors.rewardAmount && (
            <div className="glass-card p-4 bg-opacity-5">
              <h3 className="text-white font-medium mb-3">Cost Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-200">Courier Reward:</span>
                  <span className="text-white">{formatEth(formData.rewardAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Platform Fee ({PLATFORM_FEE_PERCENTAGE}%):</span>
                  <span className="text-white">{formatEth(calculatePlatformFee())}</span>
                </div>
                <div className="border-t border-white border-opacity-20 pt-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-white">Total Cost:</span>
                    <span className="text-white">{formatEth(calculateTotal())}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <PrimaryButton
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Creating Bounty...' : 'Post Bounty'}
            </PrimaryButton>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-500 bg-opacity-20 border border-blue-400 border-opacity-30 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-200">
              <p className="font-medium mb-1">How it works:</p>
              <ul className="space-y-1 text-xs">
                <li>• Your reward will be locked in a smart contract escrow</li>
                <li>• Couriers can accept your bounty and begin delivery</li>
                <li>• Payment is automatically released upon delivery confirmation</li>
                <li>• Both parties can rate each other to build reputation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
