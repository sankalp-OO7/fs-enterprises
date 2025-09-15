import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // Enhanced Primary Meta Tags for Better SEO
  title: "Jindam Elevations | Best ACP Panel & Glass Glazing Contractors in Nanded, Maharashtra | Top Exterior Design Company India",
  description: "Jindam Elevations - Premier ACP Panel Installation, Glass Glazing & Exterior Elevation contractors in Nanded, Maharashtra. 10+ years experience serving Marathwada region. Expert Aluminium Composite Panel work, Structural Glazing, Building Facade design. Best rates guaranteed. Call +91-9637894561 for free quote.",
  
  // Comprehensive Keywords for Indian Local SEO
  keywords: "Jindam Elevations Nanded, Best ACP Panel Contractors Nanded, Glass Glazing Services Nanded Maharashtra, Exterior Elevation Design Nanded, Aluminium Composite Panel Work Nanded, ACP Cladding Contractors Maharashtra, Professional Building Facade Nanded, Shop Front Elevation Nanded, Structural Glazing Nanded, ACP Sheet Installation Nanded, Glass Work Contractors Nanded, Exterior Paneling Services Nanded, Commercial Building Elevation Nanded, Residential Elevation Design Nanded, ACP Panel Price Nanded, Glass Glazing Cost Nanded, Top Exterior Design Company Maharashtra, Modern Building Renovation Nanded, Contemporary Elevation Design Nanded, ACP Panel Fixing Services Nanded, Curtain Wall Glazing Nanded, Composite Panel Work Nanded, Building Exterior Contractors Nanded, Architecture Elevation Services Nanded, ACP Work Near Me Nanded, Glass Facade Design Nanded, Elevation Contractors Marathwada Region, ACP Panel Dealers Nanded, Glass Glazing Services Maharashtra, Exterior Wall Cladding Nanded, Building Modernization Services Nanded, ACP Panel Installation Cost Nanded, Commercial Glazing Contractors Nanded, Residential ACP Work Nanded, Exterior Renovation Specialists Nanded, Modern Glass Work Nanded, Premium ACP Paneling Nanded, Professional Elevation Contractors Maharashtra, Building Facade Experts Nanded, Quality Glass Glazing Nanded, Trusted ACP Panel Services Nanded, Marathwada ACP Contractors, Nanded Glass Work Specialists, Top Elevation Design Company Maharashtra, नांदेड मध्ये एसीपी पॅनेलिंग, काच काम नांदेड, बाह्य सजावट सेवा नांदेड, एसीपी पत्रे काम नांदेड, काच झाकण काम नांदेड, बिल्डिंग एलिव्हेशन नांदेड, दुकान समोरील डिझाइन नांदेड, व्यावसायिक बांधकाम नांदेड, आधुनिक इमारत डिझाइन नांदेड",

  // Author and Publisher Information
  author: "Jindam Elevations",
  publisher: "Jindam Elevations Nanded",
  
  // Geo-targeting for Indian Market
  "geo.region": "IN-MH",
  "geo.placename": "Nanded, Maharashtra, India",
  "geo.position": "19.1383;77.3210",
  "ICBM": "19.1383, 77.3210",
  
  // Language and Content Specifications
  "content-language": "en-IN, hi-IN, mr-IN",
  
  // Enhanced Robots Configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': "large",
      'max-video-preview': -1,
    },
    bingBot: {
      index: true,
      follow: true,
      nocache: false,
    },
  },

  // Enhanced Open Graph using existing banner.png
  openGraph: {
    title: "Jindam Elevations | Top ACP Panel & Glass Glazing Experts in Nanded, Maharashtra",
    description: "Premier ACP Panel Installation, Glass Glazing & Exterior Elevation services in Nanded, Maharashtra. 900+ projects completed across Marathwada region. Expert contractors for commercial & residential buildings. Best prices guaranteed in Maharashtra!",
    url: "https://jindam-elevations.vercel.app/",
    type: "website",
    locale: "en_IN",
    siteName: "Jindam Elevations - ACP & Glazing Specialists",
    images: [
      {
        url: "https://jindam-elevations.vercel.app/banner.png",
        width: 1200,
        height: 630,
        alt: "Jindam Elevations: Leading ACP Panel & Glass Glazing Contractors in Nanded, Maharashtra - Best Exterior Design Services",
        type: "image/png",
      },
    ],
  },

  // Enhanced Twitter Card using existing banner.png
  twitter: {
    card: "summary_large_image",
    site: "@JindamElevations",
    creator: "@JindamElevations",
    title: "Jindam Elevations | Best ACP Panel & Glass Glazing in Nanded, Maharashtra",
    description: "Top-rated ACP Panel Installation & Glass Glazing services in Nanded. 10+ years experience, 900+ completed projects. Professional exterior elevation contractors in Maharashtra.",
    images: [
      {
        url: "https://jindam-elevations.vercel.app/banner.png",
        alt: "Jindam Elevations: Professional ACP & Glass Glazing Contractors in Nanded, Maharashtra",
        width: 1200,
        height: 630,
      },
    ],
  },

  // Using existing favicons
  icons: {
    icon: '/favicon.ico',
    apple: '/banner.png',
  },
  
   
  // Additional Meta Tags for Enhanced SEO (no external assets required)
  other: {
    // Business Information
    "business.hours": "Monday-Saturday: 9:00 AM - 7:00 PM, Sunday: 10:00 AM - 5:00 PM",
    "business.contact_data.street_address": "Near Lokmanya Mangal Karyalay, Samrat Nagar, Annabhau Sathe Chowk",
    "business.contact_data.locality": "Nanded",
    "business.contact_data.region": "Maharashtra",
    "business.contact_data.postal_code": "431602",
    "business.contact_data.country_name": "India",
    "business.contact_data.phone_number": "+91-9637894561",
    
    // Mobile and Performance
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Jindam Elevations",
    
    // Content Classification
    "rating": "general",
    "distribution": "global",
    "revisit-after": "7 days",
    
    // Format Detection
    "format-detection": "telephone=yes, address=yes, email=yes",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" dir="ltr">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://jindam-elevations.vercel.app/" />
        
        {/* Alternate Language Versions */}
        <link rel="alternate" hrefLang="en-IN" href="https://jindam-elevations.vercel.app/" />
        <link rel="alternate" hrefLang="hi-IN" href="https://jindam-elevations.vercel.app/" />
        <link rel="alternate" hrefLang="mr-IN" href="https://jindam-elevations.vercel.app/" />
        <link rel="alternate" hrefLang="x-default" href="https://jindam-elevations.vercel.app/" />
        
        {/* Performance Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Preload existing banner image */}
        <link rel="preload" href="/banner.png" as="image" type="image/png" />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {/* Accessibility Skip Link */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>
        
        <main id="main-content" itemProp="mainContentOfPage">
          {children}
        </main>

        {/* Comprehensive Schema.org Structured Data - No External Assets Required */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              // Enhanced Local Business Schema
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://jindam-elevations.vercel.app/#localbusiness",
                "name": "Jindam Elevations",
                "alternateName": ["Jindam Elevations Nanded", "जिंदम एलिव्हेशन्स नांदेड"],
                "description": "Jindam Elevations is Maharashtra's premier exterior design company specializing in ACP Panel Installation, Glass Glazing, Structural Glazing, and Exterior Elevation services. Based in Nanded, we serve the entire Marathwada region with over 10 years of experience and 900+ completed projects across commercial and residential sectors.",
                "image": "https://jindam-elevations.vercel.app/banner.png",
                "logo": "https://jindam-elevations.vercel.app/banner.png",
                "url": "https://jindam-elevations.vercel.app/",
                "telephone": "+91-9637894561",
                "priceRange": "₹₹₹",
                "hasMap": "https://maps.app.goo.gl/aoGykiGfxyiz83hw7", // **IMPORTANT: Replace with your ACTUAL Google Maps URL.**
                "sameAs": [
                  "https://www.facebook.com/your-jindam-elevations-page", // Replace with actual links
                  "https://www.instagram.com/your-jindam-elevations-page",
                  "https://www.linkedin.com/company/your-jindam-elevations-page",
                ],
                "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "UPI", "Cheque", "NEFT", "RTGS"],
                "currenciesAccepted": "INR",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Near Lokmanya Mangal Karyalay, Samrat Nagar, Annabhau Sathe Chowk",
                  "addressLocality": "Nanded",
                  "addressRegion": "Maharashtra",
                  "postalCode": "431602",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 19.1383,
                  "longitude": 77.3210
                },
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:00",
                    "closes": "19:00"
                  },
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Sunday",
                    "opens": "10:00",
                    "closes": "17:00"
                  }
                ],
                "areaServed": [
                  {
                    "@type": "City",
                    "name": "Nanded",
                    "addressRegion": "Maharashtra",
                    "addressCountry": "India"
                  },
                  {
                    "@type": "City",
                    "name": "Aurangabad",
                    "addressRegion": "Maharashtra", 
                    "addressCountry": "India"
                  },
                  {
                    "@type": "City",
                    "name": "Latur",
                    "addressRegion": "Maharashtra",
                    "addressCountry": "India"
                  },
                  {
                    "@type": "City",
                    "name": "Parbhani",
                    "addressRegion": "Maharashtra",
                    "addressCountry": "India"
                  },
                  {
                    "@type": "City",
                    "name": "Hingoli",
                    "addressRegion": "Maharashtra",
                    "addressCountry": "India"
                  },
                  {
                    "@type": "AdministrativeArea",
                    "name": "Marathwada Region",
                    "addressRegion": "Maharashtra",
                    "addressCountry": "India"
                  }
                ],
                "serviceArea": {
                  "@type": "GeoCircle",
                  "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": 19.1383,
                    "longitude": 77.3210
                  },
                  "geoRadius": "200000"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "156",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Exterior Design Services Catalog",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "ACP Panel Installation",
                        "description": "Professional Aluminium Composite Panel installation for commercial and residential buildings",
                        "serviceType": "Construction Service"
                      },
                      "priceCurrency": "INR",
                      "availability": "https://schema.org/InStock"
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Glass Glazing Services",
                        "description": "Complete glass glazing solutions including structural glazing and curtain wall systems",
                        "serviceType": "Construction Service"
                      },
                      "priceCurrency": "INR", 
                      "availability": "https://schema.org/InStock"
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Exterior Elevation Design",
                        "description": "Custom exterior elevation design and implementation for modern building facades",
                        "serviceType": "Design Service"
                      },
                      "priceCurrency": "INR",
                      "availability": "https://schema.org/InStock"
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Building Facade Work",
                        "description": "Complete building facade solutions with modern design and premium materials",
                        "serviceType": "Construction Service"
                      },
                      "priceCurrency": "INR",
                      "availability": "https://schema.org/InStock"
                    }
                  ]
                },
                "knowsAbout": [
                  "ACP Panel Installation",
                  "Glass Glazing",
                  "Exterior Elevation Design",
                  "Structural Glazing", 
                  "Building Facade",
                  "Curtain Wall Systems",
                  "Composite Panel Work",
                  "Shop Front Design",
                  "Commercial Building Exteriors",
                  "Residential Elevation",
                  "Modern Architecture",
                  "Building Renovation"
                ]
              },
              // Organization Schema
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://jindam-elevations.vercel.app/#organization",
                "name": "Jindam Elevations",
                "url": "https://jindam-elevations.vercel.app/",
                "logo": "https://jindam-elevations.vercel.app/banner.png",
                "slogan": "Elevating Your Vision with Precision and Style",
                "numberOfEmployees": "25+",
                "knowsAbout": [
                  "ACP Panel Installation",
                  "Glass Glazing",
                  "Exterior Elevation Design", 
                  "Structural Glazing",
                  "Building Facade",
                  "Curtain Wall Systems",
                  "Composite Panel Work"
                ],
                "areaServed": {
                  "@type": "State",
                  "name": "Maharashtra",
                  "addressCountry": "India"
                }
              },
              // WebSite Schema
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://jindam-elevations.vercel.app/#website",
                "url": "https://jindam-elevations.vercel.app/",
                "name": "Jindam Elevations Official Website",
                "description": "Official website of Jindam Elevations - Leading ACP Panel and Glass Glazing contractors in Nanded, Maharashtra serving the entire Marathwada region",
                "publisher": {
                  "@type": "Organization",
                  "name": "Jindam Elevations"
                },
                "inLanguage": ["en-IN", "hi-IN", "mr-IN"],
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://jindam-elevations.vercel.app/?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              },
              // Professional Service Schema
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "@id": "https://jindam-elevations.vercel.app/#professionalservice",
                "name": "Jindam Elevations - Professional Exterior Design Services",
                "description": "Professional exterior design and construction services specializing in ACP Panel work, Glass Glazing, and Building Elevation projects",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "Jindam Elevations"
                },
                "serviceType": "Construction and Design Services",
                "areaServed": "Maharashtra, India",
                "availableLanguage": ["English", "Hindi", "Marathi"]
              },
              // ContactPoint Schema
              {
                "@context": "https://schema.org",
                "@type": "ContactPoint",
                "@id": "https://jindam-elevations.vercel.app/#contactpoint",
                "telephone": "+91-9637894561",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi", "Marathi"],
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "09:00",
                  "closes": "20:00"
                }
              }
            ]),
          }}
        />
      </body>
    </html>
  );
}