import { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { validateAddressDetails } from '@/utils/validation';
import { formatCurrency, meetsThreshold, toNumber } from '@/utils/settingsHelpers';

interface AddressDetails {
  plotNumber: string;
  buildingName: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'home' | 'work' | 'other';
  saveAs: string;
}

interface SavedAddress {
  id: string;
  name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  type: string;
  is_default: boolean;
}

interface CheckoutAddressDetailsProps {
  addressDetails: AddressDetails;
  setAddressDetails: (details: AddressDetails) => void;
  savedAddresses: SavedAddress[];
  selectedAddress: SavedAddress | null;
  setSelectedAddress: (address: SavedAddress | null) => void;
  useExistingAddress: boolean;
  setUseExistingAddress: (use: boolean) => void;
  showAddressForm: boolean;
  setShowAddressForm: (show: boolean) => void;
  settings: any;
  subtotal: number;
  currentUser: any;
  onNext: () => void;
  onPrev: () => void;
  estimatedDeliveryFee: number | null;
  setEstimatedDeliveryFee: (fee: number | null) => void;
  estimatedDeliveryTime: string | null;
  setEstimatedDeliveryTime: (time: string | null) => void;
  cartItems: any[];
  isPincodeServiceable: boolean;
  setIsPincodeServiceable: (serviceable: boolean) => void;
}

const CheckoutAddressDetails = ({
  addressDetails,
  setAddressDetails,
  savedAddresses,
  selectedAddress,
  setSelectedAddress,
  useExistingAddress,
  setUseExistingAddress,
  showAddressForm,
  setShowAddressForm,
  settings,
  subtotal,
  currentUser,
  onNext,
  onPrev
}: CheckoutAddressDetailsProps) => {
  const [addressErrors, setAddressErrors] = useState<string[]>([]);

  const handleSavedAddressSelect = (address: SavedAddress) => {
    setSelectedAddress(address);
    setUseExistingAddress(true);

    // Pre-fill address details from saved address
    setAddressDetails({
      plotNumber: address.address_line_1.split(',')[0] || '',
      buildingName: '',
      street: address.address_line_2 || '',
      landmark: address.landmark || '',
      city: address.city || '',
      state: address.state || '',
      pincode: address.pincode,
      addressType: address.type as 'home' | 'work' | 'other',
      saveAs: address.type === 'other' ? address.name : ''
    });
  };

  const handleNext = () => {
    // Validate city, state, and pincode first
    if (!addressDetails.city || !addressDetails.state || !addressDetails.pincode) {
      setAddressErrors(['Please complete all address fields.']);
      return;
    }

    if (!useExistingAddress) {
      const validation = validateAddressDetails(addressDetails);
      if (!validation.isValid) {
        setAddressErrors(validation.errors);
        return;
      }
    }
    setAddressErrors([]);
    onNext();
  };

  return (
    <Card className="border-white/10 bg-card shadow-sm">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="flex items-center text-lg text-primary uppercase font-orange-avenue font-normal tracking-wide">
          <MapPin className="h-5 w-5 mr-2 text-primary" />
          Complete Address Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">

        {/* Delivery Information */}
        <div className="bg-white/5 border border-white/10 rounded-sm p-4">
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-white text-sm">
                Nationwide Delivery
              </h4>
              <p className="text-muted-foreground text-sm mt-1">
                We deliver our royal delicacies across the country within 3-5 business days.
                {!meetsThreshold(subtotal, settings.free_delivery_threshold) && (
                  <span className="block mt-1 font-medium text-primary">
                    Add {formatCurrency(toNumber(settings.free_delivery_threshold) - subtotal, settings.currency_symbol)} more for FREE delivery!
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Saved Addresses Section */}
        {savedAddresses.length > 0 && !useExistingAddress && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-white">Use Saved Address</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddressForm(true)}
                className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
              >
                Add New Address
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {savedAddresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-4 border rounded-sm cursor-pointer transition-all ${selectedAddress?.id === address.id
                    ? 'border-primary bg-primary/10'
                    : 'border-white/10 hover:border-primary/50'
                    }`}
                  onClick={() => handleSavedAddressSelect(address)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-white">{address.name}</span>
                        <span className="text-xs bg-white/10 text-muted-foreground px-2 py-1 rounded-sm uppercase tracking-wide">
                          {address.type}
                        </span>
                        {address.is_default && (
                          <span className="text-xs bg-primary text-white px-2 py-1 rounded-sm uppercase tracking-wide">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {address.address_line_1}
                        {address.address_line_2 && `, ${address.address_line_2}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setShowAddressForm(true)}
                className="text-primary hover:text-primary hover:bg-white/5"
              >
                + Add New Address Instead
              </Button>
            </div>
          </div>
        )}

        {/* Show address form if no saved addresses or user wants to add new */}
        {(savedAddresses.length === 0 || showAddressForm || useExistingAddress) && (
          <>
            {useExistingAddress && (
              <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-900/30 rounded-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-400">
                    Using saved address: {selectedAddress?.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setUseExistingAddress(false);
                    setSelectedAddress(null);
                    setShowAddressForm(true);
                  }}
                  className="text-green-400 hover:text-green-300 hover:bg-green-900/30"
                >
                  Change
                </Button>
              </div>
            )}

            {/* Current Address Display */}
            <div className="bg-white/5 border border-white/10 rounded-sm p-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-white text-sm">
                    Delivery Address
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {addressDetails.city && addressDetails.state && addressDetails.pincode
                      ? `${addressDetails.city}, ${addressDetails.state} - ${addressDetails.pincode}`
                      : 'Please fill in your city, state, and pincode below'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="plotNumber" className="text-sm font-medium text-white">
                  Plot/House Number *
                </Label>
                <Input
                  id="plotNumber"
                  type="text"
                  placeholder="e.g., 123, A-45"
                  value={addressDetails.plotNumber}
                  onChange={(e) => setAddressDetails({ ...addressDetails, plotNumber: e.target.value })}
                  className="h-12 border-white/20 focus:ring-primary bg-background text-white placeholder:text-muted-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buildingName" className="text-sm font-medium text-white">
                  Building/Society Name
                </Label>
                <Input
                  id="buildingName"
                  type="text"
                  placeholder="e.g., Green Valley Apartments"
                  value={addressDetails.buildingName}
                  onChange={(e) => setAddressDetails({ ...addressDetails, buildingName: e.target.value })}
                  className="h-12 border-white/20 focus:ring-primary bg-background text-white placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="street" className="text-sm font-medium text-white">
                Street/Area *
              </Label>
              <Input
                id="street"
                type="text"
                placeholder="e.g., MG Road, Sector 15"
                value={addressDetails.street}
                onChange={(e) => setAddressDetails({ ...addressDetails, street: e.target.value })}
                className="h-12 border-white/20 focus:ring-primary bg-background text-white placeholder:text-muted-foreground"
                required
              />
            </div>

            {/* City, State, and Pincode */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-white">
                  City *
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                  value={addressDetails.city}
                  onChange={(e) => setAddressDetails({ ...addressDetails, city: e.target.value })}
                  className="h-12 border-white/20 focus:ring-primary bg-background text-white placeholder:text-muted-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium text-white">
                  State *
                </Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="Enter your state"
                  value={addressDetails.state}
                  onChange={(e) => setAddressDetails({ ...addressDetails, state: e.target.value })}
                  className="h-12 border-white/20 focus:ring-primary bg-background text-white placeholder:text-muted-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-sm font-medium text-white">
                  Pincode *
                </Label>
                <Input
                  id="pincode"
                  type="text"
                  placeholder="Enter 6-digit pincode"
                  value={addressDetails.pincode}
                  onChange={(e) => setAddressDetails({ ...addressDetails, pincode: e.target.value })}
                  className="h-12 border-white/20 focus:ring-primary bg-background text-white placeholder:text-muted-foreground"
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="landmark" className="text-sm font-medium text-white">
                Nearby Landmark
              </Label>
              <Input
                id="landmark"
                type="text"
                placeholder="e.g., Near Metro Station"
                value={addressDetails.landmark}
                onChange={(e) => setAddressDetails({ ...addressDetails, landmark: e.target.value })}
                className="h-12 border-white/20 focus:ring-primary bg-background text-white placeholder:text-muted-foreground"
              />
            </div>

            {/* Address saving options - only show for authenticated users */}
            {currentUser && (
              <div className="space-y-3">
                <Label className="text-xs font-medium text-white">Save this address as</Label>
                <RadioGroup
                  value={addressDetails.addressType}
                  onValueChange={(value: 'home' | 'work' | 'other') =>
                    setAddressDetails({ ...addressDetails, addressType: value })
                  }
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="home" className="text-primary border-primary" />
                    <Label htmlFor="home" className="cursor-pointer text-muted-foreground">Home</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="work" id="work" className="text-primary border-primary" />
                    <Label htmlFor="work" className="cursor-pointer text-muted-foreground">Work</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" className="text-primary border-primary" />
                    <Label htmlFor="other" className="cursor-pointer text-muted-foreground">Other</Label>
                  </div>
                </RadioGroup>

                {addressDetails.addressType === 'other' && (
                  <Input
                    placeholder="Enter custom name (e.g., Friend's Place)"
                    value={addressDetails.saveAs}
                    onChange={(e) => setAddressDetails({ ...addressDetails, saveAs: e.target.value })}
                    className="h-12 mt-2 border-white/20 focus:ring-primary bg-background text-white"
                  />
                )}
              </div>
            )}

            {/* Save Address Option - only show for authenticated users */}
            {currentUser && !useExistingAddress && (
              <div className="flex items-center space-x-2 p-4 bg-white/5 border border-white/10 rounded-sm">
                <input
                  type="checkbox"
                  id="saveAddress"
                  checked={true}
                  readOnly
                  className="rounded text-primary focus:ring-primary bg-background border-white/20"
                />
                <Label htmlFor="saveAddress" className="text-sm text-white">
                  Save this address to your profile for future orders
                  {savedAddresses.length >= 3 && (
                    <span className="block text-xs text-orange-500 mt-1">
                      ⚠️ You have reached the maximum limit of 3 saved addresses
                    </span>
                  )}
                </Label>
              </div>
            )}
          </>
        )}

        {addressErrors.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-sm text-sm">
            {addressErrors.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrev} size="lg" className="px-8 border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white bg-transparent">
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              useExistingAddress
                ? !selectedAddress || !addressDetails.city || !addressDetails.state || !addressDetails.pincode
                : !addressDetails.plotNumber || !addressDetails.street || !addressDetails.city || !addressDetails.state || !addressDetails.pincode
            }
            size="lg"
            className="px-8 bg-primary hover:bg-primary/90 text-white text-sm"
          >
            Continue to Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutAddressDetails;