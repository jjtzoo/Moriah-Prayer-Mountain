import Image from "next/image";
import InquiryForm from "@/app/ui/inquiry-form";

type NewsItem = {
  title: string;
  category: string;
  dateLabel: string;
  dateTime?: string;
  timelineGroup: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  gallery?: { src: string; alt: string }[];
  video?: string;
  quote?: string;
  featured?: boolean;
};

const newsItems: NewsItem[] = [
  {
    title: "The official Moriah Prayer Mountain website launches",
    category: "Official launch",
    dateLabel: "September 27, 2026",
    dateTime: "2026-09-27",
    timelineGroup: "2026-09",
    summary:
      "Moriah’s official website launches, bringing ministry stories, visitor information, directions, and updates together in one place.",
  },
  {
    title: "A vision brought to life at Kids Camp",
    category: "Kids Camp",
    dateLabel: "April 18, 2026",
    dateTime: "2026-04-18",
    timelineGroup: "2026-04",
    summary:
      "Moriah’s first Kids Camp in Masbate City brought a vision first conceived in 2005 into reality. Children worshiped together, surrendered their lives to Jesus with gratitude, and praised Him with joy.",
    image: "/assets/news/kids-camp/kids-camp-restored.png",
    imageAlt: "Children gathered during Moriah’s first Kids Camp",
    imageWidth: 2048,
    imageHeight: 1536,
    gallery: [
      { src: "/assets/news/kids-camp/1.jpg", alt: "Children sharing a meal at Kids Camp" },
      { src: "/assets/news/kids-camp/2.jpg", alt: "Children gathered around a table at Kids Camp" },
      { src: "/assets/news/kids-camp/3.jpg", alt: "Kids Camp participants together at Moriah" },
      { src: "/assets/news/kids-camp/volunteers.jpg", alt: "Volunteers serving during Kids Camp" },
    ],
    quote:
      "When we put our faith into action, that’s what makes our prayers powerful.",
    featured: true,
  },
  {
    title: "Masbate Youth Congress: Chosen & Refined",
    category: "Youth Congress",
    dateLabel: "May 22, 2026",
    dateTime: "2026-05-22",
    timelineGroup: "2026-05",
    summary:
      "Young people gathered for the Masbate Youth Congress under the theme “Filipino Youth: Chosen & Refined.”",
    image: "/assets/news/youth-congress-2026/1.jpg",
    imageAlt: "Young people gathered for the Masbate Youth Congress",
    imageWidth: 2048,
    imageHeight: 1536,
    gallery: [
      {
        src: "/assets/news/youth-congress-2026/guest.jpg",
        alt: "A guest meeting attendees during the Youth Congress",
      },
    ],
  },
  {
    title: "Thanksgiving with the next generation",
    category: "Thanksgiving",
    dateLabel: "December 2025",
    timelineGroup: "2025-12",
    summary:
      "Moriah’s December 2025 Thanksgiving gathering with the next generation brought people together for food and fellowship in the function hall.",
    image: "/assets/news/thanksgiving-next-gen-2025/1.jpg",
    imageAlt: "Children and adults sharing a meal during Moriah’s Thanksgiving gathering",
    imageWidth: 2048,
    imageHeight: 1536,
    gallery: [
      { src: "/assets/news/thanksgiving-next-gen-2025/2.jpg", alt: "Young people sharing a meal at Moriah" },
      { src: "/assets/news/thanksgiving-next-gen-2025/3.jpg", alt: "Next generation gathered around a table" },
      { src: "/assets/news/thanksgiving-next-gen-2025/4.jpg", alt: "Fellowship during the Thanksgiving gathering" },
      { src: "/assets/news/thanksgiving-next-gen-2025/5.jpg", alt: "A moment from Moriah’s 2025 Thanksgiving gathering" },
    ],
  },
  {
    title: "Israel’s 77th Independence Day",
    category: "Moriah & Israel",
    dateLabel: "May 24, 2025",
    dateTime: "2025-05-24",
    timelineGroup: "2025-05",
    summary:
      "Photos from Moriah’s 2025 archive marking Israel’s 77th Independence Day.",
    image: "/assets/news/israel-77-2025/1.jpg",
    imageAlt: "Moriah representatives at an Israel-related gathering",
    imageWidth: 2048,
    imageHeight: 1536,
    gallery: [
      { src: "/assets/news/israel-77-2025/2.jpg", alt: "Moriah community members at the gathering" },
      { src: "/assets/news/israel-77-2025/3.jpg", alt: "Attendees at an Israel-related gathering" },
      { src: "/assets/news/israel-77-2025/May%2024,%202025.jpg", alt: "A group photo from the 2025 gathering" },
    ],
  },
  {
    title: "Israel’s 70th anniversary",
    category: "From the archive",
    dateLabel: "2018",
    timelineGroup: "2018-undated",
    summary:
      "During the 70th anniversary of Israel as a nation, Moriah representatives met at the Ambassador’s residence.",
    image:
      "/assets/news/israel-70th-anniversary/Meeting%20with%20Ambre.jpg",
    imageAlt: "Moriah representatives at a meeting at the Ambassador’s residence",
    imageWidth: 1440,
    imageHeight: 864,
    secondaryImage:
      "/assets/news/israel-70th-anniversary/prayer%20mountain%2070th%20sign.jpg",
    secondaryImageAlt: "The Israel 70 anniversary sign at Moriah Prayer Mountain",
  },
  {
    title: "Albert Veskler and his wife visit Moriah",
    category: "Moriah visit",
    dateLabel: "August 2026",
    timelineGroup: "2026-08",
    summary:
      "Albert Veskler, director of Jerusalem Prayer Breakfast, and his wife visited Moriah to learn how the people of Masbate love Israel and want to bless the nation.",
    image:
      "/assets/news/albert-visit/Albert%20Veskler%20Visits%20Moriah%20Prayer%20Mountain%20Jerusalem%20Prayer%20Breakfast%20Director.jpg",
    imageAlt: "A group meeting during Albert Veskler and his wife’s visit to Moriah",
    imageWidth: 2048,
    imageHeight: 921,
    video: "/assets/news/albert-visit/Albert%20Veskler%20Preaching%20Snippet.mp4",
  },
];

