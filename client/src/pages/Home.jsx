import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Aitools from '../components/Aitools'
import Testimonials from '../components/Testimonials'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Aitools/>
        <Testimonials/>
        <Plan/>
        <Footer/>
    </div>
  )
}

export default Home