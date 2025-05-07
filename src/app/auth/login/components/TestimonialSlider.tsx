'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    text: "Avara makes finding information as fast as one click",
    author: "Stella Maris",
    stars: 5,
  },
  {
    text: "Fast, reliable, and easy to use!",
    author: "Maria Lopez",
    stars: 4,
  },
];

export default function TestimonialSlider() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="relative max-w-md w-full text-center pt-8 pb-20">
        {" "}
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ el: ".custom-pagination", clickable: true }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center">
                <p className="font-montserrat font-semibold text-[36px] text-black leading-snug">
                  “{item.text}”
                </p>
                <p className="font-montserrat font-medium text-gray-500 mt-4">
                  {item.author}
                </p>
                <div className="flex justify-center mt-2 text-yellow-400 text-xl">
                  {[...Array(item.stars)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination absolute bottom-4 w-full flex justify-center" />
      </div>
    </div>
  );
}
