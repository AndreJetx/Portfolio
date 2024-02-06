export function espanhol(body){
    body.innerHTML =
    `<body id="body">
        <nav id="navegacao" class="nav">
            
            <div class="container">
                <a class="cabecalho-nome" href="#home">AndreJuan</a>
                                
                    <div class="cabecalho-menu">
                        <ul>
                            <li><a href="#sobre-mim">Sobre mi</a></li>
                            <li><a href="#projetos">Proyectos</a></li>
                            <li><a href="#conhecimentos">Conocimiento</a></li>
                            <li><a href="#contato">Contacto</a></li>
                        </ul>
                        <ul class="lista-redes-sociais">
                            <li>
                                <a href="https://www.instagram.com/andrejetx/" title="Instagram" target="_blank" rel="noopener noreferrer">
                                    <svg class="icones-redes-sociais" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 1.99997H7C4.23858 1.99997 2 4.23855 2 6.99997V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V6.99997C22 4.23855 19.7614 1.99997 17 1.99997Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M15.9997 11.3701C16.1231 12.2023 15.981 13.0523 15.5935 13.7991C15.206 14.5459 14.5929 15.1515 13.8413 15.5297C13.0898 15.908 12.2382 16.0397 11.4075 15.906C10.5768 15.7723 9.80947 15.3801 9.21455 14.7852C8.61962 14.1903 8.22744 13.4229 8.09377 12.5923C7.96011 11.7616 8.09177 10.91 8.47003 10.1584C8.84829 9.40691 9.45389 8.7938 10.2007 8.4063C10.9475 8.0188 11.7975 7.87665 12.6297 8.00006C13.4786 8.12594 14.2646 8.52152 14.8714 9.12836C15.4782 9.73521 15.8738 10.5211 15.9997 11.3701Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M17.5 6.49997H17.51" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </a>
                            </li>
                            
                            <li>
                                <a href="https://github.com/AndreJetx" title="Github" target="_blank" rel="noopener noreferrer">
                                    <svg class="icones-redes-sociais" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" fill="white"></path>
                                    </svg>
                                </a>
                            </li>
                            
                            <li>
                                <a href="https://www.linkedin.com/in/andre-juan-74569967/" title="linkedin" target="_blank" rel="noopener noreferrer">
                                    <svg class="icones-redes-sociais" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" fill="white"></path>
                                    </svg>
                                </a>
                            </li>                        
                        </ul>
                    </div>
    
                    <button aria-expanded="false" aria-label="Abrir menu" class="open-menu open">
                        <svg width="40" height="40" viewBox="0 0 40 40"1 fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20H30" stroke="#00856F" stroke-width="2" stroke-linecap="round"        stroke-linejoin="round"/>
                            <path d="M10 12H30" stroke="#00856F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18 28L30 28" stroke="#00856F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
    
                    <button aria-expanded="true" aria-label="Fechar menu" class="close-menu close">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30 10L10 30M10 10L30 30" stroke="#FFFAF1" stroke-width="2"            stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
            </div>
        </nav>
        
        <section id="home" class="home">
            <div class="container">
                <div class="apresentacao col-a">
                    <header>
                        <h4>Hello world 👋🏾</h4>
                        <h1>Eu sou o André</h1>
                    </header>
                    <div class="apresentacao-1">
                        <p class="linha digitando">Desenvolvedor Web Front-end.</p>
                        <a class="button-contato" href="#contato">Fale Comigo</a>
                    </div>
                </div>
                
                <div class="imagem-home col-b">
                    <img class="imagem-escp primeiro" src="./src/img/eat-home-dm.png" alt="">
                    <img class="imagem-escp segundo" src="./src/img/sleep-home-dm.png" alt="">
                    <img class="imagem-escp terceiro" src="./src/img/code-home-dm.png" alt="">
                    <img class="imagem-escp quarto" src="./src/img/repeat-home-dm.png" alt="">
                </div>
            </div>
        </section>
        
        <section id="sobre-mim" class="sobre-mim">
            <div class="container">
                <div class="descricao-sobre-mim col-a">
                    <h1>Sobre Mim</h1>
                    <p>
                        Como desenvolvedor Frontend com 2 anos de experiencia em TI, meu foco principal e Javascript, TypeScript, React e NodeJs.
                        Possuo Habilidades em Banco de dados relacionais e nao relacionais assim como controle de versionamento com Git. 
                        Graduado em ciências da computação, busco sempre me desenvolver naquilo que gosto de fazer, sou Front-end mas os estudos em Back-End para me tornar um Dev FullStack esta em progresso, conheça meus projetos e trajetoria de programaçao a seguir;
                    </p>
                </div>
                <div class="col-b">
                    <img class="img-eu" src="./src/img/eu.jpg" alt="">
                </div>
            </div>
        </section>
    
        <section id="projetos" class="projetos">
            <div class="container">
                <header>
                    <h2>PROJETOS</h2>
                </header>
                <div class="cards-projetos">
                    <div class="card">
                        <h3>Anime heroes - All Star Clash</h3>
                        <div class="img-overlay">
                            <img src="https://i.makeagif.com/media/1-31-2017/27a0Bt.gif" alt="gif projeto 1">
                            <div class="buttons">
                                <a href="https://github.com/AndreJetx/Anime-Heroes-Allstar-Clash" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" fill="rgba(255,255,255,1)"></path>
                                        </svg>
                                </a>
                                
                                <a href="https://andrejetx.github.io/Anime-Heroes-Allstar-Clash/" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                                        </svg>
                                </a>
                            </div>
                        </div>
    
                        <p>Site em desenvolvimento para um projeto de game de combate em plataforma 2d</p>
    
                        <p> HTML - CSS - JS</p>
    
                    </div>
    
                    <div class="card">
                        <h3>Previsao do tempo</h3>
                        <div class="img-overlay">
                            <img src="https://phoneky.co.uk/thumbs/screensavers/down/nature/1184252_PGnUX7Hz.gif" alt="gif projeto 1"> 
                            <div class="buttons">
                                <a href="https://github.com/AndreJetx/previsao-do-tempo" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" fill="rgba(255,255,255,1)"></path>
                                        </svg>
                                </a>
                                
                                <a href="https://andrejetx.github.io/previsao-do-tempo/" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                                        </svg>
                                </a>
                            </div>
                        </div>
    
                        <p>Aplicativo para ver a previsao do tempo em qualquer lugar do mundo, utilizando de consumo da api Weather </p>
    
                        <p> HTML - CSS - JS</p>
    
                    </div>
    
                    <div class="card">
                        <h3>AJ Store</h3>
                        <div class="img-overlay">
                            <img src="https://gifdb.com/images/high/coding-animated-laptop-flow-stream-ja04010rm5o68zfk.gif" alt="gif projeto 1">
                            <div class="buttons">
                                <a href="https://github.com/AndreJetx/AndreStore" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" fill="rgba(255,255,255,1)"></path>
                                        </svg>
                                </a>
                                
                                <a href="http://" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                                        </svg>
                                </a>
                            </div>
                        </div>
    
                        <p>Projeto em processo de finalizaçao - Deploy ainda nao realizado, confira o codigo no repositorio do github</p>
    
                        <p> NODE.JS - REACT - TS </p>
                    </div>
    
                    <div></div>
    
                    <div class="card em-breve">
                        <h3>Em Breve</h3>
    
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm14 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="rgba(255,255,255,1)"></path>
                        </svg>
    
                        <p>Evoluçao constante!<br> Em breve muitos outros projetos. </p>
    
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 70 70" xml:space="preserve"><path d="M62.817 2.583H6.026c-2.209 0-3.443 2.06-3.443 4.269v57c0 2.209 1.234 2.731 3.443 2.731h57c2.209 0 3.557-.522 3.557-2.731v-58c0-2.209-1.557-3.269-3.766-3.269zm-.234 4v9h-56v-9h56zm-56 56v-45h56v45h-56z" fill="rgba(255,255,255,1)"/>
                        <path d="M10.417 12.583h2a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2zm6 0h2a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2zm6 0h2a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2zm3.692 20.494a.998.998 0 0 0-1.406.143l-5.944 7.283a.998.998 0 0 0-.021 1.238l5.944 7.801a.997.997 0 0 0 1.401.189 1 1 0 0 0 .188-1.401l-5.466-7.173 5.445-6.673a.996.996 0 0 0-.141-1.407zm18.219.168a1 1 0 1 0-1.589 1.213l5.466 7.172-5.445 6.674a.997.997 0 0 0 .143 1.406.997.997 0 0 0 1.406-.142l5.944-7.284a.998.998 0 0 0 .021-1.238l-5.946-7.801zm-13.087-1.511a1.001 1.001 0 0 0-1.86.738l7.916 19.918a1 1 0 1 0 1.86-.738l-7.916-19.918z" fill="rgba(255,255,255,1)"/></svg>
    
                            
                    </div>
    
                    <div></div>
    
                    
                    
                </div>
            </div>
            
        </section>
    
        <section id="conhecimentos" class="conhecimentos">
            <div class="container">
                <header>
                    <h2>
                        Conhecimento
                    </h2>
                </header>
    
                <div class="cards-conhecimentos">
                    <div class="card">
                        <img src="./src/img/html.png" alt="">
                        <h3>HTML</h3>
                        <p>Começando minha trajetoria em web, me dediquei a aprender suas tags e organograma, para fabricar aplicaçoes e sites para internet.</p>
                    </div>
    
                    <div class="card">
                        <img src="./src/img/css.png" alt="">
                        <h3>CSS</h3>
                        <p>Em conjunto com HTML e em constante aprendizado, utilizo do CSS3 para estilizar as paginas e deixalas interativas.</p>
                    </div>
                    <div class="card">
                        <img src="./src/img/javascript.png" alt="">
                        <h3>JavaScript</h3>
                        <p>Uso o JS para fazer o desenvolvimento de funcionalidades e comportamento das paginas.</p>
                    </div>
    
                    <div class="card">
                        <img src="./src/img/react.png" alt="">
                        <h3>React</h3>
                        <p><span>Com inicio de aprendizado em 2023</span>, utilizo o react para componentizar os elementos, facilitando a construção de interfaces interativas e responsivas.</p>
                    </div>
    
                    <div class="card">
                        <img src="./src/img/tailwind.png" alt="">
                        <h3>Tailwind</h3>
                        <p><span>Com inicio de aprendizado em 2023</span> o tailwind foca na criação de estilos diretamente no HTML usando classes utilitárias permitindo estilos únicos e eficientes</p>
                    </div>
    
                    <div class="card">
                        <img src="./src/img/typescript.png" alt="">
                        <h3>Typescript</h3>
                        <p><span>Com inicio de aprendizado em 2023</span>,o TS funciona como uma extençao do JS, estou dedicando meu tempo a dominar a linguagem  </p>
                    </div>
    
                    <div class="card">
                        <img src="./src/img/node.png" alt="">
                        <h3>Node.JS</h3>
                        <p><span>Com inicio de aprendizado em 2023</span>, utilizo o node para instaçao simplificada de bibliotecas e frameworks, alem de desenvolver aplicaçoes escalaveis, e conexoes de redes eficiente </p>
                    </div>
    
                    <div class="card">
                        <img src="./src/img/redux.png" alt="">
                        <h3>Redux</h3>
                        <p><span>Com inicio de aprendizado em <span class="span-conhecimentos">setembro</span> de 2023</span>, redux é uma biblioteca de gerenciamento de estado para aplicações JavaScript, especialmente com frameworks como React.</p>
                    </div>           
                </div>
    
            </div>
        </section>
    
        <section id="contato" class="contato">
            <div class="contato-colunas">
                <div class="contato-col-a">
                    <header>
                        <h2>Fale comigo !</h2>                    
                    </header>
                    <div>
                        <ul>
                            <li>
                                <a href="mailto: andrjetx@yahoo.com.br" target="_blank">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="rgba(0, 132, 255, 0.616)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M22 6L12 13L2 6" stroke="rgba(0, 132, 255, 0.616)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                                <p>andrjetx@yahoo.com.br</p>
                                </a>
                            </li>
                                <a href="tel:+5531973028867" target="_blank">
                                    <svg width="24" height="24" viewBox="0 0 24 24" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><path d="M21 15v3.93a2 2 0 0 1-2.29 2A18 18 0 0 1 3.14 5.29 2 2 0 0 1 5.13 3H9a1 1 0 0 1 1 .89 10.74 10.74 0 0 0 1 3.78 1 1 0 0 1-.42 1.26l-.86.49a1 1 0 0 0-.33 1.46 14.08 14.08 0 0 0 3.69 3.69 1 1 0 0 0 1.46-.33l.49-.86a1 1 0 0 1 1.3-.38 10.74 10.74 0 0 0 3.78 1 1 1 0 0 1 .89 1Z" style="fill:none;stroke:rgba(0, 132, 255, 0.616);stroke-linecap:round;stroke-linejoin:round;stroke-width:2"/>
                                    </svg>
                                    <p>+55 31 97302-8867</p>
                                </a>
                            </li>
                        </ul>
                        <a class="button-contato" href="https://wa.me/+5531973028867" target="_blank">
                            <svg class="svg-container" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6 14.0001C16.4 13.9001 15.1 13.3001 14.9 13.2001C14.7 13.1001 14.5 13.1001 14.3 13.3001C14.1 13.5001 13.7 14.1001 13.5 14.3001C13.4 14.5001 13.2 14.5001 13 14.4001C12.3 14.1001 11.6 13.7001 11 13.2001C10.5 12.7001 10 12.1001 9.6 11.5001C9.5 11.3001 9.6 11.1001 9.7 11.0001C9.8 10.9001 9.9 10.7001 10.1 10.6001C10.2 10.5001 10.3 10.3001 10.3 10.2001C10.4 10.1001 10.4 9.9001 10.3 9.8001C10.2 9.7001 9.7 8.5001 9.5 8.0001C9.4 7.3001 9.2 7.3001 9 7.3001C8.9 7.3001 8.7 7.3001 8.5 7.3001C8.3 7.3001 8 7.5001 7.9 7.6001C7.3 8.2001 7 8.9001 7 9.7001C7.1 10.6001 7.4 11.5001 8 12.3001C9.1 13.9001 10.5 15.2001 12.2 16.0001C12.7 16.2001 13.1 16.4001 13.6 16.5001C14.1 16.7001 14.6 16.7001 15.2 16.6001C15.9 16.5001 16.5 16.0001 16.9 15.4001C17.1 15.0001 17.1 14.6001 17 14.2001C17 14.2001 16.8 14.1001 16.6 14.0001ZM19.1 4.9001C15.2 1.0001 8.9 1.0001 5 4.9001C1.8 8.1001 1.2 13.0001 3.4 16.9001L2 22.0001L7.3 20.6001C8.8 21.4001 10.4 21.8001 12 21.8001C17.5 21.8001 21.9 17.4001 21.9 11.9001C22 9.3001 20.9 6.8001 19.1 4.9001ZM16.4 18.9001C15.1 19.7001 13.6 20.2001 12 20.2001C10.5 20.2001 9.1 19.8001 7.8 19.1001L7.5 18.9001L4.4 19.7001L5.2 16.7001L5 16.4001C2.6 12.4001 3.8 7.4001 7.7 4.9001C11.6 2.4001 16.6 3.7001 19 7.5001C21.4 11.4001 20.3 16.5001 16.4 18.9001Z" fill="rgba(0, 132, 255, 0.616)"></path>
                            </svg>
                            <h3>WHATSAPP</h3>
                        </a>
                    </div>    
                </div>
                <div class="contato-col-b">
                    <img src="./src/img/contact.gif" alt="gif animado da seçao contato">
                </div>
            </div>
        </section>
    
        <footer>
            <div class="container">
                <div class="footer-col-a">
                    <a class="cabecalho-nome" href="#home"> Andre Juan </a>
    
                    <p>
                        ©2024 por Andre Juan. <br />
                        Todos os direitos reservados.
                    </p>
                </div>
    
                <div class="footer-col-b">
                    <ul class="lista-redes-sociais">
                        <li>
                            <a href="https://www.instagram.com/andrejetx/" title="Instagram" target="_blank">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 1.99997H7C4.23858 1.99997 2 4.23855 2 6.99997V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V6.99997C22 4.23855 19.7614 1.99997 17 1.99997Z" stroke="#FFFAF1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M15.9997 11.3701C16.1231 12.2023 15.981 13.0523 15.5935 13.7991C15.206 14.5459 14.5929 15.1515 13.8413 15.5297C13.0898 15.908 12.2382 16.0397 11.4075 15.906C10.5768 15.7723 9.80947 15.3801 9.21455 14.7852C8.61962 14.1903 8.22744 13.4229 8.09377 12.5923C7.96011 11.7616 8.09177 10.91 8.47003 10.1584C8.84829 9.40691 9.45389 8.7938 10.2007 8.4063C10.9475 8.0188 11.7975 7.87665 12.6297 8.00006C13.4786 8.12594 14.2646 8.52152 14.8714 9.12836C15.4782 9.73521 15.8738 10.5211 15.9997 11.3701Z" stroke="#FFFAF1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M17.5 6.49997H17.51" stroke="#FFFAF1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/AndreJetx" title="Github" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" fill="rgba(255,255,255,1)"></path>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/andre-juan-74569967/" title="LinkedIn" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" fill="rgba(255,255,255,1)"></path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>

        <div id="lang">
            <ul>
                <li>
                    <button>
                        <a href="./index.html">
                            <img src="./src/img/br-flag.png" alt="BR flag"/>
                        </a>
                    </button>
                    <button  id="switchLanguageen">
                        <img src="./src/img/eua-flag.png" alt="English Flag"/>
                    </button>
                    <button class="active" id="switchLanguageesp">
                        <img src="./src/img/esp-flag.png" alt="English Flag"/>
                    </button>
                </li>
            </ul>
        </div>
    
        <div id="toggle">
            <input type="checkbox" id="sw-checkbox">
            <label for="sw-checkbox" title="Mudar tema">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" fill="rgba(255,255,255,1)"></path>
                </svg>
            </label>
        </div>
    <script type="module" src="./src/js/index.js"></script>
    </body>`
}
