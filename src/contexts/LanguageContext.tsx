import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "fr";

type Translations = {
  [key: string]: { en: string; fr: string };
};

const translations: Translations = {
  // Nav
  "nav.home": { en: "Home", fr: "Accueil" },
  "nav.about": { en: "About Us", fr: "À Propos" },
  "nav.programs": { en: "Programs", fr: "Programmes" },
  "nav.impact": { en: "Impact", fr: "Impact" },
  "nav.getInvolved": { en: "Partner With Us", fr: "Devenir partenaire" },
  "nav.contact": { en: "Contact", fr: "Contact" },
  "nav.donate": { en: "Donate", fr: "Faire un don" },

  // Program names
  "programs.education": { en: "Education", fr: "Éducation" },
  "programs.agriculture": { en: "Agriculture", fr: "Agriculture" },
  "programs.entrepreneurship": { en: "Entrepreneurship", fr: "Entrepreneuriat" },
  "programs.vocational": { en: "Vocational Training", fr: "Formation Professionnelle" },
  "programs.leadership": { en: "Leadership and Community Impact", fr: "Leadership et Impact Communautaire" },

  // Hero
  "hero.badge": { en: "Inspiring Hope, Changing Lives", fr: "Inspirer l'espoir, changer des vies" },
  "hero.title1": { en: "Empowering Communities Through", fr: "Autonomiser les communautés par" },
  "hero.education": { en: "Education", fr: "l'Éducation" },
  "hero.opportunity": { en: "Opportunity", fr: "l'Opportunité" },
  "hero.subtitle": {
    en: "Aspire and Thrive Initiative is committed to uplifting youth and communities through mentorship, education, and community-driven development programs.",
    fr: "Aspire and Thrive Initiative s'engage à soutenir les jeunes et les communautés à travers le mentorat, l'éducation et les programmes de développement communautaire.",
  },
  "hero.explorePrograms": { en: "Explore Our Programs", fr: "Découvrir nos programmes" },
  "hero.getInvolved": { en: "Partner With Us", fr: "Devenir partenaire" },

  // About
  "about.label": { en: "Who We Are", fr: "Qui sommes-nous" },
  "about.title": { en: "Empowering Burundi's Youth for Sustainable Futures", fr: "Autonomiser la jeunesse du Burundi pour des avenirs durables" },
  "about.p1": {
    en: "Aspire and Thrive Initiative is a community-driven organization focused on supporting youth and communities through education, empowerment, mentorship, and social development programs across Burundi.",
    fr: "Aspire and Thrive Initiative est une organisation communautaire axée sur le soutien des jeunes et des communautés à travers l'éducation, l'autonomisation, le mentorat et les programmes de développement social au Burundi.",
  },
  "about.p2": {
    en: "We believe that when young people are given the tools, training, and mentorship they need, they can transform not only their own lives but their entire communities. Our programs span education, agriculture, entrepreneurship, vocational training, and leadership development.",
    fr: "Nous croyons que lorsque les jeunes reçoivent les outils, la formation et le mentorat dont ils ont besoin, ils peuvent transformer non seulement leur propre vie mais aussi leurs communautés entières. Nos programmes couvrent l'éducation, l'agriculture, l'entrepreneuriat, la formation professionnelle et le développement du leadership.",
  },
  "about.p3": {
    en: "Through partnerships with local communities and global supporters, we are building pathways to sustainable futures — one student, one family, one community at a time.",
    fr: "Grâce à des partenariats avec les communautés locales et les supporters mondiaux, nous construisons des voies vers des avenirs durables — un étudiant, une famille, une communauté à la fois.",
  },

  // Impact
  "impact.label": { en: "Our Impact", fr: "Notre impact" },
  "impact.title": { en: "Making a Difference, Together", fr: "Faire la différence, ensemble" },
  "impact.subtitle": {
    en: "Every number represents real people whose lives have been touched by the work we do across Burundi.",
    fr: "Chaque chiffre représente de vraies personnes dont la vie a été touchée par notre travail au Burundi.",
  },
  "impact.youthSupported": { en: "Youth Supported", fr: "Jeunes soutenus" },
  "impact.communitiesReached": { en: "Communities Reached", fr: "Communautés atteintes" },
  "impact.programsLaunched": { en: "Programs Launched", fr: "Programmes lancés" },
  "impact.livesImpacted": { en: "Lives Impacted", fr: "Vies impactées" },

  // Services / Programs overview
  "services.label": { en: "Our Programs", fr: "Nos programmes" },
  "services.title": { en: "How We Serve Our Communities", fr: "Comment nous servons nos communautés" },
  "services.subtitle": {
    en: "Comprehensive programs designed to empower youth and build sustainable futures.",
    fr: "Des programmes complets conçus pour autonomiser les jeunes et construire des avenirs durables.",
  },
  "services.learnMore": { en: "Learn More", fr: "En savoir plus" },
  "services.educationTitle": { en: "Education Support", fr: "Soutien à l'éducation" },
  "services.educationDesc": {
    en: "Quality education programs that empower underprivileged children and youth with knowledge, scholarships, and skills for a brighter future.",
    fr: "Des programmes éducatifs de qualité qui autonomisent les enfants et les jeunes défavorisés avec des connaissances, des bourses et des compétences pour un avenir meilleur.",
  },
  "services.mentorshipTitle": { en: "Youth Mentorship", fr: "Mentorat des jeunes" },
  "services.mentorshipDesc": {
    en: "One-on-one and group mentorship connecting young people with role models who guide them toward personal and professional growth.",
    fr: "Mentorat individuel et en groupe connectant les jeunes avec des modèles qui les guident vers la croissance personnelle et professionnelle.",
  },
  "services.communityTitle": { en: "Community Development", fr: "Développement communautaire" },
  "services.communityDesc": {
    en: "Sustainable agriculture, infrastructure, and economic programs that strengthen communities and create long-term impact.",
    fr: "Agriculture durable, infrastructure et programmes économiques qui renforcent les communautés et créent un impact à long terme.",
  },
  "services.familyTitle": { en: "Family Support Initiatives", fr: "Initiatives de soutien familial" },
  "services.familyDesc": {
    en: "Holistic family support including vocational training, entrepreneurship coaching, and resources that uplift entire households.",
    fr: "Soutien familial holistique incluant la formation professionnelle, le coaching entrepreneurial et les ressources qui élèvent des ménages entiers.",
  },

  // Featured Story
  "story.label": { en: "Featured Story", fr: "Témoignage" },
  "story.title": { en: "A Book Changed Her World", fr: "Un livre a changé son monde" },
  "story.p1": {
    en: "When Amara received her first book through our education program, she didn't just learn to read — she discovered a universe of possibilities. Today, she mentors other children in her village, passing on the gift of knowledge.",
    fr: "Quand Amara a reçu son premier livre grâce à notre programme éducatif, elle n'a pas seulement appris à lire — elle a découvert un univers de possibilités. Aujourd'hui, elle encadre d'autres enfants dans son village, transmettant le don du savoir.",
  },
  "story.p2": {
    en: "Stories like Amara's remind us why we do this work. Every child we reach, every family we support, every community we empower — it all starts with a single act of hope.",
    fr: "Des histoires comme celle d'Amara nous rappellent pourquoi nous faisons ce travail. Chaque enfant que nous touchons, chaque famille que nous soutenons, chaque communauté que nous autonomisons — tout commence par un seul acte d'espoir.",
  },
  "story.name": { en: "Amara's Story", fr: "L'histoire d'Amara" },
  "story.role": { en: "Education Program Participant", fr: "Participante au programme éducatif" },

  // Why Support
  "why.label": { en: "Why Support Us", fr: "Pourquoi nous soutenir" },
  "why.title": { en: "Why Aspire & Thrive?", fr: "Pourquoi Aspire & Thrive ?" },
  "why.subtitle": {
    en: "Your support fuels programs that create real, lasting change in the lives of youth and communities.",
    fr: "Votre soutien alimente des programmes qui créent un changement réel et durable dans la vie des jeunes et des communautés.",
  },
  "why.communityDriven": { en: "Community Driven", fr: "Axé sur la communauté" },
  "why.communityDrivenDesc": {
    en: "Our programs are designed with and for the communities we serve, ensuring relevance and lasting impact.",
    fr: "Nos programmes sont conçus avec et pour les communautés que nous servons, garantissant pertinence et impact durable.",
  },
  "why.youthFocused": { en: "Youth Focused", fr: "Axé sur la jeunesse" },
  "why.youthFocusedDesc": {
    en: "We invest directly in young people — their education, skills, and potential to lead change.",
    fr: "Nous investissons directement dans les jeunes — leur éducation, leurs compétences et leur potentiel à mener le changement.",
  },
  "why.sustainableImpact": { en: "Sustainable Impact", fr: "Impact durable" },
  "why.sustainableImpactDesc": {
    en: "We focus on long-term development, not short-term fixes, building self-sufficiency across communities.",
    fr: "Nous nous concentrons sur le développement à long terme, pas les solutions à court terme, en construisant l'autosuffisance dans les communautés.",
  },
  "why.partnershipBased": { en: "Partnership Based", fr: "Basé sur le partenariat" },
  "why.partnershipBasedDesc": {
    en: "We collaborate with local leaders, organizations, and global supporters to multiply our impact.",
    fr: "Nous collaborons avec les leaders locaux, les organisations et les supporters mondiaux pour multiplier notre impact.",
  },

  // Gallery
  "gallery.label": { en: "Gallery", fr: "Galerie" },
  "gallery.title": { en: "Our Work in Action", fr: "Notre travail en action" },
  "gallery.subtitle": {
    en: "Moments captured from our programs, communities, and the young people we serve.",
    fr: "Des moments capturés de nos programmes, communautés et des jeunes que nous servons.",
  },

  // Testimonials
  "testimonials.label": { en: "Testimonials", fr: "Témoignages" },
  "testimonials.title": { en: "Voices From Our Community", fr: "Voix de notre communauté" },

  // Get Involved
  "involved.label": { en: "Partner With Us", fr: "Devenir partenaire" },
  "involved.title": { en: "Join Our Mission", fr: "Rejoignez notre mission" },
  "involved.subtitle": {
    en: "There are many ways you can make a difference. Choose how you'd like to contribute.",
    fr: "Il existe de nombreuses façons de faire la différence. Choisissez comment vous souhaitez contribuer.",
  },
  "involved.donateTitle": { en: "Donate", fr: "Faire un don" },
  "involved.donateDesc": {
    en: "Every contribution helps educate, mentor, and uplift a generation. Your generosity changes lives.",
    fr: "Chaque contribution aide à éduquer, encadrer et élever une génération. Votre générosité change des vies.",
  },
  "involved.makeGift": { en: "Make a Gift", fr: "Faire un don" },
  "involved.volunteerTitle": { en: "Volunteer", fr: "Bénévolat" },
  "involved.volunteerDesc": {
    en: "Share your time and skills. Whether locally or remotely, your involvement makes an impact.",
    fr: "Partagez votre temps et vos compétences. Que ce soit localement ou à distance, votre implication fait une différence.",
  },
  "involved.joinUs": { en: "Join Us", fr: "Rejoignez-nous" },
  "involved.applyTitle": { en: "Apply to a Program", fr: "Postuler à un programme" },
  "involved.applyDesc": {
    en: "Ready to grow? Apply for one of our programs and unlock your potential.",
    fr: "Prêt à grandir ? Postulez à l'un de nos programmes et libérez votre potentiel.",
  },
  "involved.applyNow": { en: "Apply Now", fr: "Postuler maintenant" },

  // Donate
  "donate.title": { en: "Help Communities Aspire and Thrive", fr: "Aidez les communautés à aspirer et prospérer" },
  "donate.subtitle": {
    en: "Your support helps expand education, mentorship, and community development programs for those who need them most. Every contribution makes a difference.",
    fr: "Votre soutien aide à développer les programmes d'éducation, de mentorat et de développement communautaire pour ceux qui en ont le plus besoin. Chaque contribution fait la différence.",
  },
  "donate.donateNow": { en: "Donate Now", fr: "Faire un don maintenant" },
  "donate.partnerWithUs": { en: "Partner With Us", fr: "Devenir partenaire" },

  // Contact
  "contact.label": { en: "Get In Touch", fr: "Contactez-nous" },
  "contact.title": { en: "Connect With Us", fr: "Communiquez avec nous" },
  "contact.subtitle": {
    en: "Whether you want to volunteer, donate, partner, or learn more — we'd love to hear from you.",
    fr: "Que vous souhaitiez être bénévole, donner, devenir partenaire ou en savoir plus — nous serions ravis de vous entendre.",
  },
  "contact.sendMessage": { en: "Send a Message", fr: "Envoyer un message" },
  "contact.fullName": { en: "Full Name", fr: "Nom complet" },
  "contact.yourName": { en: "Your name", fr: "Votre nom" },
  "contact.emailAddress": { en: "Email Address", fr: "Adresse e-mail" },
  "contact.yourMessage": { en: "Your Message", fr: "Votre message" },
  "contact.messagePlaceholder": {
    en: "How can we help? How would you like to get involved?",
    fr: "Comment pouvons-nous vous aider ? Comment souhaitez-vous vous impliquer ?",
  },
  "contact.send": { en: "Send Message", fr: "Envoyer le message" },
  "contact.sending": { en: "Sending...", fr: "Envoi en cours..." },
  "contact.thankYou": { en: "Thank you for reaching out!", fr: "Merci de nous avoir contactés !" },
  "contact.teamReply": { en: "Our team will get back to you shortly.", fr: "Notre équipe vous répondra sous peu." },
  "contact.info": { en: "Contact Information", fr: "Informations de contact" },
  "contact.infoDesc": {
    en: "We're here to answer questions about our programs, partnerships, and how you can support our mission.",
    fr: "Nous sommes là pour répondre à vos questions sur nos programmes, partenariats et comment vous pouvez soutenir notre mission.",
  },
  "contact.email": { en: "Email", fr: "E-mail" },
  "contact.phone": { en: "Phone", fr: "Téléphone" },
  "contact.location": { en: "Location", fr: "Emplacement" },
  "contact.locationValue": { en: "Serving communities across Burundi", fr: "Au service des communautés à travers le Burundi" },

  // Footer
  "footer.mission": {
    en: "Empowering Burundi's youth through education, mentorship, and community-driven development programs.",
    fr: "Autonomiser la jeunesse du Burundi à travers l'éducation, le mentorat et les programmes de développement communautaire.",
  },
  "footer.quickLinks": { en: "Quick Links", fr: "Liens rapides" },
  "footer.programs": { en: "Programs", fr: "Programmes" },
  "footer.contact": { en: "Contact", fr: "Contact" },
  "footer.rights": { en: "All rights reserved.", fr: "Tous droits réservés." },
  "footer.builtBy": { en: "Site built by", fr: "Site créé par" },

  // Program pages
  "programPage.cta.donate": { en: "Donate to This Program", fr: "Faire un don à ce programme" },
  "programPage.cta.contact": { en: "Contact Us", fr: "Contactez-nous" },
  "programPage.cta.partner": { en: "Partner With Us", fr: "Devenir partenaire" },
  "programPage.goals": { en: "Goals & Outcomes", fr: "Objectifs et résultats" },
  "programPage.aboutProgram": { en: "About This Program", fr: "À propos de ce programme" },

  // Education page
  "edu.title": { en: "Education", fr: "Éducation" },
  "edu.heroSubtitle": {
    en: "Empowering youth through quality education, scholarships, and learning resources that open doors to brighter futures.",
    fr: "Autonomiser les jeunes grâce à une éducation de qualité, des bourses et des ressources d'apprentissage qui ouvrent les portes d'un avenir meilleur.",
  },
  "edu.intro": {
    en: "Education is the foundation of lasting change. Our education programs provide scholarships, school supplies, tutoring, and mentorship to children and young people across Burundi who would otherwise lack access to quality learning.",
    fr: "L'éducation est le fondement d'un changement durable. Nos programmes éducatifs fournissent des bourses, des fournitures scolaires, du tutorat et du mentorat aux enfants et aux jeunes à travers le Burundi qui autrement n'auraient pas accès à un apprentissage de qualité.",
  },
  "edu.about": {
    en: "We partner with local schools and educators to create supportive learning environments. From primary school enrollment to secondary and higher education support, our programs address the full spectrum of educational needs. We believe every child deserves the chance to learn, grow, and dream.",
    fr: "Nous collaborons avec les écoles et éducateurs locaux pour créer des environnements d'apprentissage favorables. De l'inscription à l'école primaire au soutien de l'enseignement secondaire et supérieur, nos programmes répondent à l'ensemble des besoins éducatifs. Nous croyons que chaque enfant mérite la chance d'apprendre, de grandir et de rêver.",
  },
  "edu.goal1": { en: "Increase school enrollment and retention rates", fr: "Augmenter les taux d'inscription et de rétention scolaire" },
  "edu.goal2": { en: "Provide scholarships to underprivileged students", fr: "Fournir des bourses aux étudiants défavorisés" },
  "edu.goal3": { en: "Supply schools with learning materials and resources", fr: "Fournir aux écoles du matériel et des ressources pédagogiques" },
  "edu.goal4": { en: "Train and support local educators", fr: "Former et soutenir les éducateurs locaux" },
  "edu.goal5": { en: "Build literacy and numeracy skills in underserved areas", fr: "Développer les compétences en lecture et en calcul dans les zones mal desservies" },

  // Agriculture page
  "agri.title": { en: "Agriculture", fr: "Agriculture" },
  "agri.heroSubtitle": {
    en: "Building food security and economic resilience through sustainable farming practices and agricultural training.",
    fr: "Construire la sécurité alimentaire et la résilience économique grâce à des pratiques agricoles durables et à la formation agricole.",
  },
  "agri.intro": {
    en: "Agriculture is the backbone of Burundi's economy. Our agriculture programs equip communities with modern farming techniques, sustainable practices, and the knowledge to build food security for their families and beyond.",
    fr: "L'agriculture est l'épine dorsale de l'économie du Burundi. Nos programmes agricoles équipent les communautés avec des techniques agricoles modernes, des pratiques durables et les connaissances nécessaires pour construire la sécurité alimentaire pour leurs familles et au-delà.",
  },
  "agri.about": {
    en: "We provide hands-on training in crop diversification, soil management, irrigation techniques, and livestock care. Our community farms serve as learning hubs where families can gain practical skills while growing nutritious food. We also connect farmers to local markets to strengthen their economic independence.",
    fr: "Nous offrons une formation pratique en diversification des cultures, gestion des sols, techniques d'irrigation et soins du bétail. Nos fermes communautaires servent de centres d'apprentissage où les familles peuvent acquérir des compétences pratiques tout en cultivant des aliments nutritifs. Nous connectons également les agriculteurs aux marchés locaux pour renforcer leur indépendance économique.",
  },
  "agri.goal1": { en: "Train families in sustainable farming methods", fr: "Former les familles aux méthodes d'agriculture durable" },
  "agri.goal2": { en: "Improve food security in rural communities", fr: "Améliorer la sécurité alimentaire dans les communautés rurales" },
  "agri.goal3": { en: "Establish community demonstration farms", fr: "Établir des fermes de démonstration communautaires" },
  "agri.goal4": { en: "Connect farmers to local and regional markets", fr: "Connecter les agriculteurs aux marchés locaux et régionaux" },
  "agri.goal5": { en: "Promote environmental stewardship and soil health", fr: "Promouvoir la gestion environnementale et la santé des sols" },

  // Entrepreneurship page
  "entre.title": { en: "Entrepreneurship", fr: "Entrepreneuriat" },
  "entre.heroSubtitle": {
    en: "Igniting innovation and economic empowerment by equipping young people with business skills and startup support.",
    fr: "Stimuler l'innovation et l'autonomisation économique en dotant les jeunes de compétences commerciales et d'un soutien au démarrage.",
  },
  "entre.intro": {
    en: "Entrepreneurship is a powerful engine for community transformation. Our programs teach business fundamentals, financial literacy, and innovation skills to young people who aspire to build sustainable livelihoods.",
    fr: "L'entrepreneuriat est un puissant moteur de transformation communautaire. Nos programmes enseignent les fondamentaux des affaires, la littératie financière et les compétences en innovation aux jeunes qui aspirent à construire des moyens de subsistance durables.",
  },
  "entre.about": {
    en: "From ideation workshops to micro-grant funding, we walk alongside aspiring entrepreneurs as they develop business plans, launch small enterprises, and contribute to local economies. Our mentorship network connects participants with experienced professionals who provide guidance and accountability.",
    fr: "Des ateliers d'idéation au financement par micro-subventions, nous accompagnons les entrepreneurs en herbe dans le développement de plans d'affaires, le lancement de petites entreprises et la contribution aux économies locales. Notre réseau de mentorat connecte les participants avec des professionnels expérimentés qui fournissent des conseils et un suivi.",
  },
  "entre.goal1": { en: "Deliver business skills training to youth", fr: "Offrir une formation en compétences commerciales aux jeunes" },
  "entre.goal2": { en: "Provide micro-grants and seed funding", fr: "Fournir des micro-subventions et du financement d'amorçage" },
  "entre.goal3": { en: "Connect entrepreneurs with mentors and advisors", fr: "Connecter les entrepreneurs avec des mentors et conseillers" },
  "entre.goal4": { en: "Foster innovation and problem-solving mindsets", fr: "Favoriser l'innovation et les mentalités de résolution de problèmes" },
  "entre.goal5": { en: "Strengthen local economies through new enterprises", fr: "Renforcer les économies locales grâce aux nouvelles entreprises" },

  // Vocational Training page
  "voc.title": { en: "Vocational Training", fr: "Formation Professionnelle" },
  "voc.heroSubtitle": {
    en: "Developing practical skills and trades that create pathways to dignified employment and self-reliance.",
    fr: "Développer des compétences pratiques et des métiers qui créent des voies vers un emploi digne et l'autonomie.",
  },
  "voc.intro": {
    en: "For many young people in Burundi, traditional academic paths aren't accessible. Our vocational training programs offer hands-on, practical skills development in trades that are in demand locally — creating real opportunities for employment and self-sufficiency.",
    fr: "Pour de nombreux jeunes au Burundi, les parcours académiques traditionnels ne sont pas accessibles. Nos programmes de formation professionnelle offrent un développement de compétences pratiques dans des métiers demandés localement — créant de réelles opportunités d'emploi et d'autosuffisance.",
  },
  "voc.about": {
    en: "Our programs cover a range of trades including tailoring, carpentry, mechanics, technology, and more. Participants receive hands-on instruction, mentorship, and the tools they need to launch their careers. Many graduates go on to start their own workshops and small businesses.",
    fr: "Nos programmes couvrent une gamme de métiers incluant la couture, la menuiserie, la mécanique, la technologie et plus encore. Les participants reçoivent une instruction pratique, du mentorat et les outils dont ils ont besoin pour lancer leur carrière. Beaucoup de diplômés créent leurs propres ateliers et petites entreprises.",
  },
  "voc.goal1": { en: "Train youth in marketable trade skills", fr: "Former les jeunes aux compétences professionnelles commercialisables" },
  "voc.goal2": { en: "Provide tools and equipment for graduates", fr: "Fournir des outils et de l'équipement aux diplômés" },
  "voc.goal3": { en: "Facilitate apprenticeship and job placement", fr: "Faciliter l'apprentissage et le placement professionnel" },
  "voc.goal4": { en: "Support graduates in launching small businesses", fr: "Soutenir les diplômés dans le lancement de petites entreprises" },
  "voc.goal5": { en: "Reduce youth unemployment through skills development", fr: "Réduire le chômage des jeunes grâce au développement des compétences" },

  // Leadership page
  "lead.title": { en: "Leadership and Community Impact", fr: "Leadership et Impact Communautaire" },
  "lead.heroSubtitle": {
    en: "Cultivating the next generation of community leaders who drive positive change from within.",
    fr: "Cultiver la prochaine génération de leaders communautaires qui impulsent le changement positif de l'intérieur.",
  },
  "lead.intro": {
    en: "Strong communities are built by strong leaders. Our leadership programs identify and nurture young people with the vision, passion, and determination to lead positive change in their communities.",
    fr: "Les communautés fortes sont construites par des leaders forts. Nos programmes de leadership identifient et nourrissent les jeunes avec la vision, la passion et la détermination de mener un changement positif dans leurs communautés.",
  },
  "lead.about": {
    en: "Through workshops, civic engagement projects, mentorship circles, and community service initiatives, we empower participants to become changemakers. Our leadership graduates lead peer education sessions, organize community clean-ups, advocate for local issues, and inspire the next wave of leaders.",
    fr: "À travers des ateliers, des projets d'engagement civique, des cercles de mentorat et des initiatives de service communautaire, nous habilitons les participants à devenir des acteurs du changement. Nos diplômés en leadership dirigent des sessions d'éducation par les pairs, organisent des nettoyages communautaires, défendent les enjeux locaux et inspirent la prochaine vague de leaders.",
  },
  "lead.goal1": { en: "Develop youth leadership skills and confidence", fr: "Développer les compétences en leadership et la confiance des jeunes" },
  "lead.goal2": { en: "Facilitate civic engagement and community service", fr: "Faciliter l'engagement civique et le service communautaire" },
  "lead.goal3": { en: "Create mentorship networks for emerging leaders", fr: "Créer des réseaux de mentorat pour les leaders émergents" },
  "lead.goal4": { en: "Drive measurable community improvement projects", fr: "Mener des projets d'amélioration communautaire mesurables" },
  "lead.goal5": { en: "Build a pipeline of future community advocates", fr: "Construire un vivier de futurs défenseurs communautaires" },

  // About page (full)
  "aboutPage.title": { en: "About Us", fr: "À Propos" },
  "aboutPage.heroSubtitle": {
    en: "Learn about our mission, values, and the people behind Aspire and Thrive Initiative.",
    fr: "Découvrez notre mission, nos valeurs et les personnes derrière Aspire and Thrive Initiative.",
  },
  "aboutPage.storyLabel": { en: "Our Story", fr: "Notre histoire" },
  "aboutPage.storyTitle": { en: "How It All Began", fr: "Comment tout a commencé" },
  "aboutPage.storyP1": {
    en: "Aspire and Thrive Initiative was born from a deep conviction that the youth of Burundi hold the key to the nation's future. Founded by Bertrand Mizero, the organization began as a grassroots effort to connect young people with the resources, mentorship, and opportunities they need to build meaningful lives.",
    fr: "Aspire and Thrive Initiative est née d'une conviction profonde que la jeunesse du Burundi détient la clé de l'avenir de la nation. Fondée par Bertrand Mizero, l'organisation a débuté comme un effort de base pour connecter les jeunes aux ressources, au mentorat et aux opportunités dont ils ont besoin pour construire des vies significatives.",
  },
  "aboutPage.storyP2": {
    en: "What started as informal mentorship sessions has grown into a multi-program organization serving communities across the country — from education and agriculture to entrepreneurship and vocational training. Every step has been guided by the communities we serve.",
    fr: "Ce qui a commencé comme des sessions de mentorat informelles est devenu une organisation multi-programmes servant des communautés à travers le pays — de l'éducation et l'agriculture à l'entrepreneuriat et la formation professionnelle. Chaque étape a été guidée par les communautés que nous servons.",
  },
  "aboutPage.founderLabel": { en: "Meet The Founder", fr: "Rencontrez le fondateur" },
  "aboutPage.founderRole": { en: "Founder & Executive Director", fr: "Fondateur & Directeur Exécutif" },
  "aboutPage.founderTag": { en: "Founder", fr: "Fondateur" },
  "aboutPage.founderP1": {
    en: "Bertrand Mizero is the visionary behind Aspire and Thrive Initiative. Driven by his own experience growing up in Burundi and witnessing the challenges young people face, he dedicated himself to creating pathways for education, empowerment, and sustainable development.",
    fr: "Bertrand Mizero est le visionnaire derrière Aspire and Thrive Initiative. Motivé par sa propre expérience grandissant au Burundi et témoin des défis auxquels les jeunes font face, il s'est consacré à créer des voies pour l'éducation, l'autonomisation et le développement durable.",
  },
  "aboutPage.founderP2": {
    en: "Under his leadership, the organization has expanded its reach across multiple communities, launching programs in education, agriculture, entrepreneurship, vocational training, and leadership development. Bertrand believes that investing in youth is the most powerful way to transform communities from within.",
    fr: "Sous sa direction, l'organisation a étendu sa portée à travers de multiples communautés, lançant des programmes en éducation, agriculture, entrepreneuriat, formation professionnelle et développement du leadership. Bertrand croit qu'investir dans la jeunesse est le moyen le plus puissant de transformer les communautés de l'intérieur.",
  },
  "aboutPage.missionLabel": { en: "Our Mission", fr: "Notre mission" },
  "aboutPage.missionTitle": { en: "Why We Exist", fr: "Pourquoi nous existons" },
  "aboutPage.missionP1": {
    en: "Aspire and Thrive Initiative was founded on the belief that every young person, regardless of their circumstances, deserves the opportunity to learn, grow, and thrive. We work across Burundi to provide education, mentorship, and community development programs that create lasting change.",
    fr: "Aspire and Thrive Initiative a été fondée sur la conviction que chaque jeune, quelles que soient ses circonstances, mérite l'opportunité d'apprendre, de grandir et de prospérer. Nous travaillons à travers le Burundi pour fournir des programmes d'éducation, de mentorat et de développement communautaire qui créent un changement durable.",
  },
  "aboutPage.missionP2": {
    en: "Our approach is rooted in partnership — working alongside communities, not above them. We listen, we learn, and we build programs that address real needs with sustainable solutions.",
    fr: "Notre approche est ancrée dans le partenariat — travailler aux côtés des communautés, pas au-dessus d'elles. Nous écoutons, nous apprenons et nous construisons des programmes qui répondent à de vrais besoins avec des solutions durables.",
  },
  "aboutPage.valuesLabel": { en: "Our Values", fr: "Nos valeurs" },
  "aboutPage.valuesTitle": { en: "What Guides Us", fr: "Ce qui nous guide" },
  "aboutPage.value1Title": { en: "Community First", fr: "La communauté d'abord" },
  "aboutPage.value1Desc": { en: "Every program starts with listening to the community it serves.", fr: "Chaque programme commence par l'écoute de la communauté qu'il sert." },
  "aboutPage.value2Title": { en: "Empowerment", fr: "Autonomisation" },
  "aboutPage.value2Desc": { en: "We equip people with tools and skills, not dependency.", fr: "Nous équipons les gens d'outils et de compétences, pas de dépendance." },
  "aboutPage.value3Title": { en: "Integrity", fr: "Intégrité" },
  "aboutPage.value3Desc": { en: "Transparency, honesty, and accountability in everything we do.", fr: "Transparence, honnêteté et responsabilité dans tout ce que nous faisons." },
  "aboutPage.value4Title": { en: "Hope", fr: "Espoir" },
  "aboutPage.value4Desc": { en: "We believe in the potential of every individual to create change.", fr: "Nous croyons au potentiel de chaque individu à créer le changement." },

  // Impact page
  "impactPage.title": { en: "Our Impact", fr: "Notre impact" },
  "impactPage.heroSubtitle": {
    en: "Measurable change, real lives transformed. See the difference your support makes.",
    fr: "Un changement mesurable, des vies réellement transformées. Voyez la différence que fait votre soutien.",
  },

  // Get Involved page
  "involvedPage.title": { en: "Partner With Us", fr: "Devenir partenaire" },
  "involvedPage.heroSubtitle": {
    en: "There are many ways to make a difference. Find out how you can join our mission.",
    fr: "Il existe de nombreuses façons de faire la différence. Découvrez comment vous pouvez rejoindre notre mission.",
  },

  // Contact page
  "contactPage.title": { en: "Contact", fr: "Contact" },
  "contactPage.heroSubtitle": {
    en: "We'd love to hear from you. Reach out to learn more, partner, or get involved.",
    fr: "Nous serions ravis de vous entendre. Contactez-nous pour en savoir plus, devenir partenaire ou vous impliquer.",
  },

  // Apply page
  "apply.pageTitle": { en: "Apply to a Program", fr: "Postuler à un programme" },
  "apply.pageSubtitle": {
    en: "Take the first step toward a brighter future. Tell us about yourself and what motivates you.",
    fr: "Faites le premier pas vers un avenir meilleur. Parlez-nous de vous et de ce qui vous motive.",
  },
  "apply.formTitle": { en: "Application Form", fr: "Formulaire de candidature" },
  "apply.formSubtitle": { en: "All fields marked * are required", fr: "Tous les champs marqués * sont obligatoires" },
  "apply.fullName": { en: "Full Name", fr: "Nom complet" },
  "apply.fullNamePlaceholder": { en: "Your full name", fr: "Votre nom complet" },
  "apply.email": { en: "Email Address", fr: "Adresse e-mail" },
  "apply.phone": { en: "Phone", fr: "Téléphone" },
  "apply.age": { en: "Age", fr: "Âge" },
  "apply.location": { en: "Location", fr: "Localisation" },
  "apply.locationPlaceholder": { en: "City or province", fr: "Ville ou province" },
  "apply.program": { en: "Program", fr: "Programme" },
  "apply.programPlaceholder": { en: "Select a program", fr: "Sélectionner un programme" },
  "apply.motivation": { en: "Motivation", fr: "Motivation" },
  "apply.motivationPlaceholder": {
    en: "Tell us why you want to join this program and what you hope to achieve...",
    fr: "Dites-nous pourquoi vous souhaitez rejoindre ce programme et ce que vous espérez accomplir...",
  },
  "apply.submit": { en: "Submit Application", fr: "Soumettre la candidature" },
  "apply.submitting": { en: "Submitting...", fr: "Envoi en cours..." },
  "apply.successTitle": { en: "Application Submitted!", fr: "Candidature soumise !" },
  "apply.successDesc": {
    en: "Thank you for applying! Our team will review your application and get back to you soon.",
    fr: "Merci pour votre candidature ! Notre équipe examinera votre dossier et vous contactera bientôt.",
  },
  "apply.errorTitle": { en: "Submission Failed", fr: "Échec de l'envoi" },
  "apply.errorDesc": { en: "Something went wrong. Please try again.", fr: "Quelque chose s'est mal passé. Veuillez réessayer." },
  "apply.submitAnother": { en: "Submit Another Application", fr: "Soumettre une autre candidature" },

  // Volunteer page
  "volunteer.pageTitle": { en: "Volunteer With Us", fr: "Devenez bénévole" },
  "volunteer.pageSubtitle": {
    en: "Share your time, skills, and passion to make a real difference in the lives of youth and communities.",
    fr: "Partagez votre temps, vos compétences et votre passion pour faire une vraie différence dans la vie des jeunes et des communautés.",
  },
  "volunteer.formTitle": { en: "Volunteer Application", fr: "Candidature bénévole" },
  "volunteer.formSubtitle": { en: "All fields marked * are required", fr: "Tous les champs marqués * sont obligatoires" },
  "volunteer.fullName": { en: "Full Name", fr: "Nom complet" },
  "volunteer.fullNamePlaceholder": { en: "Your full name", fr: "Votre nom complet" },
  "volunteer.email": { en: "Email Address", fr: "Adresse e-mail" },
  "volunteer.phone": { en: "Phone", fr: "Téléphone" },
  "volunteer.location": { en: "Location", fr: "Localisation" },
  "volunteer.locationPlaceholder": { en: "City, country", fr: "Ville, pays" },
  "volunteer.skills": { en: "Skills & Experience", fr: "Compétences & Expérience" },
  "volunteer.skillsPlaceholder": { en: "e.g. Teaching, marketing, farming, IT...", fr: "ex. Enseignement, marketing, agriculture, informatique..." },
  "volunteer.availability": { en: "Availability", fr: "Disponibilité" },
  "volunteer.availabilityPlaceholder": { en: "Select your availability", fr: "Sélectionnez votre disponibilité" },
  "volunteer.fullTime": { en: "Full-time", fr: "Temps plein" },
  "volunteer.partTime": { en: "Part-time", fr: "Temps partiel" },
  "volunteer.weekends": { en: "Weekends only", fr: "Week-ends uniquement" },
  "volunteer.remote": { en: "Remote / Online", fr: "À distance / En ligne" },
  "volunteer.reason": { en: "Why do you want to volunteer?", fr: "Pourquoi souhaitez-vous être bénévole ?" },
  "volunteer.reasonPlaceholder": {
    en: "Tell us what motivates you to volunteer and how you'd like to contribute...",
    fr: "Dites-nous ce qui vous motive à être bénévole et comment vous aimeriez contribuer...",
  },
  "volunteer.submit": { en: "Submit Application", fr: "Soumettre la candidature" },
  "volunteer.submitting": { en: "Submitting...", fr: "Envoi en cours..." },
  "volunteer.successTitle": { en: "Thank You for Volunteering!", fr: "Merci pour votre candidature bénévole !" },
  "volunteer.successDesc": {
    en: "We appreciate your willingness to help! Our team will reach out to you soon with next steps.",
    fr: "Nous apprécions votre volonté d'aider ! Notre équipe vous contactera bientôt avec les prochaines étapes.",
  },
  "volunteer.errorTitle": { en: "Submission Failed", fr: "Échec de l'envoi" },
  "volunteer.errorDesc": { en: "Something went wrong. Please try again.", fr: "Quelque chose s'est mal passé. Veuillez réessayer." },
  "volunteer.submitAnother": { en: "Submit Another Application", fr: "Soumettre une autre candidature" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("ati-language");
    return (saved === "fr" ? "fr" : "en") as Language;
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("ati-language", lang);
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
