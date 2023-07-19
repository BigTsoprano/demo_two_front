import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Footer() {

    const footerNavs = [
        {
            label: "Company",
            items: [
                {
                    href: 'https://acannaconnect.com/services',
                    name: 'Services'
                },
                {
                    href: '/',
                    name: 'About us'
                },
                {
                    href: '/',
                    name: 'Pricing'
                },
                {
                    href: 'https://demo.01ninjas.com/',
                    name: 'Demo'
                },
            ],
        },
        {
            label: "Resources",
            items: [
                {
                    href: '/',
                    name: 'Ecommerce'
                },
                {
                    href: '/',
                    name: 'Branding'
                },
                {
                    href: '/',
                    name: 'Custom software'
                },
                {
                    href: '/',
                    name: 'CMS'
                },
                {
                    href: '/',
                    name: 'IT services'
                },
                {
                    href: '/',
                    name: 'Pos system'
                },
                // {
                //     href: '/services',
                //     name: 'MarketplaceB2B'
                // },
                // {
                //     href: '/services',
                //     name: 'Management software'
                // },
            ],
        },
        {
            label: "More",
            items: [
                {
                    href: 'javascript:void()',
                    name: 'Terms'
                },
                {
                    href: '/',
                    name: 'Join us'
                },
        
            ]
        }
    ]
  return (
    <footer className="text-slate-50 bg-slate-950  px-4 py-4 max-w-screen-xl mx-auto md:px-8">
    <div className="gap-6 justify-between md:flex">
        <div className="flex-1">
            <div className=" flex row items-center">
  <a href="https://acannaconnect.com">
    <img
      src="/ninjas_logo.svg"
      style={{ width: "30px", height: "30px" }}
      alt="logo"
    />
  </a>
            
            
              <p style={{fontWeight:'600', paddingLeft:'6px'}} className="leading-relaxed text-green-500 mt-2 text-xl">
Canna                    </p>

            </div>
          
          <div> 
             
             <a className="leading-relaxed text-slate-50 max-w-xs mt-2 text-base" href="tel:+12013287539">📱: +1(201)328-7539</a>
                    <p className="leading-relaxed text-slate-50 max-w-xs mt-2 text-base" >✉️: canna@01ninjas.com</p>
                    </div>
                  
           
        </div>
      
        <div style={{alignItems:'flex-start'}} className="flex-1 text-slate-50 mt-10 space-y-6  justify-between sm:flex md:space-y-0 md:mt-0">
            
            {
                footerNavs.map((item, idx) => (
                    <ul
                        className="space-y-4  "
                        key={idx}
                    >
                        
                        <h4 className="text-green-500 text-xs">
                            { item.label }
                        </h4>
                        
                        {
                            item.items.map(((el, idx) => (
                                <li  key={idx}>
                                    <a 
                                        href={el.href}
                                        className="hover:underline hover:text-green-500 text-white"
                                    
                                    >
                                        
                                       { el.name }
                  
                                       
                                    </a>
                                    
                                    
                                </li>
                                
                            )))
                            
                        }
                    </ul>
                ))
            }
            
        </div>
       
        
    </div>
    <div className="mt-8 py-6 border-t text-xs text-slate-400 items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
            &copy; 2023 Canna All rights reserved.
        </div>
       
    </div>
    <style jsx>{`
        .svg-icon path,
        .svg-icon polygon,
        .svg-icon rect {
            fill: currentColor;
        }
    `}</style>
</footer>
  )
}

export default Footer
