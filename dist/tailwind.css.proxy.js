// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "/*! tailwindcss v2.2.16 | MIT License | https://tailwindcss.com*/\r\n /*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */html{-webkit-text-size-adjust:100%;line-height:1.15;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;margin:0}hr{color:inherit;height:0}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}legend{padding:0}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}button{background-color:transparent;background-image:none}fieldset,ol,ul{margin:0;padding:0}ol,ul{list-style:none}html{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}body{font-family:inherit;line-height:inherit}*,:after,:before{border:0 solid;box-sizing:border-box}hr{border-top-width:1px}img{border-style:solid}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:-moz-focusring{outline:auto}table{border-collapse:collapse}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}button,input,optgroup,select,textarea{color:inherit;line-height:inherit;padding:0}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-border-opacity:1;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border-color:rgba(229,231,235,var(--tw-border-opacity))}.invisible{visibility:hidden}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:-webkit-sticky;position:sticky}.top-0{top:0}.right-0{right:0}.bottom-0{bottom:0}.left-14{left:3.5rem}.bottom-24{bottom:6rem}.right-36{right:9rem}.left-0{left:0}.bottom-10{bottom:2.5rem}.top-28{top:7rem}.top-\\[-15px\\]{top:-15px}.top-2{top:.5rem}.right-2{right:.5rem}.z-10{z-index:10}.z-50{z-index:50}.z-20{z-index:20}.z-0{z-index:0}.z-40{z-index:40}.col-span-full{grid-column:1/-1}.col-span-4{grid-column:span 4/span 4}.col-span-1{grid-column:span 1/span 1}.col-span-2{grid-column:span 2/span 2}.col-span-6{grid-column:span 6/span 6}.col-span-3{grid-column:span 3/span 3}.col-span-7{grid-column:span 7/span 7}.mx-2{margin-left:.5rem;margin-right:.5rem}.mt-1{margin-top:.25rem}.mt-3{margin-top:.75rem}.mr-2{margin-right:.5rem}.ml-auto{margin-left:auto}.mr-3{margin-right:.75rem}.mt-\\[1px\\]{margin-top:1px}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.mt-2{margin-top:.5rem}.mt-4{margin-top:1rem}.mt-6{margin-top:1.5rem}.ml-3{margin-left:.75rem}.mb-1{margin-bottom:.25rem}.mt-5{margin-top:1.25rem}.ml-8{margin-left:2rem}.mt-\\[180px\\]{margin-top:180px}.mb-\\[1000px\\]{margin-bottom:1000px}.ml-\\[2px\\]{margin-left:2px}.mr-\\[14px\\]{margin-right:14px}.mt-8{margin-top:2rem}.mr-auto{margin-right:auto}.mt-12{margin-top:3rem}.mt-10{margin-top:2.5rem}.mb-5{margin-bottom:1.25rem}.mt-24{margin-top:6rem}.mb-32{margin-bottom:8rem}.mr-6{margin-right:1.5rem}.block{display:block}.flex{display:flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-10{height:2.5rem}.h-full{height:100%}.h-6{height:1.5rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-12{height:3rem}.h-60{height:15rem}.h-32{height:8rem}.h-\\[10px\\]{height:10px}.h-40{height:10rem}.h-64{height:16rem}.h-8{height:2rem}.h-\\[1px\\]{height:1px}.h-7{height:1.75rem}.h-2{height:.5rem}.h-16{height:4rem}.h-screen{height:100vh}.h-2\\/3{height:66.666667%}.h-14{height:3.5rem}.h-auto{height:auto}.h-1\\/3{height:33.333333%}.h-28{height:7rem}.h-36{height:9rem}.h-\\[85px\\]{height:85px}.h-\\[45px\\]{height:45px}.h-\\[20px\\]{height:20px}.h-\\[240px\\]{height:240px}.h-\\[35px\\]{height:35px}.h-\\[15px\\]{height:15px}.min-h-\\[2\\.5rem\\]{min-height:2.5rem}.min-h-full{min-height:100%}.min-h-screen{min-height:100vh}.w-full{width:100%}.w-10{width:2.5rem}.w-4{width:1rem}.w-5{width:1.25rem}.w-6{width:1.5rem}.w-12{width:3rem}.w-60{width:15rem}.w-\\[10px\\]{width:10px}.w-40{width:10rem}.w-16{width:4rem}.w-8{width:2rem}.w-4\\/5{width:80%}.w-7{width:1.75rem}.w-2{width:.5rem}.w-screen{width:100vw}.w-auto{width:auto}.w-14{width:3.5rem}.w-1\\/3{width:33.333333%}.w-\\[100px\\]{width:100px}.w-64{width:16rem}.w-20{width:5rem}.w-\\[288px\\]{width:288px}.max-w-\\[1920px\\]{max-width:1920px}.max-w-full{max-width:100%}.max-w-\\[160px\\]{max-width:160px}.flex-shrink-0{flex-shrink:0}.transform{transform:var(--tw-transform)}@-webkit-keyframes bounce{0%,to{-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1);transform:translateY(-25%)}50%{-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1);transform:none}}@keyframes bounce{0%,to{-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1);transform:translateY(-25%)}50%{-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1);transform:none}}.animate-bounce{-webkit-animation:bounce 1s infinite;animation:bounce 1s infinite}.cursor-pointer{cursor:pointer}.cursor-wait{cursor:wait}.select-none{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.list-disc{list-style-type:disc}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.grid-cols-12{grid-template-columns:repeat(12,minmax(0,1fr))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-evenly{justify-content:space-evenly}.gap-4{gap:1rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-6{gap:1.5rem}.space-y-1>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(.25rem*var(--tw-space-y-reverse));margin-top:calc(.25rem*(1 - var(--tw-space-y-reverse)))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(.75rem*var(--tw-space-y-reverse));margin-top:calc(.75rem*(1 - var(--tw-space-y-reverse)))}.space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(1rem*(1 - var(--tw-space-x-reverse)));margin-right:calc(1rem*var(--tw-space-x-reverse))}.space-x-3>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(.75rem*(1 - var(--tw-space-x-reverse)));margin-right:calc(.75rem*var(--tw-space-x-reverse))}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(.5rem*(1 - var(--tw-space-x-reverse)));margin-right:calc(.5rem*var(--tw-space-x-reverse))}.space-y-8>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(2rem*var(--tw-space-y-reverse));margin-top:calc(2rem*(1 - var(--tw-space-y-reverse)))}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-y-hidden{overflow-y:hidden}.overflow-y-scroll{overflow-y:scroll}.whitespace-nowrap{white-space:nowrap}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.border-2{border-width:2px}.border-4{border-width:4px}.border{border-width:1px}.border-r{border-right-width:1px}.border-b{border-bottom-width:1px}.border-t{border-top-width:1px}.border-l{border-left-width:1px}.border-dashed{border-style:dashed}.border-gray-300{--tw-border-opacity:1;border-color:rgba(209,213,219,var(--tw-border-opacity))}.border-blue-500{--tw-border-opacity:1;border-color:rgba(59,130,246,var(--tw-border-opacity))}.border-gray-200{--tw-border-opacity:1;border-color:rgba(229,231,235,var(--tw-border-opacity))}.border-blue-300{--tw-border-opacity:1;border-color:rgba(147,197,253,var(--tw-border-opacity))}.border-white{--tw-border-opacity:1;border-color:rgba(255,255,255,var(--tw-border-opacity))}.border-black{--tw-border-opacity:1;border-color:rgba(0,0,0,var(--tw-border-opacity))}.border-\\[\\#4c494373\\]{border-color:#4c494373}.border-l-white{--tw-border-opacity:1;border-left-color:rgba(255,255,255,var(--tw-border-opacity))}.bg-blue-500,.bg-main-500{--tw-bg-opacity:1;background-color:rgba(59,130,246,var(--tw-bg-opacity))}.bg-blue-200{--tw-bg-opacity:1;background-color:rgba(191,219,254,var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.bg-red-500{--tw-bg-opacity:1;background-color:rgba(239,68,68,var(--tw-bg-opacity))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgba(249,250,251,var(--tw-bg-opacity))}.bg-main-200{--tw-bg-opacity:1;background-color:rgba(191,219,254,var(--tw-bg-opacity))}.bg-gray-900{--tw-bg-opacity:1;background-color:rgba(17,24,39,var(--tw-bg-opacity))}.bg-gray-700{--tw-bg-opacity:1;background-color:rgba(55,65,81,var(--tw-bg-opacity))}.bg-blue-100{--tw-bg-opacity:1;background-color:rgba(219,234,254,var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-\\[\\#4c494373\\]{background-color:#4c494373}.bg-main-50{--tw-bg-opacity:1;background-color:rgba(239,246,255,var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity:1;background-color:rgba(229,231,235,var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity:1;background-color:rgba(243,244,246,var(--tw-bg-opacity))}.bg-contain{background-size:contain}.bg-cover{background-size:cover}.bg-center{background-position:50%}.bg-no-repeat{background-repeat:no-repeat}.fill-current{fill:currentColor}.stroke-current{stroke:currentColor}.p-2{padding:.5rem}.p-4{padding:1rem}.p-1{padding:.25rem}.p-8{padding:2rem}.p-10{padding:2.5rem}.p-3{padding:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-\\[2px\\]{padding-left:2px;padding-right:2px}.py-1{padding-bottom:.25rem;padding-top:.25rem}.py-6{padding-bottom:1.5rem;padding-top:1.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-2{padding-bottom:.5rem;padding-top:.5rem}.py-3{padding-bottom:.75rem;padding-top:.75rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.px-8{padding-left:2rem;padding-right:2rem}.py-4{padding-bottom:1rem;padding-top:1rem}.py-8{padding-bottom:2rem;padding-top:2rem}.py-5{padding-bottom:1.25rem;padding-top:1.25rem}.py-\\[2px\\]{padding-bottom:2px;padding-top:2px}.pt-8{padding-top:2rem}.pb-4{padding-bottom:1rem}.pt-1{padding-top:.25rem}.pb-1{padding-bottom:.25rem}.pb-12{padding-bottom:3rem}.pl-4{padding-left:1rem}.pr-3{padding-right:.75rem}.pr-6{padding-right:1.5rem}.pl-6{padding-left:1.5rem}.pb-20{padding-bottom:5rem}.pr-8{padding-right:2rem}.pt-20{padding-top:5rem}.pl-8{padding-left:2rem}.pt-10{padding-top:2.5rem}.pb-\\[100\\%\\]{padding-bottom:100%}.pr-40{padding-right:10rem}.pt-3{padding-top:.75rem}.pl-16{padding-left:4rem}.text-left{text-align:left}.text-center{text-align:center}.text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.font-semibold{font-weight:600}.font-medium{font-weight:500}.font-bold{font-weight:700}.uppercase{text-transform:uppercase}.tracking-wider{letter-spacing:.05em}.text-white{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}.text-gray-100{--tw-text-opacity:1;color:rgba(243,244,246,var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}.text-gray-400{--tw-text-opacity:1;color:rgba(156,163,175,var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity:1;color:rgba(55,65,81,var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity:1;color:rgba(31,41,55,var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity:1;color:rgba(107,114,128,var(--tw-text-opacity))}.text-main-500{--tw-text-opacity:1;color:rgba(59,130,246,var(--tw-text-opacity))}.text-main-600{--tw-text-opacity:1;color:rgba(37,99,235,var(--tw-text-opacity))}.text-gray-200{--tw-text-opacity:1;color:rgba(229,231,235,var(--tw-text-opacity))}.text-gray-50{--tw-text-opacity:1;color:rgba(249,250,251,var(--tw-text-opacity))}.text-black{--tw-text-opacity:1;color:rgba(0,0,0,var(--tw-text-opacity))}.text-\\[\\#fffbf5\\]{--tw-text-opacity:1;color:rgba(255,251,245,var(--tw-text-opacity))}.text-red-600{--tw-text-opacity:1;color:rgba(220,38,38,var(--tw-text-opacity))}.text-main-400{--tw-text-opacity:1;color:rgba(96,165,250,var(--tw-text-opacity))}.text-gray-300{--tw-text-opacity:1;color:rgba(209,213,219,var(--tw-text-opacity))}.text-blue-500{--tw-text-opacity:1;color:rgba(59,130,246,var(--tw-text-opacity))}.text-blue-50{--tw-text-opacity:1;color:rgba(239,246,255,var(--tw-text-opacity))}.text-red-50{--tw-text-opacity:1;color:rgba(254,242,242,var(--tw-text-opacity))}.placeholder-\\[\\#4C4943\\]::-moz-placeholder{--tw-placeholder-opacity:1;color:rgba(76,73,67,var(--tw-placeholder-opacity))}.placeholder-\\[\\#4C4943\\]:-ms-input-placeholder{--tw-placeholder-opacity:1;color:rgba(76,73,67,var(--tw-placeholder-opacity))}.placeholder-\\[\\#4C4943\\]::placeholder{--tw-placeholder-opacity:1;color:rgba(76,73,67,var(--tw-placeholder-opacity))}.opacity-0{opacity:0}.opacity-70{opacity:.7}.opacity-100{opacity:1}.opacity-60{opacity:.6}.shadow-lg{--tw-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)}.shadow-lg,.shadow-md{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)}.ring-main-400{--tw-ring-opacity:1;--tw-ring-color:rgba(96,165,250,var(--tw-ring-opacity))}.invert{--tw-invert:invert(100%)}.filter,.invert{filter:var(--tw-filter)}.transition{transition-duration:.15s;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.odd\\:bg-gray-100:nth-child(odd){--tw-bg-opacity:1;background-color:rgba(243,244,246,var(--tw-bg-opacity))}.focus-within\\:border-2:focus-within{border-width:2px}.focus-within\\:border-black:focus-within{--tw-border-opacity:1;border-color:rgba(0,0,0,var(--tw-border-opacity))}.focus-within\\:px-\\[16px\\]:focus-within{padding-left:16px;padding-right:16px}.hover\\:border-gray-300:hover{--tw-border-opacity:1;border-color:rgba(209,213,219,var(--tw-border-opacity))}.hover\\:border-blue-400:hover{--tw-border-opacity:1;border-color:rgba(96,165,250,var(--tw-border-opacity))}.hover\\:bg-main-600:hover{--tw-bg-opacity:1;background-color:rgba(37,99,235,var(--tw-bg-opacity))}.hover\\:bg-red-200:hover{--tw-bg-opacity:1;background-color:rgba(254,202,202,var(--tw-bg-opacity))}.hover\\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgba(243,244,246,var(--tw-bg-opacity))}.hover\\:bg-gray-200:hover{--tw-bg-opacity:1;background-color:rgba(229,231,235,var(--tw-bg-opacity))}.hover\\:bg-blue-300:hover{--tw-bg-opacity:1;background-color:rgba(147,197,253,var(--tw-bg-opacity))}.hover\\:bg-red-600:hover{--tw-bg-opacity:1;background-color:rgba(220,38,38,var(--tw-bg-opacity))}.hover\\:bg-gray-300:hover{--tw-bg-opacity:1;background-color:rgba(209,213,219,var(--tw-bg-opacity))}.hover\\:bg-gray-50:hover{--tw-bg-opacity:1;background-color:rgba(249,250,251,var(--tw-bg-opacity))}.hover\\:bg-gray-800:hover{--tw-bg-opacity:1;background-color:rgba(31,41,55,var(--tw-bg-opacity))}.hover\\:bg-\\[\\#4C4943\\]:hover{--tw-bg-opacity:1;background-color:rgba(76,73,67,var(--tw-bg-opacity))}.hover\\:bg-blue-200:hover{--tw-bg-opacity:1;background-color:rgba(191,219,254,var(--tw-bg-opacity))}.hover\\:bg-blue-600:hover{--tw-bg-opacity:1;background-color:rgba(37,99,235,var(--tw-bg-opacity))}.hover\\:text-gray-600:hover{--tw-text-opacity:1;color:rgba(75,85,99,var(--tw-text-opacity))}.hover\\:text-yellow-400:hover{--tw-text-opacity:1;color:rgba(251,191,36,var(--tw-text-opacity))}.hover\\:text-main-500:hover{--tw-text-opacity:1;color:rgba(59,130,246,var(--tw-text-opacity))}.hover\\:underline:hover{text-decoration:underline}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-2:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.active\\:bg-main-400:active{--tw-bg-opacity:1;background-color:rgba(96,165,250,var(--tw-bg-opacity))}.active\\:bg-red-100:active{--tw-bg-opacity:1;background-color:rgba(254,226,226,var(--tw-bg-opacity))}.active\\:bg-red-400:active{--tw-bg-opacity:1;background-color:rgba(248,113,113,var(--tw-bg-opacity))}.active\\:bg-gray-600:active{--tw-bg-opacity:1;background-color:rgba(75,85,99,var(--tw-bg-opacity))}.active\\:bg-blue-100:active{--tw-bg-opacity:1;background-color:rgba(219,234,254,var(--tw-bg-opacity))}.active\\:bg-blue-400:active{--tw-bg-opacity:1;background-color:rgba(96,165,250,var(--tw-bg-opacity))}.active\\:text-main-300:active{--tw-text-opacity:1;color:rgba(147,197,253,var(--tw-text-opacity))}.disabled\\:bg-main-300:disabled{--tw-bg-opacity:1;background-color:rgba(147,197,253,var(--tw-bg-opacity))}.disabled\\:bg-main-200:disabled{--tw-bg-opacity:1;background-color:rgba(191,219,254,var(--tw-bg-opacity))}.group:hover .group-hover\\:visible{visibility:visible}.group:hover .group-hover\\:text-gray-600{--tw-text-opacity:1;color:rgba(75,85,99,var(--tw-text-opacity))}.group:focus .group-focus\\:flex{display:flex}@media (min-width:640px){.sm\\:mt-0{margin-top:0}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:768px){.md\\:right-20{right:5rem}.md\\:bottom-20{bottom:5rem}.md\\:col-span-2{grid-column:span 2/span 2}.md\\:col-span-4{grid-column:span 4/span 4}.md\\:col-span-3{grid-column:span 3/span 3}.md\\:mr-3{margin-right:.75rem}.md\\:mt-auto{margin-top:auto}.md\\:mr-auto{margin-right:auto}.md\\:mt-0{margin-top:0}.md\\:ml-auto{margin-left:auto}.md\\:block{display:block}.md\\:flex{display:flex}.md\\:h-24{height:6rem}.md\\:h-16{height:4rem}.md\\:w-full{width:100%}.md\\:w-40{width:10rem}.md\\:max-w-\\[70\\%\\]{max-width:70%}.md\\:flex-shrink{flex-shrink:1}.md\\:flex-shrink-0{flex-shrink:0}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:flex-row{flex-direction:row}.md\\:items-center{align-items:center}.md\\:justify-start{justify-content:flex-start}.md\\:justify-between{justify-content:space-between}.md\\:space-x-3>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(.75rem*(1 - var(--tw-space-x-reverse)));margin-right:calc(.75rem*var(--tw-space-x-reverse))}.md\\:rounded{border-radius:.25rem}.md\\:p-8{padding:2rem}.md\\:p-3{padding:.75rem}.md\\:p-6{padding:1.5rem}.md\\:px-3{padding-left:.75rem;padding-right:.75rem}.md\\:px-24{padding-left:6rem;padding-right:6rem}.md\\:text-center{text-align:center}}@media (min-width:1024px){.lg\\:left-32{left:8rem}.lg\\:right-32{right:8rem}.lg\\:col-span-1{grid-column:span 1/span 1}.lg\\:col-span-5{grid-column:span 5/span 5}.lg\\:col-span-2{grid-column:span 2/span 2}.lg\\:col-span-3{grid-column:span 3/span 3}.lg\\:mt-0{margin-top:0}.lg\\:mt-12{margin-top:3rem}.lg\\:mt-8{margin-top:2rem}.lg\\:block{display:block}.lg\\:flex{display:flex}.lg\\:grid{display:grid}.lg\\:hidden{display:none}.lg\\:h-60{height:15rem}.lg\\:min-h-screen{min-height:100vh}.lg\\:w-auto{width:auto}.lg\\:w-40{width:10rem}.lg\\:w-48{width:12rem}.lg\\:w-3\\/6{width:50%}.lg\\:w-1\\/3,.lg\\:w-2\\/6{width:33.333333%}.lg\\:w-1\\/2{width:50%}.lg\\:w-52{width:13rem}.lg\\:max-w-lg{max-width:32rem}.lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.lg\\:grid-cols-8{grid-template-columns:repeat(8,minmax(0,1fr))}.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.lg\\:flex-row{flex-direction:row}.lg\\:items-end{align-items:flex-end}.lg\\:justify-start{justify-content:flex-start}.lg\\:justify-center{justify-content:center}.lg\\:justify-between{justify-content:space-between}.lg\\:gap-y-8{row-gap:2rem}.lg\\:space-y-0>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(0px*var(--tw-space-y-reverse));margin-top:calc(0px*(1 - var(--tw-space-y-reverse)))}.lg\\:space-x-16>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(4rem*(1 - var(--tw-space-x-reverse)));margin-right:calc(4rem*var(--tw-space-x-reverse))}.lg\\:space-x-3>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(.75rem*(1 - var(--tw-space-x-reverse)));margin-right:calc(.75rem*var(--tw-space-x-reverse))}.lg\\:border-t{border-top-width:1px}.lg\\:border-b{border-bottom-width:1px}.lg\\:border-b-0{border-bottom-width:0}.lg\\:border-r{border-right-width:1px}.lg\\:border-black{--tw-border-opacity:1;border-color:rgba(0,0,0,var(--tw-border-opacity))}.lg\\:px-20{padding-left:5rem;padding-right:5rem}.lg\\:px-0{padding-left:0;padding-right:0}.lg\\:px-28{padding-left:7rem;padding-right:7rem}.lg\\:px-32{padding-left:8rem;padding-right:8rem}.lg\\:py-14{padding-bottom:3.5rem;padding-top:3.5rem}.lg\\:py-8{padding-bottom:2rem;padding-top:2rem}.lg\\:pt-0{padding-top:0}.lg\\:pl-28{padding-left:7rem}.lg\\:pr-28{padding-right:7rem}.lg\\:pb-\\[33\\.333333\\%\\]{padding-bottom:33.333333%}.lg\\:pr-10{padding-right:2.5rem}.lg\\:pl-10{padding-left:2.5rem}.lg\\:pl-6{padding-left:1.5rem}.lg\\:hover\\:text-yellow-400:hover{--tw-text-opacity:1;color:rgba(251,191,36,var(--tw-text-opacity))}}@media (min-width:1280px){.xl\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}@media (min-width:1536px){.\\32xl\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.\\32xl\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}