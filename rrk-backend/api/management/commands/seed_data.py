from django.core.management.base import BaseCommand
from api.models import CompanyInfo, Service, Testimonial, FAQ

SERVICES = [
    # (title, category, icon, short_desc, full_desc, order, featured)
    (
        "Earth Cutting Works", "earth_works", "GiMiningHelmet",
        "Professional excavation and earth cutting for residential, commercial, industrial, and infrastructure projects.",
        "RRK Earth Movers delivers precision earth cutting services using modern excavators operated by experienced professionals. We handle all soil types including hard clay, laterite, and mixed strata — ensuring clean cuts, proper slope management, and safe disposal of excavated material.",
        0, True
    ),
    (
        "Earth Filling Works", "earth_works", "FaLayerGroup",
        "High-quality earth filling and site preparation ensuring stable, compacted foundations for all project types.",
        "Our earth filling services cover bulk filling, layer-by-layer compaction, and final grade preparation. We source quality fill material, place it in controlled lifts, and compact each layer to specified densities — ensuring stable ground for construction above.",
        1, True
    ),
    (
        "Earth Leveling", "earth_works", "FaRuler",
        "Precision land leveling using modern motor graders and laser-guided equipment for any terrain.",
        "Accurate land leveling is critical for drainage, agriculture, and construction. Our motor graders and experienced operators achieve the specified finished levels across large areas quickly, reducing manual rework and ensuring consistent surface quality.",
        2, True
    ),
    (
        "Earth Grading", "earth_works", "FaRoad",
        "Ground grading for construction sites, road formation, and infrastructure development to specification.",
        "Grading establishes the correct contours and cross-falls for drainage and structural stability. We handle rough grading (bulk shaping) and fine grading (precise finish) for roads, building pads, car parks, and industrial yards.",
        3, False
    ),
    (
        "Earth Rolling", "earth_works", "FaCompressArrowsAlt",
        "Soil compaction and rolling for durable, stable construction foundations using modern compaction equipment.",
        "Proper compaction eliminates voids, increases load-bearing capacity, and prevents differential settlement. We deploy vibratory rollers, sheep-foot rollers, and pneumatic tyre rollers depending on the soil type and project specification.",
        4, False
    ),
    (
        "GSB Leveling & Rolling", "road_works", "FaHardHat",
        "Granular Sub Base leveling, grading, and rolling for roads and infrastructure to IRC/MoRTH standards.",
        "GSB is the load-distributing layer beneath roads and pavements. We spread, grade, and compact GSB material to the specified thickness and density — meeting IRC:SP:72 and MoRTH Specification requirements for government and highway contracts.",
        5, True
    ),
    (
        "WMM Leveling & Rolling", "road_works", "FaRoute",
        "Wet Mix Macadam leveling and rolling for strong road foundations, compliant with MoRTH specifications.",
        "WMM forms the base course of flexible pavements. We spread WMM from approved mixing plants, compact to the specified levels and camber, and ensure the surface is ready to receive the bituminous layers. All work conforms to MoRTH 4th Revision specifications.",
        6, True
    ),
    (
        "Road Construction Works", "road_works", "FaTruck",
        "Complete road earthwork — formation, grading, GSB, WMM, rolling, and finishing for all road types.",
        "From rural village roads to state highway formation, we handle the full earthwork scope: subgrade preparation, GSB, WMM, and drainage works. We have the machinery fleet and manpower to execute road contracts of any scale within the Tamil Nadu and adjoining regions.",
        7, True
    ),
    (
        "Railway Works", "railway_works", "FaTrain",
        "Railway earthwork, embankment construction, grading, leveling, and infrastructure development.",
        "We undertake railway earthwork sub-contracts including embankment construction with suitable fill material, blanket layer spreading, slope protection, and finished formation grading. Work is executed in compliance with Railway Board specifications and project requirements.",
        8, True
    ),
    (
        "Excavator Rental Services", "equipment_rental", "GiMiningHelmet",
        "Hire excavators with experienced operators for excavation, demolition, trenching, and construction.",
        "Our excavator fleet includes machines from 6T to 30T class, covering all common bucket sizes and attachments. Each unit is supplied with a trained, safety-conscious operator. Hire by the shift, day, or month — with or without diesel depending on your requirement.",
        9, False
    ),
    (
        "JCB Rental Services", "equipment_rental", "FaTruckMonster",
        "JCB backhoe loaders for excavation, loading, unloading, foundation digging, and site preparation.",
        "JCBs are the most versatile machines on any site. We provide backhoe loaders with front bucket and rear hoe capability — ideal for trenching, small excavations, material loading, and site clearance. Available for short and long-term hire across Thiruvallur district.",
        10, False
    ),
    (
        "Motor Grader Services", "equipment_rental", "FaRoad",
        "Precision road shaping, surface leveling, and grading for roads and construction sites.",
        "Motor graders are essential for achieving accurate road camber and cross-falls. Our graders are fitted with precision blade controls and operated by experienced road-construction operators, ensuring the surface meets design levels on the first pass.",
        11, False
    ),
    (
        "Soil Compaction Services", "equipment_rental", "FaCompressArrowsAlt",
        "Compaction using modern soil compactors for roads, foundations, embankments, and industrial sites.",
        "We provide single-drum vibratory rollers, tandem rollers, and plate compactors suitable for all layer compaction needs. Our operators monitor compaction by passes and density tests to ensure compliance with project specifications.",
        12, False
    ),
    (
        "Rock Breaker Services", "equipment_rental", "FaHammer",
        "Hydraulic rock breaker attachment services for hard rock excavation, trenching, and demolition.",
        "When conventional excavation meets rock, our hydraulic breaker attachments take over. Available on excavator carriers of various sizes, our rock breakers handle granite, laterite, and reinforced concrete demolition — keeping your project on schedule.",
        13, False
    ),
    (
        "Tipper Vehicle Services", "equipment_rental", "FaTruck",
        "Transportation of soil, sand, aggregates, gravel, and construction materials to and from your site.",
        "Our tipper fleet handles bulk material transport efficiently — excavated soil removal, aggregate delivery, GSB and WMM haulage, and debris disposal. Vehicles are maintained, GPS-tracked, and operated by licensed, experienced drivers. Available for local and outstation requirements.",
        14, False
    ),
]

