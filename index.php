<?php require 'api/Config.php';
    require 'api/User.php';
echo '<link rel="stylesheet" href="content/CSS/backoffice_v2.css">';

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forza</title>
    <link rel="stylesheet" href="content/CSS/style.css">
    <link rel="stylesheet" href="https://use.typekit.net/jny7sqx.css">
    <meta name="description" content="Rejoignez l'aventure Forza avec le Forza community club, participez à des évenements, des courses, des quizz et bien plus !">
</head>
<body>
    <header>
        <a href="index.html">
            <img src="content/SVG/logo.svg" id="logo" alt="Photo d'un peloton de voitures faisants la course sous la pluie">
        </a>
        <div>
            <a id="news" href="#nouveautes" class="nav_link">nouveautés</a>
            <a href="#event" class="nav_link">évenements</a>
            <a href="#formulaire" class="nav_link">Nous contacter</a>
            <a href="/inscription.php" class="nav_link">S'inscrire</a>
            <a href="/connexion.php" class="nav_link">Connexion</a>
        </div>

    </header>
    <main>
        <section class="main_section section_spacing">
            <div class="video_wrapper">
                <video autoplay loop muted width="100%" alt="video montrant le départ d'une course organisé par la communauté sur forza motorsport">
                    <source src="content/MP4/forza_trailer.mp4" type="video/mp4"/>
                </video>  
                <button class="video_pause">
                    <lord-icon
                        src="https://cdn.lordicon.com/jctchmfs.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style="width:100px;height:100px">
                    </lord-icon>
                    
                </button>
                <button class="video_play">
                    <lord-icon
                        src="https://cdn.lordicon.com/becebamh.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style="width:100px;height:100px">
                    </lord-icon>
                </button>
            </div>
            
            
            <h1>Pour la communauté par la communauté.</h1>
            <div class="text_span">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio repudiandae, repellendus natus facilis autem, iste saepe rem quas, enim voluptatum corrupti iusto aspernatur suscipit! Deserunt nihil nemo ducimus deleniti at!</p>
                <div class="button_wrapper">
                    <a href="#" class="link_button"><span>Accéder aux évenements</span></a>
                    <a href="#" class="link">Participer à un de nos quizz</a>
                </div>
            </div>
        </section>
        <section class="section_spacing news_section" id="nouveautes">
            <div class="section_wrapper">
                <div class="news_intro">
                    <h2>
                        Les news <br>du moment
                    </h2>
                    <p>Restez à l'affut des dernières actualités sur forza lorem</p>
                    <a href="https://forza.net" class="link">Se rendre sur forza.net</a>
                </div>
                <div class="news_list">
                    <div class="news_item">
                        <div class="news_item_title">
                            <label>Article<span> du 18 octobre 2023</span></label>
                            <h3>Une nouvelle mise à jour !</h3>    
                            <p>La première mise à jour du jeu vient d'arriver ! Elle cible principalement des bugs mineur rencontré lors de cette première semaine. Les problèmes de crash rencontrés en mode multijoueur ont pour la plus part été réglé. De plus, les problèmes de textures sur la Ford GT40 et sur la porsche...</p>
                        </div>
                        <div class="news_item_linkbox">
                            <a href="#" class="link">Lire l'article</a>
                        </div>
                    </div>
                    <div class="news_item">
                        <div class="news_item_title">
                            <label>Article<span> du 16 octobre 2023</span></label>
                            <h3>Une première mise à jour pour bientôt !</h3>    
                            <p>D'après nos informations, un premier patch devrait être déployé dans la semaine. Il devrait corrigé certains problèmes de textures rencontrés avec certaines des voitures. Nous pouvons aussi espérer qu'il corrige les crashs intempéstifs lors des connections au mode multijoueurs.</p>
                        </div>
                        <div class="news_item_linkbox">
                            <a href="#" class="link">Lire l'article</a>
                        </div>
                    </div>
                    <div class="news_item">
                        <div class="news_item_title">
                            <label>Article<span> du 11 octobre 2023</span></label>
                            <h3>Des problèmes de retour de forces ?</h3>
                            <p>Si jamais vous rencontrez des soucis avec le retour de force de votre volant sur Xbox Series, ne vous prenez pas la tête car acune solution n'a été trouvé pour le moment. Il semblerai tout de même que les utilisateurs touché soient principalement ceux ayant...</p>
                        </div>
                        <div class="news_item_linkbox">
                            <a href="#" class="link">Lire l'article</a>
                        </div>
                    </div>
                    <div class="news_item">
                        <div class="news_item_title">
                            <label>Article<span> du 10 octobre 2023</span></label>
                            <h3>C'est le jour J !</h3>           
                            <p>C'est le grand jour ! Nous sommes enfin le mardi 10 octobre, jour tant attendu de la sortie du jeu. Nous mettrons en ligne les premiers évenements que nous allons organiser dès que possible alors soyez attentif.</p>
                        </div>
                        <div class="news_item_linkbox">
                            <a href="#" class="link">Lire l'article</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section_spacing events_section" id="event">
            <h2>Les évenements à venir</h2>
            <div class="events_list">
                <div class="events_card">
                    <div class="events_card_td">
                        <h4 class="events_card_title">Championnat Formule Mazda</h4>
                        <p class="events_card_date1">du <span>20/10/2023</span></p>
                        <p class="events_card_date2">au <span>25/10/2023</span></p>
                    </div>
                    <div class="events_card_cta">
                        <a class="events_card_cta1" href="#">Billeterie</a>
                        <a class="events_card_cta2" href="#">Plus d'infos</a>
                    </div>
                </div>
                <div class="events_card">
                    <div class="events_card_td">
                        <h4 class="events_card_title">4h de Mapple Valley</h4>
                        <p class="events_card_date1">du <span>21/10/2023</span></p>
                        <p class="events_card_date2">au <span>21/10/2023</span></p>
                    </div>
                    <div class="events_card_cta">
                        <a class="events_card_cta1" href="#">Billeterie</a>
                        <a class="events_card_cta2" href="#">Plus d'infos</a>
                    </div>
                </div>                <div class="events_card">
                    <div class="events_card_td">
                        <h4 class="events_card_title">GT40 cup - manche 2</h4>
                        <p class="events_card_date1">du <span>23/10/2023</span></p>
                        <p class="events_card_date2">au <span>23/10/2023</span></p>
                    </div>
                    <div class="events_card_cta">
                        <a class="events_card_cta1" href="#">Billeterie</a>
                        <a class="events_card_cta2" href="#">Plus d'infos</a>
                    </div>
                </div>                <div class="events_card">
                    <div class="events_card_td">
                        <h4 class="events_card_title">6h de SPA</h4>
                        <p class="events_card_date1">du <span>25/10/2023</span></p>
                        <p class="events_card_date2">au <span>25/10/2023</span></p>
                    </div>
                    <div class="events_card_cta">
                        <a class="events_card_cta1" href="#">Billeterie</a>
                        <a class="events_card_cta2" href="#">Plus d'infos</a>
                    </div>
                </div>                <div class="events_card">
                    <div class="events_card_td">
                        <h4 class="events_card_title">GT40 cup - manche 3</h4>
                        <p class="events_card_date1">du <span>27/10/2023</span></p>
                        <p class="events_card_date2">au <span>27/10/2023</span></p>
                    </div>
                    <div class="events_card_cta">
                        <a class="events_card_cta1" href="#">Billeterie</a>
                        <a class="events_card_cta2" href="#">Plus d'infos</a>
                    </div>
                </div>                <div class="events_card">
                    <div class="events_card_td">
                        <h4 class="events_card_title">Halloween Race night</h4>
                        <p class="events_card_date1">du <span>30/10/2023</span></p>
                        <p class="events_card_date2">au <span>31/10/2023</span></p>
                    </div>
                    <div class="events_card_cta">
                        <a class="events_card_cta1" href="#">Billeterie</a>
                        <a class="events_card_cta2" href="#">Plus d'infos</a>
                    </div>
                </div>                <div class="events_card">
                    <div class="events_card_td">
                        <h4 class="events_card_title">Porsche CUP</h4>
                        <p class="events_card_date1">du <span>2/10/2023</span></p>
                        <p class="events_card_date2">au <span>5/10/2023</span></p>
                    </div>
                    <div class="events_card_cta">
                        <a class="events_card_cta1" href="#">Billeterie</a>
                        <a class="events_card_cta2" href="#">Plus d'infos</a>
                    </div>
                </div>                <div class="events_card">
                    <div class="events_card_td">
                        <h4 class="events_card_title">GT40 cup - Final race</h4>
                        <p class="events_card_date1">du <span>5/11/2023</span></p>
                        <p class="events_card_date2">au <span>5/11/2023</span></p>
                    </div>
                    <div class="events_card_cta">
                        <a class="events_card_cta1" href="#">Billeterie</a>
                        <a class="events_card_cta2" href="#">Plus d'infos</a>
                    </div>
                </div>
            </div>
        
        </section>
        <section class="section_spacing section_form" id="formulaire">
            <?php 
                
                if (isset($_SESSION['user_email']))
                {
                    echo '
                    <div class="user_container">
                        <h1 class="user_quizz_item_heading">Bonjour <span class="user_quizz_pseudo">'.$_SESSION['user_pseudo'].'</span> !<br>Ça te dit de <span class="user_quizz_heading_span">Participer à un quizz</span> ?</h1>
                        <ol role="list" class="user_quizz_list w-list-unstyled">
                     "';

                     getUserQuizzList($database);

                     echo '</ol>';
                }

            ?>
            </div>
        </section>
    </main>
    <footer>
        <section class="section_spacing">
            <div class="footer_div1">
                <img src="content/SVG/forza-white.svg" id="logo" alt="Photo en vue macro de goudront représentant la route">
                <p>Rejoignez notre newsletter pour rester à jour sur les nouveautés et sorties de forza</p>
                <div class="footer_div1_form">
                    <form>
                        <input type="email" id="email" placeholder="Entrez votre email">
                        <input type="submit" value="Je m'inscris !">
                    </form>
                    <p>En souscrivant à notre newsletter vous agréez à notre <a>politique de confidentialité</a> et acceptez que nous traitions vos données</p>
                </div>
            </div>
            <div class="footer_div2">
                <div class="footer_div2_nav">
                    <h3>Navigation</h3>
                    <a href="#nouveautes">Nouveautés</a>
                    <a href="#event">Evenements</a>
                    <a href="#formulaire">Nous contacter</a>
                </div>
            </div>
        </section>
    </footer>
</body>
</html>
<script src="script/jquery-3.7.1.min.js"></script>
<script src="https://cdn.lordicon.com/lordicon-1.2.0.js"></script>
<script src="script/script.js"></script>
<?php

require 'api/Admin.php';

?>