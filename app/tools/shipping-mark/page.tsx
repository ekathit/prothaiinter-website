import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import ShippingMarkGenerator from "./ShippingMarkGenerator";

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shipping Mark Generator | ProThai",
  description: "Internal ProThai A4 shipping mark generator.",
  robots: { index: false, follow: false },
};

export default function ShippingMarkPage() {
  return (
    <div className={notoThai.variable}>
      <ShippingMarkGenerator />
    </div>
  );
}
