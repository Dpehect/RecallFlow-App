import json
import random
import os

CATEGORIES = ['cafe-travel', 'daily-life', 'work-business', 'city-emergency', 'tech-science', 'art-culture']
LEVELS = ['A1', 'A2', 'B1', 'B2']

SUBJECTS = [
    {"tr": "Mimar Ahmet", "de": "Architekt Ahmet", "en": "Architect Ahmet", "es": "El arquitecto Ahmet", "fr": "L'architecte Ahmet", "pt": "O arquiteto Ahmet"},
    {"tr": "Uluslararası gezginler", "de": "Die internationalen Reisenden", "en": "The international travelers", "es": "Los viajeros internacionales", "fr": "Les voyageurs internationaux", "pt": "Os viajantes internacionais"},
    {"tr": "Yazılım ekibimiz", "de": "Unser Softwareteam", "en": "Our software team", "es": "Nuestro equipo de software", "fr": "Notre équipe logiciel", "pt": "Nossa equipe de software"},
    {"tr": "Otel resepsiyonistleri", "de": "Die Hotelrezeptionisten", "en": "The hotel receptionists", "es": "Los recepcionistas del hotel", "fr": "Les réceptionnistes de l'hôtel", "pt": "Os recepcionistas do hotel"},
    {"tr": "Şehir rehberleri", "de": "Die Stadtführer", "en": "The city guides", "es": "Los guías de la ciudad", "fr": "Les guides de la ville", "pt": "Os guias da cidade"},
    {"tr": "Kıdemli doktorlar", "de": "Die erfahrenen Ärzte", "en": "The senior doctors", "es": "Los médicos experimentados", "fr": "Les médecins séniors", "pt": "Os médicos experientes"},
    {"tr": "Genç araştırmacılar", "de": "Die jungen Forscher", "en": "The young researchers", "es": "Los jóvenes investigadores", "fr": "Les jeunes chercheurs", "pt": "Os jovens pesquisadores"},
    {"tr": "Finans uzmanları", "de": "Die Finanzexperten", "en": "The financial experts", "es": "Los expertos financieros", "fr": "Les experts financiers", "pt": "Os especialistas financeiros"},
    {"tr": "Üniversite öğrencileri", "de": "Die Universitätsstudenten", "en": "The university students", "es": "Los estudiantes universitarios", "fr": "Les étudiants universitaires", "pt": "Os estudantes universitários"},
    {"tr": "Sanat direktörleri", "de": "Die Kunstdirektoren", "en": "The art directors", "es": "Los directores de arte", "fr": "Les directeurs artistiques", "pt": "Os diretores de arte"}
]

TIME_LOCATIONS = [
    {"tr": "sabah saatlerinde", "de": "am Morgen", "en": "in the morning", "es": "por la mañana", "fr": "le matin", "pt": "pela manhã"},
    {"tr": "tarihi meydandaki kafede", "de": "im Café am historischen Platz", "en": "at the café in the historic square", "es": "en el café de la plaza histórica", "fr": "au café de la place historique", "pt": "no café da praça histórica"},
    {"tr": "haftalık strateji toplantısında", "de": "im wöchentlichen Strategietreffen", "en": "in the weekly strategy meeting", "es": "en la reunión semanal de estrategia", "fr": "lors de la réunion stratégique hebdomadaire", "pt": "na reunião semanal de estratégia"},
    {"tr": "teknoloji konferansı sırasında", "de": "während der Technologiekonferenz", "en": "during the technology conference", "es": "durante la conferencia de tecnología", "fr": "pendant la conférence technologique", "pt": "durante a conferência de tecnologia"},
    {"tr": "uçak yolculuğu öncesinde", "de": "vor dem Flug", "en": "before the flight", "es": "antes del vuelo", "fr": "avant le vol", "pt": "antes do voo"},
    {"tr": "şehir kütüphanesinde", "de": "in der Stadtbibliothek", "en": "in the city library", "es": "en la biblioteca municipal", "fr": "dans la bibliothèque municipale", "pt": "na biblioteca municipal"},
    {"tr": "laboratuvardaki araştırmalarda", "de": "bei den Forschungen im Labor", "en": "during laboratory research", "es": "en las investigaciones de laboratorio", "fr": "lors des recherches en laboratoire", "pt": "nas pesquisas de laboratório"},
    {"tr": "acil durum anında", "de": "im Notfall", "en": "in an emergency", "es": "en una emergencia", "fr": "en cas d'urgence", "pt": "em uma emergência"}
]

OBJECT_ACTIONS = [
    {"tr": "taze filtre kahve içmeyi", "de": "frisch gemahlenen Filterkaffee zu trinken", "en": "to drink freshly ground filter coffee", "es": "beber café de filtro recién molido", "fr": "de boire du café filtre fraîchement moulu", "pt": "beber café de filtro moído na hora"},
    {"tr": "satış raporlarını incelemeyi", "de": "die Verkaufsberichte zu überprüfen", "en": "to review sales reports", "es": "revisar los informes de ventas", "fr": "d'examiner les rapports de ventes", "pt": "revisar os relatórios de vendas"},
    {"tr": "kültürel rotaları keşfetmeyi", "de": "kulturelle Routen zu entdecken", "en": "to discover cultural routes", "es": "descubrir rutas culturales", "fr": "de découvrir des itinéraires culturels", "pt": "descobrir rotas culturais"},
    {"tr": "yeni yazılım kodlarını güncellemeyi", "de": "den neuen Softwarecode zu aktualisieren", "en": "to update the new software code", "es": "actualizar el nuevo código de software", "fr": "de mettre à jour le nouveau code logiciel", "pt": "atualizar o novo código de software"},
    {"tr": "acil hastaları tedavi etmeyi", "de": "Notfallpatienten zu behandeln", "en": "to treat emergency patients", "es": "atender a pacientes de emergencia", "fr": "de traiter les patients d'urgence", "pt": "atender pacientes de emergência"},
    {"tr": "yabancı dil pratiği yapmayı", "de": "Fremdsprachen zu üben", "en": "to practice foreign languages", "es": "practicar idiomas extranjeros", "fr": "de pratiquer des langues étrangères", "pt": "praticar línguas estrangeiras"}
]

ENDINGS = [
    {"tr": "tercih ediyor.", "de": "bevorzugt.", "en": "prefers.", "es": "prefiere.", "fr": "préfère.", "pt": "prefere."},
    {"tr": "kararlaştırdı.", "de": "hat beschlossen.", "en": "decided.", "es": "decidió.", "fr": "a décidé.", "pt": "decidiu."},
    {"tr": "hedefliyor.", "de": "zielt darauf ab.", "en": "aims to.", "es": "tiene como objetivo.", "fr": "vise à.", "pt": "visa a."},
    {"tr": "başardı.", "de": "hat geschafft.", "en": "succeeded.", "es": "logró.", "fr": "a réussi.", "pt": "conseguiu."}
]

def generate_10k_sentences():
    used_tr_sentences = set()
    total_generated = 0

    print("Generating 10,000+ unique sentences for every category and level...")

    for lvl in LEVELS:
        for cat in CATEGORIES:
            count = 0
            while count < 1000:
                subj = random.choice(SUBJECTS)
                loc = random.choice(TIME_LOCATIONS)
                act = random.choice(OBJECT_ACTIONS)
                end = random.choice(ENDINGS)

                tr_sentence = f"{loc['tr'].capitalize()}, {subj['tr'].lower()} {act['tr']} {end['tr']}"

                if tr_sentence not in used_tr_sentences:
                    used_tr_sentences.add(tr_sentence)
                    count += 1
                    total_generated += 1

    print(f"Total unique sentences generated: {total_generated}")

generate_10k_sentences()
