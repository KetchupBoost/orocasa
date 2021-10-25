<script>
  import { onMount } from 'svelte';
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import Rellax from 'rellax';

  import InputMask from '@/components/InputMask.svelte';
  import TextareaMask from '@/components/TextareaMask.svelte';

  let hasScrolled = window.scrollY > 300;
  let hideNavbar = false;
  let heroData = {
    header: '',
    subtitle: '',
    text: ''
  };
  let heroImages = [];
  let aboutData = {
    header: '',
    text: ''
  };
  let heroIndex = 0;
  let heroTransition = false;
  let slideItems = [];
  let slideIndex = 0;
  let slideTransition = false;
  let prSlideItems = [];
  let prSlideIndex = 0;
  let prSlideTransition = false;

  const db = firebase.firestore();

  // Fetch data from firebase
  db
    .collection('settings')
    .doc('landing-data')
    .get()
    .then(doc => {
      const data = doc.data();

      heroData = {
        header: data.hero_header,
        subtitle: data.hero_sub,
        text: data.hero_text
      };
      heroImages = data.hero_images;
      aboutData = {
        header: data.about_header,
        text: data.about_text
      };
      slideItems = data.slide_items;
      prSlideItems = data.project_slide_items;
    });

  const values = {
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  };

  // Input masks
  const nameOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/
  };
  const emailOptions = {
    mask: value => {
      if(/^[a-z0-9_\.-]+$/.test(value))
        return true;
      if(/^[a-z0-9_\.-]+@$/.test(value))
        return true;
      if(/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value))
        return true;
      if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value))
        return true;
      if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value))
        return true;
      if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value))
        return true;
      if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value))
        return true;
      return false;
    }
  };
  const phoneOptions = {
    mask: '(00) 90000-0000',
    lazy: false
  };
  const cityOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/
  };
  const messageOptions = {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\,\.\-\!\?\(\)\%\$\@\#\*\:\;\'\"\<\>\~\s]+$/
  };

  onMount(() => {
    Rellax('.rellax', {
      center: true
    });

    const body = document.body;
    const html = document.documentElement;

    const height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);

    window.addEventListener('scroll', () => {
      hasScrolled = window.scrollY > 300;
      hideNavbar = window.scrollY > height - 1200;
    });

    setInterval(() => {
      if (!heroTransition)
        nextHero();
    }, 9000);

    setInterval(() => {
      if (!slideTransition)
        nextSlide();
    }, 9000);

    setInterval(() => {
      if (!prSlideTransition)
        nextPrSlide();
    }, 9000);
  });

  // Helpers
  Element.prototype.documentOffsetTop = function() {
    return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
  };

  // const scrollToBottom = () => {
  //   window.scrollTo({
  //     top: document.body.scrollHeight,
  //     behavior: 'smooth'
  //   });
  // };

  const scrollTo = el => {
    window.scrollTo({
      top: el.documentOffsetTop(),
      behavior: 'smooth'
    });
  };

  const nextHero = () => {
    heroTransition = true;

    setTimeout(() => {
      if (heroIndex === heroImages.length - 1) {
        heroIndex = 0;
      } else {
        heroIndex++;
      }

      heroTransition = false;
    }, 300);
  };

  const nextSlide = () => {
    slideTransition = true;

    setTimeout(() => {
      if (slideIndex === slideItems.length - 1) {
        slideIndex = 0;
      } else {
        slideIndex++;
      }

      slideTransition = false;
    }, 300);
  };

  const previousSlide = () => {
    slideTransition = true;

    setTimeout(() => {
      if (slideIndex === 0) {
        slideIndex = slideItems.length - 1;
      } else {
        slideIndex--;
      }

      slideTransition = false;
    }, 300);
  };

  const nextPrSlide = () => {
    prSlideTransition = true;

    setTimeout(() => {
      if (prSlideIndex === prSlideItems.length - 1) {
        prSlideIndex = 0;
      } else {
        prSlideIndex++;
      }

      prSlideTransition = false;
    }, 300);
  };

  const previousPrSlide = () => {
    prSlideTransition = true;

    setTimeout(() => {
      if (prSlideIndex === 0) {
        prSlideIndex = prSlideItems.length - 1;
      } else {
        prSlideIndex--;
      }

      prSlideTransition = false;
    }, 300);
  };

  const getCurrentYear = () => new Date().getFullYear();

  const handleSubmitContact = () => {
    alert('Agradecemos seu contato!');

    db
      .collection('mail')
      .add({
        to: 'contato@orocasa.com.br',
        message: {
          subject: 'Contato pelo site',
          html: `
            <span><b>Nome:</b> ${values.name || 'Não informado.'}</span><br>
            <span><b>Email:</b> ${values.email || 'Não informado.'}</span><br>
            <span><b>Telefone:</b> ${values.phone || 'Não informado.'}</span><br>
            <span><b>Cidade:</b> ${values.city || 'Não informada.'}</span><br>
            <span><b>Mensagem:</b> ${values.message.replace('\n', '<br>') || 'Não informada.'}</span>
          `
        }
      })
      .then(() => {
        console.log('E-mail adicionado à fila para envio.');

        values.name = '';
        values.email = '';
        values.phone = '';
        values.city = '';
        values.message = '';
      })
      .catch(err => {
        console.error('Erro ao tentar enviar e-mail:', err);
      });
  };
