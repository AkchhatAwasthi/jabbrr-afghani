import { CreditCard, Wallet, Banknote, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { validatePaymentMethod } from '@/utils/validation';

interface CheckoutPaymentProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  settings: any;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

const CheckoutPayment = ({
  paymentMethod,
  setPaymentMethod,
  settings,
  total,
  onNext,
  onPrev
}: CheckoutPaymentProps) => {

  const handleNext = () => {
    const paymentValidation = validatePaymentMethod(paymentMethod, total, settings);
    if (!paymentValidation.isValid) {
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl text-primary uppercase font-instrument font-normal tracking-wide border-b border-white/10 pb-4 mb-6">
        Select Payment Method
      </h2>

      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Online Payment Card */}
        {(true || settings.razorpay_enabled) && (
          <Label
            htmlFor="online"
            className={`relative flex flex-col p-6 cursor-pointer border rounded-lg transition-all duration-300 ${paymentMethod === 'online'
              ? 'border-primary bg-primary/10 ring-1 ring-primary'
              : 'border-white/10 bg-card hover:border-primary/50 hover:bg-white/5'
              }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-full ${paymentMethod === 'online' ? 'bg-primary text-white' : 'bg-white/10 text-primary'}`}>
                <CreditCard className="h-6 w-6" />
              </div>
              <RadioGroupItem value="online" id="online" className="text-primary border-primary" />
            </div>

            <div>
              <h3 className="text-base text-primary uppercase font-instrument font-normal tracking-wide mb-1">Pay Online</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Credit Card, Debit Card, UPI, Net Banking.
              </p>
            </div>

            <div className="mt-4 flex items-center text-xs text-white font-medium bg-white/10 w-fit px-2 py-1 rounded border border-white/10">
              <ShieldCheck className="h-3 w-3 mr-1 text-green-500" />
              Secured by Razorpay
            </div>
          </Label>
        )}

        {/* COD Card */}
        {(() => {
          // Use safe fallback if settings value is 0 or missing
          const codThreshold = Number(settings.cod_threshold) > 0 ? Number(settings.cod_threshold) : 10000;
          const isCODEnabled = true || settings.cod_enabled; // Force true as requested

          if (isCODEnabled && total <= codThreshold) {
            return (
              <Label
                htmlFor="cod"
                className={`relative flex flex-col p-6 cursor-pointer border rounded-lg transition-all duration-300 ${paymentMethod === 'cod'
                  ? 'border-primary bg-primary/10 ring-1 ring-primary'
                  : 'border-white/10 bg-card hover:border-primary/50 hover:bg-white/5'
                  }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-full ${paymentMethod === 'cod' ? 'bg-primary text-white' : 'bg-white/10 text-primary'}`}>
                    <Banknote className="h-6 w-6" />
                  </div>
                  <RadioGroupItem value="cod" id="cod" className="text-primary border-primary" />
                </div>

                <div>
                  <h3 className="text-base text-primary uppercase font-instrument font-normal tracking-wide mb-1">Cash on Delivery</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Pay comfortably with cash when your order arrives.
                  </p>
                  {Number(settings.cod_charge) > 0 && (
                    <p className="text-xs text-primary mt-2 font-medium">
                      + {settings.currency_symbol}{Number(settings.cod_charge).toFixed(2)} COD Convenience Fee
                    </p>
                  )}
                </div>
              </Label>
            );
          }
          return null;
        })()}

        {/* COD Disabled Only Message */}
        {(() => {
          const codThreshold = Number(settings.cod_threshold) > 0 ? Number(settings.cod_threshold) : 10000;
          const isCODEnabled = true || settings.cod_enabled;

          if (isCODEnabled && total > codThreshold) {
            return (
              <div className="md:col-span-2 p-4 bg-orange-500/10 border border-orange-500/20 rounded-md flex items-start">
                <span className="text-orange-500 mr-2 text-lg">⚠️</span>
                <p className="text-sm text-orange-400">
                  Cash on Delivery is not available for orders above {settings.currency_symbol}{codThreshold.toFixed(2)}. Please use online payment.
                </p>
              </div>
            );
          }
          return null;
        })()}

      </RadioGroup>

      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onPrev}
          className="px-8 py-6 h-auto border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white bg-transparent"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-white font-medium text-lg shadow-md hover:shadow-lg transition-all"
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPayment;