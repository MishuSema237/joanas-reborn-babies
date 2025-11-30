"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ClearCartOnMount } from "@/components/cart/clear-cart-on-mount";
import { PrintButton } from "@/components/order/print-button";
import { FaCopy, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

export default function OrderConfirmationPage() {
  const params = useParams();
  const reference = params.reference as string;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${reference.toUpperCase()}`);
        if (!response.ok) {
          notFound();
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [reference]);

  const handleCopyReference = async () => {
    try {
      await navigator.clipboard.writeText(order.orderReference);
      setCopied(true);
      toast.success("Order reference copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-viewport mx-auto flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    notFound();
  }

  const orderItems = order.items;
  const total = order.payment.totalAmount;

  return (
    <div className="w-full max-w-viewport mx-auto print:max-w-none">
      <ClearCartOnMount />

      <div className="max-w-3xl mx-auto text-center print:text-left">
        {/* Success Icon/Message */}
        <div className="mb-8 print:hidden">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-500 mb-2">
            Thank you for your order request. We've received it and will contact
            you shortly.
          </p>
        </div>

        {/* Print Header */}
        <div className="hidden print:block mb-8 text-center">
          <div className="flex justify-center mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/owners-logo/Joannas Reborns Logo.jpg"
              alt="Joanna's Reborns Logo"
              className="h-24 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Receipt</h1>
          <p className="text-gray-500">Joanna's Reborns</p>
        </div>

        {/* Order Details */}
        <div className="bg-gray-100 p-8 border border-gray-300 text-left mb-8 print:bg-white print:border-none print:p-0">
          <h2 className="mb-6 text-center print:text-left print:text-2xl">Order Details</h2>

          <div className="mb-6">
            <p className="font-semibold mb-2">Order Reference:</p>
            <div className="flex items-center gap-3">
              <p className="text-xl font-bold mb-0">{order.orderReference}</p>
              <button
                onClick={handleCopyReference}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors print:hidden"
                aria-label="Copy order reference"
              >
                {copied ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaCopy className="text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-2">Items:</p>
            <ul className="space-y-2">
              {orderItems.map((item: any, index: number) => (
                <li key={index} className="flex justify-between border-b border-gray-200 pb-2 last:border-0">
                  <span>
                    {item.name} (Qty: {item.quantity})
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-300 pt-4 mb-6">
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>${orderItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Shipping</span>
              <span>${(total - orderItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t border-gray-200 pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">
            <div className="mb-6">
              <p className="font-semibold mb-2">Shipping Address:</p>
              <p className="text-gray-700">
                {order.shipping.address}
                <br />
                {order.shipping.city}
                {order.shipping.state && `, ${order.shipping.state}`}{" "}
                {order.shipping.zipCode}
                <br />
                {order.shipping.country}
              </p>
            </div>

            <div className="mb-6">
              <p className="font-semibold mb-2">Payment Method:</p>
              <p className="text-gray-700">{order.payment.preferredMethod}</p>
            </div>
          </div>

          <div className="bg-pink-50 p-4 border border-pink-200 rounded print:hidden">
            <p className="text-sm text-gray-700 mb-0">
              <strong>Next Steps:</strong> We will contact you at{" "}
              {order.customer.email} within 24 hours with payment details. No
              immediate payment is required.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <Button href="/shop">Continue Shopping</Button>
          <PrintButton />
          <Button variant="outline" href="/">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}