</script>

<main class="relative w-full max-w-[1920px] min-h-screen overflow-hidden bg-white">
  <div class="fixed w-full max-w-[1920px] z-50 flex flex-col md:flex-row items-center md:h-24 px-6 lg:px-20 top-0 py-6 header {hasScrolled && 'header--scrolled'} {hideNavbar && 'opacity-0'}">
    <div class="absolute bottom-0 h-[1px] left-14 header-border" />

    <a href="https://www.orocasa.com.br" class="md:mr-auto">
      <img
        src="/images/oro_casa_logo_small_white.png"
        alt="Oro Casa"
        class="w-auto h-16"
      />
    </a>

    <div class="flex items-center h-full mt-5 links md:mt-0">
      <div class="flex items-center h-full pr-6 space-x-4 border-r border-white">
        <a
          href="https://www.instagram.com/orocasaoficial/"
          target="blank"
          title="Instagram"
          class="flex items-center hover:underline hover:text-yellow-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6"  fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
          </svg>
        </a>
        <a
          href="https://br.pinterest.com/orocasaoficial/_saved/"
          target="blank"
          title="Pinterest"
          class="flex items-center hover:underline hover:text-yellow-400"
        >
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
          </svg>
        </a>
        <a
          href="https://3dwarehouse.sketchup.com/user/b53ae5c8-3abb-4987-a57d-89fa1ce68c91/Oro-Casa"
          target="blank"
          title="3D Warehouse"
          class="flex items-center hover:underline hover:text-yellow-400"
        >
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 109.1 109.1" xml:space="preserve" class="w-6 h-6" fill="currentColor">
            <g><polygon points="52.4,68.7 65,61.4 65,47 52.4,54.1 	" class="st1"></polygon><polygon points="35,47 35,61.5 47.4,68.6 47.4,54.1 	" class="st1"></polygon><path d="M82.5,60.8V34.1l-23-13.2c-2-1.1-5.2-2.1-9.5-2.1c-4.9,0-8,1.3-10,2.3L17.6,34v27c0,3.6,2.8,11.6,9.2,16
            L50,90.4L73,77.2C80.1,72.6,82.5,64,82.5,60.8z M70,64.6L50,76L30.1,64.6l0-22.9l20-11.6L70,41.6V64.6z" class="st1"></path><polygon points="37.5,42.6 50,49.8 62.5,42.7 50,35.5 	" class="st1"></polygon><path d="M12.5,60.7V34.1L0,26.9v39.4c0,0,0.5,6.5,4.4,13.2c4.3,7.3,9.7,10.6,9.7,10.6l33.2,19.1V94.7L24.6,81.6
            C14.1,74.5,12.5,63,12.5,60.7z" class="st1"></path><path d="M37.6,16.9c3.1-1.8,8.4-3,12.6-3c3.5,0,8.8,0.9,12,2.7l22.9,13.2l12.5-7.2L65.1,3.9c0,0-5.9-3.5-15-3.5
            c-9.7,0-15,3.5-15,3.5L2.6,22.5l12.5,7.2L37.6,16.9z" class="st1"></path><path d="M100,27l-12.6,7.2l0,25.7c0,3.7-1.4,13.9-11.4,21.4L52.4,94.7v14.5L85,90.6c0,0,6-3.2,10.6-11.1
            c4.2-7.2,4.4-13.3,4.4-13.3V27z" class="st1"></path></g>
          </svg>
        </a>
      </div>
      <div class="flex items-center h-full px-6 space-x-4 border-r border-white">
        <button
          class="flex items-center hover:underline hover:text-yellow-400"
          on:click={() => scrollTo(document.querySelector('.footer'))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          <span class="hidden md:block">Contato</span>
        </button>
      </div>
      <div class="flex items-center h-full pl-6 space-x-3">
        <a
          href="/admin"
          title="Painel do Administrador"
          class="flex items-center hover:text-yellow-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </a>
        <a
          href="/admin/editor"
          title="Novo Orçamento"
          class="flex items-center hover:text-yellow-400"
        >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        </a>
      </div>
    </div>
  </div>

  <!-- Intro -->
  <div
    class="flex items-end justify-center w-screen h-screen rellax intro {heroTransition && 'opacity-70'}"
    style="background-image: url({heroImages.length > 0 ? heroImages[heroIndex].url : ''});"
    data-rellax-speed="-8"
  >
    <div class="absolute bottom-0 w-full h-2/3 hero-shadow" />

    <div class="absolute hidden space-x-2 md:flex bottom-24 right-36">
      {#each heroImages as _, i (i)}
        <button
          class="flex items-center justify-center w-6 h-6 border-2 border-white rounded-full"
          on:click={() => heroIndex = i}
        >
          <div class="w-4 h-4 rounded-full {i === heroIndex && 'bg-white'}" />
        </button>
      {/each}
    </div>

    <div class="z-20 flex flex-col items-start w-screen px-10 pb-20 select-none lg:px-0 lg:w-3/6">
      <div class="flex flex-col w-full h-full text-white hero">
        <h1>{heroData.header}</h1>
        <h2>{heroData.subtitle}</h2>
        <span class="mt-6">{heroData.text}</span>
      </div>
      <button
        class="flex items-center w-auto pr-8 mt-6 text-white learn-more"
        on:click={() => scrollTo(document.querySelector('.about'))}
      >
        <div class="flex items-center justify-center border-2 border-white rounded-full w-14 h-14 learn-more-hover">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <span class="ml-8 font-semibold learn-more-hover">SAIBA MAIS</span>
      </button>
    </div>
    <div class="hidden lg:flex lg:w-2/6">
    </div>
  </div>

  <!-- About Us -->
  <div
    class="flex flex-col max-w-[1920px] justify-evenly items-center w-screen h-screen mt-[180px] bg-white rellax about select-none pt-20 lg:pt-0 pl-8 lg:pl-28"
    data-rellax-speed="-2"
  >
    <div
      class="absolute left-0 z-0 w-1/3 about-bg about-bg--top rellax"
      data-rellax-speed="2"
    >
      <img
        src="/images/poltrona.png"
        alt=""
        class="w-full h-auto"
        draggable="false"
      />
    </div>

    <div
      class="absolute right-0 z-0 w-1/3 about-bg about-bg--bot rellax"
      data-rellax-speed="2"
    >
      <img
        src="/images/sofa_gray.png"
        alt=""
        class="w-full h-auto"
        draggable="false"
      />
    </div>

    <div class="z-10 grid w-full grid-cols-3 pr-8 lg:grid-cols-2 info lg:pr-28">
      <div class="col-span-1" />
      <div class="col-span-2 pt-10 lg:col-span-1">{aboutData.text}</div>
    </div>

    <div class="z-10 w-full catch">
      <h1>{@html aboutData.header}</h1>
    </div>

    <div class="z-10 w-full">
      <button
        class="flex items-center w-auto pr-8 mt-6 text-black learn-more"
        on:click={() => scrollTo(document.querySelector('.products'))}
      >
        <div class="flex items-center justify-center border-2 border-black rounded-full w-14 h-14 learn-more-hover-dark">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <span class="ml-8 font-semibold learn-more-hover-dark">
          CONHEÇA NOSSOS PRODUTOS
        </span>
      </button>
    </div>
  </div>

  <!-- Products -->
  <div
    class="flex justify-center items-center max-w-[1920px] w-screen h-screen mt-[180px] bg-white rellax products select-none px-8 lg:px-28"
    data-rellax-speed="-2"
  >
    {#if slideItems.length > 0}
      <div class="w-full">
        <div
          class="flex flex-col justify-center w-full space-y-8 lg:space-y-0 lg:space-x-16 lg:flex-row {slideTransition ? 'opacity-0' : 'opacity-100'}"
          style="transition: opacity 0.3s ease;"
        >
          <div
            class="relative h-1/3 pb-[100%] lg:w-1/3 lg:pb-[33.333333%] bg-blue-100 bg-cover"
            style="background-image: url({slideItems[slideIndex].image});"
          />
          <div class="flex flex-col justify-center max-w-full md:max-w-[70%] lg:max-w-lg">
            <span class="product-name">{slideItems[slideIndex].name}</span>
            <p class="product-text">{slideItems[slideIndex].text}</p>
          </div>
        </div>
      </div>
    {/if}

    <button
      class="absolute items-center justify-center hidden w-10 h-10 lg:flex lg:left-32 lg:hover:text-yellow-400"
      title="Próximo"
      on:click={previousSlide}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      class="absolute items-center justify-center hidden w-10 h-10 lg:flex lg:right-32 lg:hover:text-yellow-400"
      title="Próximo"
      on:click={nextSlide}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <button
      class="absolute flex items-center justify-center w-auto h-12 bottom-10 md:h-16 md:right-20 md:bottom-20 lg:right-32 learn-more"
      on:click={() => scrollTo(document.querySelector('.projects'))}
    >
      <div class="flex items-center justify-center border-2 border-black rounded-full w-14 h-14 learn-more-hover">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      <span class="ml-8 font-semibold learn-more-hover">
        NOSSO PORTFÓLIO
      </span>
    </button>
  </div>

  <!-- Projects -->
  <div
    class="flex justify-center items-center max-w-[1920px] w-screen h-screen mt-[180px] bg-white rellax projects select-none px-8 lg:px-28 mb-[1000px]"
    data-rellax-speed="-2"
  >
    {#if prSlideItems.length > 0}
      <div class="w-full">
        <div
          class="flex flex-col justify-center w-full space-y-8 lg:space-y-0 lg:space-x-16 lg:flex-row {prSlideTransition ? 'opacity-0' : 'opacity-100'}"
          style="transition: opacity 0.3s ease;"
        >
          <div
            class="relative h-1/3 pb-[100%] lg:w-1/3 lg:pb-[33.333333%] bg-blue-100 bg-cover"
            style="background-image: url({prSlideItems[prSlideIndex].image});"
          />
          <div class="flex flex-col justify-center max-w-full md:max-w-[70%] lg:max-w-lg">
            <span class="project-name">{prSlideItems[prSlideIndex].name}</span>
            <p class="project-text">{prSlideItems[prSlideIndex].text}</p>
          </div>
        </div>
      </div>
    {/if}

    <h1 class="absolute projects-title top-28">Nosso Portfólio</h1>

    <button
      class="absolute items-center justify-center hidden w-10 h-10 lg:flex lg:left-32 lg:hover:text-yellow-400"
      title="Próximo"
      on:click={previousPrSlide}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      class="absolute items-center justify-center hidden w-10 h-10 lg:flex lg:right-32 lg:hover:text-yellow-400"
      title="Próximo"
      on:click={nextPrSlide}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <button
      class="absolute flex items-center justify-center w-auto h-12 bottom-10 md:h-16 md:right-20 md:bottom-20 lg:right-32 learn-more"
      on:click={() => scrollTo(document.querySelector('.footer'))}
    >
      <div class="flex items-center justify-center border-2 border-black rounded-full w-14 h-14 learn-more-hover">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      <span class="ml-8 font-semibold learn-more-hover">
        FALE COM A GENTE
      </span>
    </button>
  </div>

  <!-- Footer -->
  <div
    class="absolute z-40 bottom-0 flex flex-col w-full max-w-[1920px] p-8 lg:px-32 lg:py-14 footer lg:min-h-screen lg:justify-center"
  >
    <div class="flex flex-col w-full space-y-8 lg:space-y-0 lg:grid lg:grid-cols-8">
      <div class="grid w-full grid-cols-2 col-span-6 gap-3 lg:pr-10">
        <!-- Name -->
        <div class="flex flex-col col-span-full">
          <span class="select-none medium">Fale com a gente:</span>
          <InputMask
            type="text"
            name="name"
            placeholder="Nome"
            class="flex items-center w-full h-10 px-4 mt-3 text-sm bg-transparent border-2 border-[#4c494373] rounded placeholder-[#4C4943]"
            unmask="typed"
            imask={nameOptions}
            bind:value={values.name}
          />
        </div>

        <!-- Email -->
        <div class="flex flex-col col-span-full">
          <InputMask
            type="text"
            name="email"
            placeholder="E-mail"
            class="flex items-center w-full h-10 px-4 text-sm bg-transparent border-2 border-[#4c494373] rounded placeholder-[#4C4943]"
            unmask="typed"
            imask={emailOptions}
            bind:value={values.email}
          />
        </div>

        <!-- Phone -->
        <div class="flex flex-col col-span-full lg:col-span-1">
          <InputMask
            type="text"
            name="phone"
            placeholder="Telefone"
            class="flex items-center w-full h-10 px-4 text-sm bg-transparent border-2 border-[#4c494373] rounded placeholder-[#4C4943]"
            unmask="typed"
            imask={phoneOptions}
            bind:value={values.phone}
          />
        </div>

        <!-- City -->
        <div class="flex flex-col col-span-full lg:col-span-1">
          <InputMask
            type="text"
            name="city"
            placeholder="Cidade"
            class="flex items-center w-full h-10 px-4 text-sm bg-transparent border-2 border-[#4c494373] rounded placeholder-[#4C4943]"
            unmask="typed"
            imask={cityOptions}
            bind:value={values.city}
          />
        </div>

        <!-- Message -->
        <div class="flex flex-col col-span-full">
          <TextareaMask
            name="message"
            placeholder="Mensagem..."
            class="w-full h-28 lg:h-60 p-4 text-sm bg-transparent border-2 border-[#4c494373] rounded placeholder-[#4C4943]"
            unmask="typed"
            imask={messageOptions}
            bind:value={values.message}
          />
        </div>

        <!-- Submit -->
        <div class="flex flex-col col-span-full">
          <button
            class="flex items-center justify-center w-full h-10 px-4 text-md font-semibold bg-[#4c494373] rounded text-[#fffbf5] hover:bg-[#4C4943]"
            on:click={handleSubmitContact}
          >
            Enviar
          </button>
        </div>
      </div>

      <div class="flex flex-col col-span-2">
        <span class="select-none medium">Onde estamos?</span>
        <span class="mt-2 small">Rua das Casas, 1234</span>
        <span class="small">Cuiabá - MT</span>
        <a
          href="https://www.instagram.com/orocasaoficial/"
          target="blank"
          class="flex items-center mt-5 small hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-[2px] mr-[14px]"  fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
          </svg>
          @orocasaoficial
        </a>
        <a
          href="https://br.pinterest.com/orocasaoficial/_saved/"
          target="blank"
          class="flex items-center mt-2 small hover:underline"
        >
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-[2px] mr-[14px]" fill="currentColor">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
          </svg>
          @orocasaoficial
        </a>
        <a
          href="https://3dwarehouse.sketchup.com/user/b53ae5c8-3abb-4987-a57d-89fa1ce68c91/Oro-Casa"
          target="blank"
          class="flex items-center mt-2 small hover:underline"
        >
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 109.1 109.1" xml:space="preserve" class="w-5 h-5 ml-[2px] mr-[14px]" fill="currentColor">
            <g><polygon points="52.4,68.7 65,61.4 65,47 52.4,54.1 	" class="st1"></polygon><polygon points="35,47 35,61.5 47.4,68.6 47.4,54.1 	" class="st1"></polygon><path d="M82.5,60.8V34.1l-23-13.2c-2-1.1-5.2-2.1-9.5-2.1c-4.9,0-8,1.3-10,2.3L17.6,34v27c0,3.6,2.8,11.6,9.2,16
            L50,90.4L73,77.2C80.1,72.6,82.5,64,82.5,60.8z M70,64.6L50,76L30.1,64.6l0-22.9l20-11.6L70,41.6V64.6z" class="st1"></path><polygon points="37.5,42.6 50,49.8 62.5,42.7 50,35.5 	" class="st1"></polygon><path d="M12.5,60.7V34.1L0,26.9v39.4c0,0,0.5,6.5,4.4,13.2c4.3,7.3,9.7,10.6,9.7,10.6l33.2,19.1V94.7L24.6,81.6
            C14.1,74.5,12.5,63,12.5,60.7z" class="st1"></path><path d="M37.6,16.9c3.1-1.8,8.4-3,12.6-3c3.5,0,8.8,0.9,12,2.7l22.9,13.2l12.5-7.2L65.1,3.9c0,0-5.9-3.5-15-3.5
            c-9.7,0-15,3.5-15,3.5L2.6,22.5l12.5,7.2L37.6,16.9z" class="st1"></path><path d="M100,27l-12.6,7.2l0,25.7c0,3.7-1.4,13.9-11.4,21.4L52.4,94.7v14.5L85,90.6c0,0,6-3.2,10.6-11.1
            c4.2-7.2,4.4-13.3,4.4-13.3V27z" class="st1"></path></g>
          </svg>
          Oro Casa
        </a>
        <a
          href="mailto:contato@orocasa.com.br"
          target="blank"
          class="flex items-center mt-2 small hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          contato@orocasa.com.br
        </a>
        <a
          href="tel:+5565999116685"
          target="blank"
          class="flex items-center mt-2 small hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          (65) 9 9911-6685
        </a>
      </div>
    </div>

    <!-- <div class="flex flex-col items-center w-full mt-8 lg:mt-12 lg:border-black lg:border-t lg:border-b lg:flex-row">
      <div class="flex items-center w-full py-4 border-b border-black lg:border-b-0 lg:w-1/2 lg:py-8 lg:pr-10 lg:border-r">
        <span class="text-md">E-mail</span>
        <a
          href="mailto:contato@orocasa.com.br"
          class="ml-auto big hover:underline"
        >
          contato@orocasa.com.br
      </a>
      </div>
      <div class="flex items-center w-full py-4 lg:w-1/2 lg:py-8 lg:pl-10">
        <span class="mr-auto text-md">Telefone</span>
        <a
          href="tel:+5565999116685"
          class="big hover:underline"
        >
          (65) 9 9911-6685
        </a>
      </div>
    </div> -->

    <div class="flex items-end justify-between w-full h-12 mt-3 border-t lg:mt-8 lg:mt-12">
      <span class="small fade">Copyright © {getCurrentYear()}</span>
      <a href="https://saikoosistemas.com.br" target="blank">
        <div
          style="background-image:url(/images/brand_saikoo.png);"
          class="w-[100px] bg-cover h-7"
        />
      </a>
    </div>
  </div>
</main>

<style scoped>
  :root {
    --color-gold: rgb(253, 203, 109);
    --color-gold-dark: rgb(200, 130, 20);
  }

  main {
    scroll-snap-type: y mandatory;
  }

  main > div {
    scroll-snap-align: start;
  }

  .header {
    @apply border-white;
    transition: all 0.3s ease;
  }

  .header .header-border {
    @apply bg-white;
    width: calc(100% - 7rem);
  }

  .header .links {
    @apply text-white;
    font-family: 'Swis721 BT Bold';
    font-size: 14px;
  }

  .header .links button {
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  }

  .header--scrolled {
    @apply bg-white;
  }

  .header--scrolled img {
    filter: invert(1);
  }

  .header--scrolled .header-border {
    @apply hidden;
  }

  .header--scrolled .links {
    @apply text-black;
  }

  @media (max-width: 768px) {
    .header img {
      transition: height 0.15s ease;
    }

    .header--scrolled img {
      height: 0;
    }

    .header--scrolled .links {
      margin-top: 0;
    }
  }

  /* Intro */
  .intro {
    background-size: cover;
    background-position: 100% center;
    opacity: 100%;
    transition: background-image 0.8s ease, opacity 0.3s ease;
  }

  /* Hero */
  .hero {
    font-family: 'Swis721 BT Bold';
  }

  .hero-shadow {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }

  .hero h1 {
    font-size: 725%;
    font-weight: 900;
    line-height: 0.6;
    text-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
  }

  .hero h2 {
    font-size: 625%;
    font-weight: 500;
    text-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
  }

  .hero span {
    font-size: 175%;
    line-height: 1.4;
    text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 16vw;
    }

    .hero h2 {
      font-size: 13vw;
    }

    .hero span {
      font-size: 6vw;
    }
  }

  /* About Us */
  .about {
    font-family: 'Swis721 BT Bold';
  }

  .about-bg {
    filter: opacity(0.3);
  }

  .about-bg--top {
    bottom: calc(100% * 0.65 - 213px);
  }

  .about-bg--bot {
    top: calc(100% * 0.55 - 213px);
  }

  .about .info {
    font-size: 175%;
    line-height: 1.1;
    word-break: break-word;
  }

  .about .catch {
    font-size: 700%;
    font-weight: 500;
    line-height: 1;
  }

  .about .catch b {
    font-weight: 900;
  }

  @media (max-width: 768px) {
    .about-bg--top {
      bottom: calc(100% * 0.2 - 213px);
      width: 100%;
      height: 100%;
    }

    .about-bg--bot {
      top: calc(100% * 0.5 - 213px);
      width: 100%;
      height: 100%;
    }

    .about .info {
      font-size: 6vw;
    }

    .about .catch {
      font-size: 16vw;
      line-height: 1;
    }
  }

  /* Products */
  .product-name,
  .project-name {
    font-family: 'Swis721 BT Bold';
    color: #4C4943;
    font-size: 450%;
    font-weight: 900;
  }

  .product-text,
  .project-text {
    font-family: 'Swis721 BT Bold';
    color: #4C4943;
    font-size: 175%;
    font-weight: 500;
    line-height: 1.2;
  }

  .projects-title {
    font-family: 'Swis721 BT Bold';
    color: #4C4943;
    font-size: 200%;
    font-weight: 900;
  }

  @media (max-width: 768px) {
    .product-name,
    .project-name {
      font-size: 6.5vw;
    }

    .product-text,
    .project-text {
      font-size: 3.5vw;
    }
  }

  /* Footer */
  .footer {
    font-family: 'Swis721 BT Bold';
    color: #4C4943;
    /* background-color: #EBE7E1; */
    background-color: white;
  }

  .footer .small {
    font-size: 110%;
    line-height: 1.2;
  }

  .footer .medium {
    font-size: 180%;
  }

  .footer .big {
    font-size: 250%;
  }

  .footer .fade {
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    .footer .small {
      font-size: 4vw;
    }

    .footer .medium {
      font-size: 6vw;
    }

    .footer .big {
      font-size: 6vw;
    }
  }

  /* Button: Learn More */
  .learn-more {
    font-family: 'Swis721 BT Bold';
  }

  .learn-more,
  .learn-more-hover,
  .learn-more-hover-dark {
    transition: all 0.3s ease;
    /* text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8); */
  }

  .learn-more:hover .learn-more-hover {
    border-color: var(--color-gold);
    color: var(--color-gold);
  }

  .learn-more:hover .learn-more-hover-dark {
    border-color: var(--color-gold-dark);
    color: var(--color-gold-dark);
  }
</style>
