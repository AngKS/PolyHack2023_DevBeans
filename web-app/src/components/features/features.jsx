import React, {useEffect, useState} from 'react'
import Chrome from "../../assets/chrome.png"
import bg from "../../assets/bg-pattern.png"
import { SlImageComparer } from '@shoelace-style/shoelace/dist/react';

import original from "./assets/original.png"
import censored from "./assets/censored.png"
import dashboard from "./assets/dashboard.png"

function Features() {

    return (
      <div className="flex-grow h-full w-full flex flex-col">
        
        <div className="flex flex-col w-full h-full snap-x snap-mandatory">
          {/* Content-censoring Feature */}
          <section
            
          className="w-3/4 mx-auto min-h-screen h-full p-2 flex justify-center items-center">
            <section
              style={{ height: "40rem" }}
              className="w-fit max-w-[75%] rounded-3xl px-8 flex justify-around items-center"
            >
              <div className="flex flex-col gap-2 max-w-[50%]">
                <span className="text-3xl font-semibold ">
                  Say Goodbye <br /> to Online Negativity!
                </span>
                <span className="text-lg text-slate-300">
                  Our AI-powered extension intelligently <br />
                  blocks out harmful contents in realtime.
                </span>
              </div>
              <div className="max-w-[50%] w-1/2 h-fit rounded-xl flex flex-col justify-center items-center bg-red-300 shadow-2xl shadow-cyan-500/70 ">
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
              <div className="max-w-[50%] w-1/2 flex flex-col justify-center items-center rounded-xl shadow-2xl shadow-cyan-500/70 ">
                <SlImageComparer>
                  <img
                    slot="before"
                    src="https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80&sat=-100&bri=-5"
                    alt="Grayscale version of kittens in a basket looking around."
                    className="rounded-xl shadow-xl"
                  />
                  <img
                    slot="after"
                    src="https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                    alt="Color version of kittens in a basket looking around."
                    className="rounded-xl shadow-xl"
                  />
                </SlImageComparer>
              </div>
              <div className="flex flex-col gap-2 max-w-[75%] text-right">
                <span className="text-3xl font-semibold">
                  A Kinder, Thoughtful, <br />
                  and more Empathetic Internet
                </span>
                <span className="text-lg text-slate-300">
                  Smart Text Suggestions to make sure that
                  <br /> your message tone is always thoughtful and kind.
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
              <div className="flex flex-col gap-2 max-w-[75%]">
                <span className="text-3xl font-semibold ">
                  Comprehensive <br />
                  Activity Dashboard
                </span>
                <span className="text-lg text-slate-300">
                  Get a detailed overview of <br />
                  your online activity, contents censored, <br />
                  and input positivity metrics.
                </span>
              </div>
              <div className="max-w-[50%] w-1/2 flex flex-col justify-center items-center shadow-2xl shadow-cyan-500/70 rounded-xl">
                <img
                  slot="after"
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