TESTIMONIALS = [
    ("Mohan Raj", "Site Engineer, Avadi",
     "RRK Earth Movers handled our foundation excavation perfectly. The operator was skilled and the machine never broke schedule.", 5),
    ("Lakshmi Narayanan", "Plot Owner, Thiruvallur",
     "Got our agricultural land levelled within two days. Fair pricing and Rajesh Kumar himself supervised the work — very reliable.", 5),
    ("Senthil Kumar", "Contractor, Ponneri",
     "We've hired their JCB and tippers for three projects now. Machinery is always in good condition and they show up on time.", 5),
    ("Vijay Anand", "Civil Engineer, Chennai Highway Project",
     "RRK completed GSB and WMM works on our road project on time and within budget. Their grader operator is excellent.", 5),
    ("Ravi Shankar", "Infrastructure Developer, Sriperumbudur",
     "Reliable earth filling and compaction works. They followed the compaction specifications strictly and all density tests passed.", 5),
]

FAQS = [
    ("What types of earthmoving services does RRK Earth Movers provide?",
     "We provide earth cutting, earth filling, land leveling, earth grading, GSB/WMM works, road construction, railway earthworks, and heavy equipment rental including excavators, JCBs, motor graders, soil compactors, rock breakers, and tipper vehicles.",
     0),
    ("Which areas do you serve?",
     "We primarily serve Thiruvallur district and the greater Chennai region including Avadi, Ponneri, Sriperumbudur, Gummidipoondi, Tiruttani, and surrounding taluks. We also undertake outstation contracts across Tamil Nadu.",
     1),
    ("Can we hire machinery on a daily or monthly basis?",
     "Yes. We offer flexible hire terms — daily, weekly, or monthly — for all our equipment including excavators, JCBs, motor graders, soil compactors, rock breakers, and tipper vehicles. Contact us for current rates.",
     2),
    ("Do you handle government and infrastructure contracts?",
     "Yes. We undertake sub-contracts for government road projects, highway works, railway earthworks, and CMDA/DTCP-approved layout development. We comply with MoRTH and Railway Board specifications.",
     3),
    ("How quickly can you mobilise machinery to our site?",
     "For locations within Thiruvallur district, we can typically mobilise within 24 hours. For outstation projects, mobilisation timelines are discussed at the time of enquiry.",
     4),
    ("Do you provide operators with the hired machinery?",
     "Yes. All machinery hire includes experienced, trained operators. Diesel and consumables can be provided by us or the client depending on the agreement.",
     5),
    ("How do I get a quote?",
     "You can call us directly at 8248583199 / 9751291162, send a WhatsApp message, or use the contact form on this website. We will visit the site if required and provide a detailed quotation.",
     6),
]


class Command(BaseCommand):
    help = "Seed the database with RRK Earth Movers content."

    def handle(self, *args, **options):
        # Company Info
        CompanyInfo.objects.get_or_create(pk=1)
        self.stdout.write(self.style.SUCCESS("✓ CompanyInfo ready"))

        # Services
        for title, cat, icon, short_d, full_d, order, featured in SERVICES:
            obj, created = Service.objects.get_or_create(
                title=title,
                defaults={
                    "category": cat, "icon": icon,
                    "short_description": short_d,
                    "full_description": full_d,
                    "order": order, "is_featured": featured,
                },
            )
            if created:
                self.stdout.write(f"  + Service: {title}")

        # Testimonials
        for name, role, quote, rating in TESTIMONIALS:
            obj, created = Testimonial.objects.get_or_create(
                name=name,
                defaults={"role": role, "quote": quote, "rating": rating},
            )
            if created:
                self.stdout.write(f"  + Testimonial: {name}")

        # FAQs
        for question, answer, order in FAQS:
            obj, created = FAQ.objects.get_or_create(
                question=question,
                defaults={"answer": answer, "order": order},
            )
            if created:
                self.stdout.write(f"  + FAQ: {question[:50]}...")

        self.stdout.write(self.style.SUCCESS(
            f"\nDone. {Service.objects.count()} services, "
            f"{Testimonial.objects.count()} testimonials, "
            f"{FAQ.objects.count()} FAQs seeded."
        ))
