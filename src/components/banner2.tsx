"use client";

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/app/css/styles.css';

interface BannerProps {
    plantendata0: { 
         aantalPlantenSoorten: number;
          aantalBoomSoorten: number; 
         aantalBoomSoorten25: number; 
         aantalEetbareSoorten: number; 
         aantalGroenblijvendeSoorten: number; 
         biodiversiteitsScore: number;
        };
  }

  const Banner2: React.FC<BannerProps> = ({ plantendata0 }) => {
    const { aantalPlantenSoorten, aantalBoomSoorten, aantalBoomSoorten25, aantalEetbareSoorten, aantalGroenblijvendeSoorten, } = plantendata0;
  return (
    <>
        <Swiper
        centeredSlides={true}
        navigation={false}  
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        autoplay={{
            delay: 4000,
        }}
        loop={true}
        >
        <SwiperSlide>
            <h1 className="text-3xl">biodiversityscore: <span className="text-red-500">{plantendata0.biodiversiteitsScore}</span></h1>
        </SwiperSlide>
        <SwiperSlide>
            <h1 className="text-3xl">number of plant species: <span className="text-red-500">{plantendata0.aantalPlantenSoorten}</span></h1>
        </SwiperSlide>
        <SwiperSlide>
            <h1 className="text-3xl">number of edible species: <span className="text-red-500">{plantendata0.aantalEetbareSoorten}</span></h1>
        </SwiperSlide>
        <SwiperSlide>
            <h1 className="text-3xl">number of tree species with specimens at least 25 years old: <span className="text-red-500">{plantendata0.aantalBoomSoorten25}</span></h1>
        </SwiperSlide>
        </Swiper>
    </>
  );
};

export default Banner2;