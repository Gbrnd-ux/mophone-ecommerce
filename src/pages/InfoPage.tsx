import { Breadcrumb } from "../components/Breadcrumb";

export function InfoPage({ pageId, navigate }: { pageId: string; navigate: (path: string) => void }) {
  const contentMap: Record<string, { title: string; content: React.ReactNode }> = {
    "buying-guide": {
      title: "Buying Guide",
      content: (
        <div className="space-y-6">
          <p>Not sure which Mophone is right for you? Our comprehensive buying guide will help you decide based on your needs, budget, and lifestyle.</p>
          <h3 className="font-medium text-lg mt-8 text-[#0f0e0d]">For Photography Enthusiasts</h3>
          <p>If capturing life's moments is your top priority, consider devices in our 'Pro' or 'Ultra' series. They feature advanced multi-lens systems, large sensors, and dedicated image processing units.</p>
          <h3 className="font-medium text-lg mt-8 text-[#0f0e0d]">For Power Users & Gamers</h3>
          <p>Look for devices featuring the latest Snapdragon or MediaTek Dimensity processors, coupled with high refresh rate displays (120Hz+) and large battery capacities with hypercharge capabilities.</p>
        </div>
      )
    },
    "shipping": {
      title: "Shipping & Returns",
      content: (
        <div className="space-y-6">
          <h3 className="font-medium text-lg mt-4 text-[#0f0e0d]">Free Shipping</h3>
          <p>We offer free standard shipping on all orders over $150. Most standard shipments arrive within 3-5 business days.</p>
          <h3 className="font-medium text-lg mt-8 text-[#0f0e0d]">30-Day Return Policy</h3>
          <p>If you're not completely satisfied with your purchase, you may return it within 30 days of receipt for a full refund. Devices must be in their original condition and packaging.</p>
        </div>
      )
    },
    "faq": {
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-6">
          <h3 className="font-medium text-lg mt-4 text-[#0f0e0d]">Do your phones come with a warranty?</h3>
          <p>Yes, all Mophone devices come with a standard 1-year limited warranty covering manufacturing defects.</p>
          <h3 className="font-medium text-lg mt-8 text-[#0f0e0d]">Can I trade in my old device?</h3>
          <p>Absolutely. We offer a competitive trade-in program. You can get an estimated value during the checkout process.</p>
          <h3 className="font-medium text-lg mt-8 text-[#0f0e0d]">Are the devices unlocked?</h3>
          <p>Yes, all smartphones sold directly through our store are factory unlocked and compatible with major GSM carriers worldwide.</p>
        </div>
      )
    },
    "contact": {
      title: "Contact Us",
      content: (
        <div className="space-y-6">
          <p>We're here to help! Our customer support team is available Monday through Friday, 9am to 6pm EST.</p>
          <div className="mt-8">
            <p className="font-medium text-[#0f0e0d]">Email:</p>
            <p>support@mophone.com</p>
          </div>
          <div className="mt-4">
            <p className="font-medium text-[#0f0e0d]">Phone:</p>
            <p>1-800-MOPHONE (1-800-667-4663)</p>
          </div>
        </div>
      )
    },
    "about": {
      title: "About Mophone",
      content: (
        <div className="space-y-6">
          <p>Founded in 2026, Mophone is dedicated to bringing the most advanced mobile technology to users around the globe.</p>
          <p>We believe that a smartphone is more than just a device; it's a window to the world, a canvas for creativity, and a vital tool for connection. Our mission is to provide premium, uncompromising hardware that empowers you to do more.</p>
        </div>
      )
    },
    "sustainability": {
      title: "Sustainability",
      content: (
        <div className="space-y-6">
          <p>At Mophone, we recognize our responsibility to the planet. We are committed to reducing our environmental footprint across all areas of our business.</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>100% recycled packaging materials</li>
            <li>Carbon neutral shipping options</li>
            <li>Comprehensive device recycling program</li>
            <li>Conflict-free mineral sourcing</li>
          </ul>
        </div>
      )
    },
    "careers": {
      title: "Careers at Mophone",
      content: (
        <div className="space-y-6">
          <p>Join the team that's redefining the mobile experience. We're always looking for passionate, innovative individuals to join us in engineering, design, marketing, and customer support.</p>
          <p className="mt-8 italic text-sm">There are currently no open positions. Please check back later.</p>
        </div>
      )
    },
    "press": {
      title: "Press & Media",
      content: (
        <div className="space-y-6">
          <p>For press inquiries, media assets, and interview requests, please contact our PR team.</p>
          <div className="mt-8">
            <p className="font-medium text-[#0f0e0d]">Media Contact:</p>
            <p>press@mophone.com</p>
          </div>
        </div>
      )
    }
  };

  const page = contentMap[pageId] || {
    title: "Page Not Found",
    content: <p>The page you are looking for does not exist.</p>
  };

  const formattedTitle = page.title;

  return (
    <div className="page-enter min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-12">
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: formattedTitle },
          ]}
        />
        
        <h1 className="font-display text-4xl md:text-5xl font-light text-[#0f0e0d] mb-12">
          {formattedTitle}
        </h1>
        
        <div className="text-[#6b6459] leading-relaxed">
          {page.content}
        </div>
      </div>
    </div>
  );
}