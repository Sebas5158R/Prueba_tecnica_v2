import React from 'react';
import Image from '../assets/img/company.jpg';
import { Link } from 'react-router-dom';

const BannerCustomers = () => {
    return(
        <section className='h-full max-h-[640px] mb-8 xl:mb-24'>
            <div className='flex flex-col lg:flex-row'>
                <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
                    <h1 className='text-4xl lg:text-[58px] font-semibold leading-none mb-6'>
                        <span className='text-blue-700'>Create</span> Your Dream Company With Us.
                    </h1>
                    <p className='max-w-[480px] mb-8'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea debitis illum quos a et explicabo incidunt ducimus fugiat, corrupti consequuntur fuga iusto voluptatibus recusandae architecto totam aperiam quibusdam iste numquam.</p>
                    <div>
                    <Link to={"/companies"}>
                        <button className='underline-effect text-blue-500 bg-blue-50 text-base font-medium ml-2 px-4 py-3 rounded-lg transition border-2 border-blue-600 hover:bg-blue-200 hover:text-blue-600'>Create my company</button>
                    </Link>
                    </div>
                </div>
                {/* IMAGE */}
                <div className='hidden flex-1 lg:flex justify-end items-end'>
                    <img className='rounded-tl-[10rem]' src={Image} alt="company" />
                </div>
            </div>
        </section>
    );
}

export default BannerCustomers;