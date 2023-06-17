import React, {useEffect, useState} from 'react'
import Chrome from "../../assets/chrome.png"
import bg from "../../assets/bg-pattern.png"
import { SlCarousel, SlCarouselItem, SlImageComparer } from '@shoelace-style/shoelace/dist/react';

import original from "./assets/original.png"
import censored from "./assets/censored.png"
import dashboard from "./assets/dashboard.png"
import safe from "./assets/safe.png"
import unsafe from "./assets/unsafe.png"


function Features() {

    return (
      <div className="flex-grow h-full w-full flex flex-col">
        <div className="flex flex-col w-full h-full snap-x snap-mandatory">
          {/* Content-censoring Feature */}
          <section className="w-3/4 mx-auto min-h-screen h-full p-2 flex justify-center items-center">
            <section
              style={{ height: "40rem" }}
              className="w-fit max-w-[75%] rounded-3xl px-8 flex justify-around items-center"
            >
              <div className="flex flex-col gap-2 max-w-[50%] mx-2">
                <span className="text-3xl font-semibold ">
                  Say Goodbye <br /> to Online Negativity!
                </span>
                <span className="text-lg text-slate-300">
                  Our AI-powered extension intelligently
                  blocks out harmful contents in realtime.
                </span>
              </div>
              <div className="max-w-[50%] w-3/4 h-fit rounded-xl flex flex-col justify-center items-center bg-red-300 shadow-2xl shadow-cyan-500/70 ">
                <SlImageComparer>
                  <img
                    slot="after"
                    src={original}
                    alt="censored content demo"
                    className="rounded-xl"
                  />
                  <img
                    slot="before"
                    src={censored}
                    alt="censored content demo"
                    className="rounded-xl"
                  />
                </SlImageComparer>
              </div>
            </section>
          </section>
          {/* Input Purification feature */}
          <section className="w-3/4 mx-auto min-h-screen h-full p-2 flex justify-center items-center">
            <div
              style={{ height: "40rem" }}
              className="w-fit rounded-3xl p-8 flex justify-around items-center"
            >
              <div className="max-w-[50%] w-3/4 flex flex-col justify-center items-center rounded-xl">

                <SlCarousel autoplay loop pagination autoplayInterval={4500}>
                  <SlCarouselItem>
                    <img
                      src={safe}
                      alt="Color version of kittens in a basket looking around."
                      className="rounded-xl"
                    />
                  </SlCarouselItem>
                  <SlCarouselItem>
                    <img
                      src={unsafe}
                      alt="Color version of kittens in a basket looking around."
                      className="rounded-xl"
                    />
                  </SlCarouselItem>
                </SlCarousel>
              </div>
              <div className="flex flex-col gap-2 max-w-[75%] text-right">
                <span className="text-3xl font-semibold">
                  A Kinder, Thoughtful, <br />
                  and more Empathetic Internet
                </span>
                <span className="text-lg text-slate-300">
                  Smart Text Suggestions to make sure that
                  your message tone is always thoughtful and kind.
                </span>
              </div>
            </div>
          </section>
          {/* Analytical Dashboard */}
          <section className="w-3/4 mx-auto min-h-screen h-full p-2 flex justify-center items-center">
            <div
              style={{ height: "40rem" }}
              className="w-fit rounded-3xl p-8 flex justify-around items-center"
            >
              <div className="flex flex-col gap-2 max-w-[75%] mx-2">
                <span className="text-3xl font-semibold ">
                  Comprehensive <br />
                  Activity Dashboard
                </span>
                <span className="text-lg text-slate-300">
                  Get a detailed overview of
                  your online activity, contents censored,
                  and input positivity metrics.
                </span>
              </div>
              <div className="max-w-[50%] w-3/4 flex flex-col justify-center items-center shadow-2xl shadow-cyan-500/70 rounded-xl">
                <img
                  src={dashboard}
                  alt="Color version of kittens in a basket looking around."
                  className="rounded-xl"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
}

export default Features