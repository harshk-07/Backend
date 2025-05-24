import React from 'react'
import Hero from '../components/Hero'
import AboutUs from '../components/About'
import ContactUs from '../components/Contact'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <AboutUs />
        <ContactUs />
        <Footer />
    </>
  )
}

export default Home