const timelineGroups = Array.from(
  newsItems.reduce((groups, item) => {
    const group = groups.get(item.timelineGroup) ?? [];
    group.push(item);
    groups.set(item.timelineGroup, group);
    return groups;
  }, new Map<string, NewsItem[]>()),
  ([key, items]) => ({ key, items }),
).sort((a, b) => {
  const sortKey = (key: string) =>
    key.replace("-undated", "-00").replace("undated", "0000-00");
  return sortKey(b.key).localeCompare(sortKey(a.key));
});

function getTimelineHeading(groupKey: string) {
  const [year, month] = groupKey.split("-");
  if (groupKey === "undated") return { month: "Date to confirm", year: "" };
  if (month === "undated") return { month: "Month to confirm", year };
  const monthName = new Intl.DateTimeFormat("en", { month: "long" }).format(
    new Date(Number(year), Number(month) - 1, 1),
  );
  return { month: monthName, year };
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article
      className={`news-card${item.featured ? " news-card-featured" : ""}${
        item.image ? "" : " news-card-launch"
      }`}
    >
      {item.image && (
        <div className={`news-card-images${item.gallery?.length ? " news-card-gallery" : ""}`}>
        <div className="news-image">
          <Image
            src={item.image}
            alt={item.imageAlt ?? "Moriah Prayer Mountain news photograph"}
            fill
            sizes={item.featured ? "(max-width: 760px) 100vw, 55vw" : "(max-width: 760px) 100vw, 42vw"}
            className="news-image-file"
          />
        </div>
        {item.secondaryImage && (
          <div className="news-image news-image-secondary">
            <Image
              src={item.secondaryImage}
              alt={item.secondaryImageAlt ?? "Additional archive photograph"}
              fill
              sizes="(max-width: 760px) 50vw, 20vw"
              className="news-image-file"
            />
          </div>
        )}
        {item.gallery?.map((image) => (
          <div className="news-image news-image-more" key={image.src}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 760px) 50vw, 20vw"
              className="news-image-file"
            />
          </div>
        ))}
        </div>
      )}
      <div className="news-card-copy">
        <div className="news-meta">
          <span>{item.category}</span>
          {item.dateTime ? (
            <time dateTime={item.dateTime}>{item.dateLabel}</time>
          ) : (
            <span>{item.dateLabel}</span>
          )}
        </div>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        {item.quote && <blockquote>“{item.quote}”</blockquote>}
        {item.video && (
          <details className="news-video">
            <summary>Watch a short preaching excerpt</summary>
            <video controls preload="none" aria-label="Preaching excerpt from Albert Veskler">
              <source src={item.video} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          </details>
        )}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Moriah Prayer Mountain home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-name">
            Moriah <small>Prayer Mountain</small>
          </span>
        </a>
        <details className="mobile-nav">
          <summary aria-label="Open navigation menu">Menu <span>＋</span></summary>
          <nav aria-label="Main navigation">
            <a href="#story">Our story</a>
            <a href="#visit">Visit</a>
            <a href="#directions">How to get here</a>
            <a href="#gatherings">Gatherings</a>
            <a href="#news">News &amp; updates</a>
            <a href="#contact">Contact</a>
          </nav>
        </details>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#story">Our story</a>
          <a href="#visit">Visit</a>
          <a href="#directions">How to get here</a>
          <a href="#gatherings">Gatherings</a>
          <a href="#news">News &amp; updates</a>
          <a className="nav-contact" href="#contact">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-texture" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">
              <span className="eyebrow-rule" /> Masbate, Philippines
            </p>
            <h1 id="hero-title">
              A place set apart
              <br />
              for <em>prayer.</em>
            </h1>
            <p className="hero-copy">
              Come away from the noise. Find room for prayer, rest, fellowship,
              and time with God.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#visit">
                Plan your visit <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link text-link-light" href="#story">
                Discover Moriah <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-caption">
            <span>Quiet ground. Open hearts.</span>
            <span className="caption-line" />
            <span>Masbate</span>
          </div>
          <a className="scroll-cue" href="#welcome">
            <span /> Scroll to discover
          </a>
        </section>

        <section className="welcome section-pad" id="welcome">
          <div className="welcome-kicker">
            <span className="eyebrow">A welcome to Moriah</span>
            <span className="small-cross" aria-hidden="true">
              ✳
            </span>
          </div>
          <div className="welcome-grid">
            <h2>
              Step away.
              <br />
              <em>Draw near.</em>
            </h2>
            <div className="welcome-copy">
              <p className="lead">
                Moriah Prayer Mountain is a place to slow down and seek God
                together.
              </p>
              <p>
                We welcome individuals, families, churches, and prayer groups
                to come for prayer, worship, fellowship, and spiritual renewal
                in Masbate.
              </p>
              <a className="text-link" href="#story">
                The heart of Moriah <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="story section-pad" id="story">
          <div className="story-aside">
            <span className="story-aside-mark" aria-hidden="true">
              ✳
            </span>
            <p>Come away. Be still. Seek God.</p>
            <span className="story-aside-place">A place for prayer in Masbate</span>
          </div>
          <div className="story-copy">
            <p className="eyebrow">
              <span className="eyebrow-rule" /> More than a destination
            </p>
            <h2>
              A little space
              <br />
              to hear <em>again.</em>
            </h2>
            <p className="lead">Some journeys are taken inward.</p>
            <p>
              Moriah Prayer Mountain welcomes people who want to make room for
              prayer, rest, and meaningful time with one another.
            </p>
            <p>
              Whether you are coming on your own or with a group, the invitation
              is simple: come as you are, and take the time you need.
            </p>
            <a className="text-link" href="#visit">
              Find your way here <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="rhythm section-pad" aria-labelledby="rhythm-title">
          <div className="section-heading">
            <p className="eyebrow">The rhythm of Moriah</p>
            <h2 id="rhythm-title">
              Room for what
              <br />
              <em>matters most.</em>
            </h2>
          </div>
          <div className="rhythm-list">
            <article className="rhythm-item">
              <span className="rhythm-number">01</span>
              <div>
                <h3>Prayer</h3>
                <p>Make space to listen, reflect, and seek God together.</p>
              </div>
              <span className="rhythm-mark" aria-hidden="true">✳</span>
            </article>
            <article className="rhythm-item">
              <span className="rhythm-number">02</span>
              <div>
                <h3>Retreat</h3>
                <p>Step back from everyday routines and find room to breathe.</p>
              </div>
              <span className="rhythm-mark" aria-hidden="true">✳</span>
            </article>
            <article className="rhythm-item">
              <span className="rhythm-number">03</span>
              <div>
                <h3>Fellowship</h3>
                <p>Share time, conversation, worship, and encouragement.</p>
              </div>
              <span className="rhythm-mark" aria-hidden="true">✳</span>
            </article>
            <article className="rhythm-item">
              <span className="rhythm-number">04</span>
              <div>
                <h3>Formation</h3>
                <p>Grow through teaching, ministry gatherings, and life together.</p>
              </div>
              <span className="rhythm-mark" aria-hidden="true">✳</span>
            </article>
          </div>
        </section>

        <section className="visit section-pad" id="visit">
          <div className="visit-intro">
            <p className="eyebrow">
              <span className="eyebrow-rule" /> Your time at Moriah
            </p>
            <h2>
              Come with
              <br />
              an <em>open heart.</em>
            </h2>
            <p className="lead">
              A mountain setting to pray, stay, worship, and gather.
            </p>
            <p>
              Planning a retreat or visit? Coordinate ahead with the ministry
              about room availability, chapel or function hall rentals, and
              your travel plans.
            </p>
            <a className="button button-dark" href="#directions">
              How to get here <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="visit-note amenities-note">
            <div className="amenities-heading">
              <span className="visit-note-index">Stay and gather</span>
              <h3>Amenities at Moriah</h3>
            </div>
            <ul className="amenities-list">
              <li>
                <span>01</span>
                <div><strong>Chapel</strong><p>A place for prayer and worship, also available to rent for gatherings.</p></div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Rooms</strong>
                  <p>
                    17 rooms in all: 11 non-solo rooms and 6 solo rooms. All 17
                    rooms are currently available and have air conditioning.
                    Confirm availability for your dates with the ministry;
                    room details and rates are coming soon.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div><strong>Function hall</strong><p>A shared space for events and fellowship.</p></div>
              </li>
            </ul>
            <span className="visit-note-place">Masbate · Philippines</span>
          </div>
        </section>

        <section className="directions section-pad" id="directions">
          <div className="directions-heading">
            <p className="eyebrow">Plan your route</p>
            <h2>
              How to <em>get here.</em>
            </h2>
            <p>
              Moriah Prayer Mountain is in Masbate, Philippines. Plan the sea
              crossing and local ride ahead of time, then confirm your arrival
              arrangements with the ministry.
            </p>
            <details className="directions-map">
              <summary>
                <span>Open map</span>
                <span className="map-toggle-icon" aria-hidden="true">＋</span>
              </summary>
              <div className="directions-map-content">
                <iframe
                  title="Map to Mt. Moriah Prayer Mountain in Masbate City"
                  src="https://maps.google.com/maps?q=Mt.%20Moriah%20Prayer%20Mountain%2C%208HWW%2BJGF%2C%20Masbate%20City%2C%20Masbate%2C%20Philippines&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mt.+Moriah+Prayer+Mountain+Masbate"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open directions in Google Maps <span aria-hidden="true">↗</span>
                </a>
              </div>
            </details>
          </div>
          <div className="route-list">
            <article className="route-step">
              <span className="route-number">01</span>
              <div>
                <p className="eyebrow">From NCR</p>
                <h3>Travel to Dalahican Port in Lucena.</h3>
                <p>
                  Take a bus or other road transport from Metro Manila to
                  Dalahican Port in Lucena. Allow time for traffic and the
                  operator’s boarding cutoff.
                </p>
              </div>
            </article>
            <article className="route-step">
              <span className="route-number">02</span>
              <div>
                <p className="eyebrow">Lucena to Masbate</p>
                <h3>Take the Starhorse ferry to Masbate City.</h3>
                <p>
                  Plan for an overnight crossing. Confirm the current sailing,
                  arrival port, duration, and ticketing directly with Starhorse
                  before you travel.
                </p>
                <a className="route-operator-link" href="https://www.starhorse.com.ph/routes.php" target="_blank" rel="noreferrer">
                  Check Starhorse route information <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
            <article className="route-step">
              <span className="route-number">03</span>
              <div>
                <p className="eyebrow">Alternative from Luzon</p>
                <h3>Travel to Pilar, Sorsogon.</h3>
                <p>
                  From other parts of Luzon, travel by road to Pilar and take a
                  ferry to Masbate City. Check current schedules with the
                  operators before setting out.
                </p>
              </div>
            </article>
            <article className="route-step">
              <span className="route-number">04</span>
              <div>
                <p className="eyebrow">From Cebu</p>
                <h3>Check for a direct sailing.</h3>
                <p>
                  Direct Cebu–Masbate sailings may suit your trip. Confirm the
                  current route and operating days before planning around it.
                </p>
              </div>
            </article>
            <article className="route-step">
              <span className="route-number">05</span>
              <div>
                <p className="eyebrow">The final leg</p>
                <h3>Coordinate your arrival in Masbate City.</h3>
                <p>
                  Arrange local transport and get the latest last-mile directions
                  from Moriah before setting out for the mountain.
                </p>
              </div>
            </article>
            <p className="travel-advisory">
              Ferry service can change with weather and operator schedules.
              Leave a travel buffer and reconfirm your sailing before departure.
            </p>
          </div>
        </section>

        <section className="gatherings section-pad" id="gatherings">
          <div className="gatherings-intro">
            <p className="eyebrow">Gatherings at Moriah</p>
            <h2>
              Life together,
              <br />
              <em>in every season.</em>
            </h2>
            <p>
              Prayer gatherings, retreats, teaching, and fellowship are part of
              life at Moriah. Ask the ministry for current dates and details.
            </p>
            <a className="text-link" href="#contact">
              Ask about upcoming gatherings <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="gatherings-board">
            <div className="board-topline">
              <span>Gather at Moriah</span>
              <span className="board-dot" />
              <span>Dates shared by the ministry</span>
            </div>
            <article className="gathering-card">
              <span className="gathering-type">Prayer &amp; worship</span>
              <h3>Come together in prayer.</h3>
              <p>Shared moments of worship and prayer for individuals and groups.</p>
              <a href="#contact">Ask for details <span aria-hidden="true">↗</span></a>
            </article>
            <article className="gathering-card gathering-card-offset">
              <span className="gathering-type">Retreats &amp; fellowship</span>
              <h3>Make room to reconnect.</h3>
              <p>A quiet setting for church groups, families, and ministry teams.</p>
              <a href="#contact">Plan with us <span aria-hidden="true">↗</span></a>
            </article>
            <div className="board-footnote">
              Specific schedules are confirmed directly with Moriah.
            </div>
          </div>
        </section>

        <section className="news section-pad" id="news">
          <div className="news-heading">
            <div>
              <p className="eyebrow">From the mountain</p>
              <h2>
                News &amp; <em>updates.</em>
              </h2>
            </div>
            <p>
              Stories, milestones, and announcements from Moriah—kept together
              in one dated journal.
            </p>
          </div>
          <div className="news-timeline">
            {timelineGroups.map((group) => {
              const heading = getTimelineHeading(group.key);
              return (
                <section className="timeline-month" key={group.key}>
                  <h3 className="timeline-month-heading">
                    <span>{heading.month}</span>
                    {heading.year && <small>{heading.year}</small>}
                  </h3>
                  <div className="timeline-events">
                    {group.items.map((item) => (
                      <NewsCard item={item} key={item.title} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="closing-quote section-pad">
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>Be still, and know that I am God.</blockquote>
          <cite>Psalm 46:10</cite>
        </section>

        <section className="contact-band" id="contact">
          <div className="contact-text">
            <p className="eyebrow">We’d be glad to hear from you</p>
            <h2>
              Come away.
              <br />
              <em>Be still.</em>
            </h2>
          </div>
          <div className="contact-action">
            <p>
              Ask a question, inquire about a room stay, or request a chapel or
              function hall rental. Large groups can share a budget so the
              ministry can consider a suitable room arrangement.
            </p>
            <InquiryForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span className="brand-name">
            Moriah <small>Prayer Mountain</small>
          </span>
        </a>
        <p>A place set apart for prayer, rest, fellowship, and renewal.</p>
        <nav aria-label="Footer navigation">
          <a href="#story">Our story</a>
          <a href="#visit">Visit</a>
          <a href="#directions">How to get here</a>
          <a href="#gatherings">Gatherings</a>
          <a href="#news">News &amp; updates</a>
        </nav>
        <span className="copyright">Masbate, Philippines</span>
      </footer>
    </>
  );
}
