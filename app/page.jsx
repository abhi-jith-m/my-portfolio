import React from 'react'
import { Button } from '@/components/ui/button'
import {FiDownload} from "react-icons/fi"
import MatrixText from '@/components/MatrixText'
import Social from '@/components/social'
import Photo from '@/components/Photo'
const Home = () => {
return<section className=''>
    <div className='container mx-auto h-full'>
      <div className='flex flex-col xl:flex-row items-center justify-between  xl:pt-8 xl:pb-2'>
        <div className='w-[50vh] xl:w-auto text-center xl:text-left order-2 xl:order-none '>
          <span className='text-[18px] font-semibold '>DATA SCIENTIST</span>
          <h1 className='h1'>Hello I'm <br/>
          {/* <span className='text-fuchsia-700'> ABHIJITH M</span> */}
          <MatrixText text="ABHIJITH M" className="text-fuchsia-700" />
          </h1>
          <p className="max-w-[600px] mb-3 mt-2 text-center xl:text-[16px] text-[14px] text-white/80 leading-relaxed xl:text-justify">
                I’m a data scientist passionate about turning raw data into meaningful insights and intelligent solutions.
                I specialize in analyzing complex datasets, building predictive models, and delivering data-driven strategies that drive business performance.
              </p>

          <div className="flex flex-row xl:flex-row gap-4 items-center justify-center xl:justify-start">

              <Button variant="success" size="xlg" className="uppercase flex items-center mb-[-2px] gap-2">
              <a
                  href="./_abhijith_m_data_scientist.pdf"
                  download
                  className="uppercase flex items-center gap-2 w-full h-full px-6 py-3"
                >
                <span>Download CV</span>
                <FiDownload className='text-xl' />
                </a>
              </Button>
              <div className=' xl:mb-0'>
                <Social containerStyles="flex gap-4" iconStyles="w-14 h-14 border border-fuchsia-700 
                rounded-full flex justify-center items-center text-fuchsia-700 hover:bg-fuchsia-700 hover:text-black
                hover:transition-all duration-500" />
                </div>
              
            </div>
        </div>
        <div className='order-1 xl:order-none mb-8 xl:mb-0'> 
          <Photo />
        </div>
      </div>
    </div>
</section>

}

export default Home
