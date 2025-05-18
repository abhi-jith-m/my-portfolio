import React from 'react'
import { Button } from '@/components/ui/button'
import { FiDownload } from "react-icons/fi"
import MatrixText from '@/components/MatrixText'
import Social from '@/components/social'
import Photo from '@/components/Photo'

const Home = () => {
  return (
    <section className='w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10'>
      <div className='xl:ml-20 mx-auto'>
        <div className='flex  flex-col xl:flex-row items-center justify-between py-8 w-full'>
          <div className='w-full text-center xl:text-left order-2 xl:order-none mt-8 xl:mt-0'>
            <span className='inline-block text-[18px] font-semibold mb-2'>DATA SCIENTIST</span>
            <h1 className='h1 mb-4'>
              Hello I'm <br />
              <MatrixText text="ABHIJITH M" className="text-fuchsia-700" />
            </h1>
            <p className=" xl:w-[70vh] mb-6 text-center xl:text-justify text-[14px] sm:text-[15px] xl:text-[16px] text-white/80 leading-relaxed">
              I'm a data scientist passionate about turning raw data into meaningful insights and intelligent solutions.
              I specialize in analyzing complex datasets, building predictive models, and delivering data-driven strategies that drive business performance.
            </p>

            <div className=" flex flex-col sm:flex-row gap-6 sm:gap-4 items-center justify-center xl:justify-start">
              <Button variant="success" size="xlg" className="uppercase flex items-center gap-2 mb-[-2px] w-auto">
                <a
                  href="./_abhijith_m_data_scientist.pdf"
                  download
                  className="uppercase flex items-center gap-2 w-full h-full px-6 py-3"
                >
                  <span>Download CV</span>
                  <FiDownload className='text-xl' />
                </a>
              </Button>
              <div className='mt-4 sm:mt-0'>
                <Social containerStyles="flex gap-4" iconStyles="w-12 h-12 sm:w-14 sm:h-14 border border-fuchsia-700 
                  rounded-full flex justify-center items-center text-fuchsia-700 hover:bg-fuchsia-700 hover:text-black
                  hover:transition-all duration-500" />
              </div>
            </div>
          </div>
          <div className='order-1 xl:order-none w-full  flex justify-center xl:justify-end mb-4 xl:mb-0 lg:mr-25'> 
            <Photo />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home