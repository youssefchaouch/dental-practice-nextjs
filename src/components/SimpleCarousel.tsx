'use client';

import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CarouselImage {
  src: string;
  alt: string;
}

interface SimpleCarouselProps {
  images: CarouselImage[];
}

const clinicImages: CarouselImage[] = [
  { src: '/taswira1.jpg', alt: 'Clinic photo 1' },
  { src: '/taswira2.jpg', alt: 'Clinic photo 2' },
  { src: '/taswira3.jpg', alt: 'Clinic photo 3' },
  { src: '/taswira4.jpg', alt: 'Clinic photo 4' },
  { src: '/taswira5.jpg', alt: 'Clinic photo 5' },
  { src: '/taswira6.jpg', alt: 'Clinic photo 6' },
  { src: '/taswira7.jpg', alt: 'Clinic photo 7' },
  { src: '/taswira8.jpg', alt: 'Clinic photo 8' },
];

const SimpleCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="max-w-5xl mx-auto mt-16">
      <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">
        Our Clinic
      </h3>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={20}
        centeredSlides
        loop
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="cursor-grab"
      >
        {clinicImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-xl transform transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 z-20 text-white font-medium text-lg">
                {img.alt}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimpleCarousel;
