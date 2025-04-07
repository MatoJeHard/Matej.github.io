<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <title>Unique Daily Quotes JSON Generator</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    pre { background: #f4f4f4; padding: 15px; border: 1px solid #ddd; overflow: auto; }
    button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Unique Daily Quotes JSON Generator</h1>
  <p>Klikni gumb, da generiraš JSON objekt z 365 unikatnimi citati za kategorije: motivational, personalized, pregenerated, family in creative.</p>
  <button id="generateAll">Generate JSON for All Categories</button>
  <h2>Generated JSON:</h2>
  <pre id="output"></pre>

  <script>
    // Vrne naključno izbran element iz seznama
    function getRandom(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    // Ustvari celoten nabor vseh unikátnih kombinacij citatov
    function generateUniquePool(beginnings, middles, endings) {
      const pool = [];
      for (const b of beginnings) {
        for (const m of middles) {
          for (const e of endings) {
            pool.push(`${b}, ${m}, ${e}`);
          }
        }
      }
      return pool;
    }

    // Izboljšana funkcija za generacijo 365 citatov:
    // - Ustvari pool vseh unikátnih kombinacij.
    // - Uporablja "least-used" mehanizem, da enakomerno porazdeli uporabo.
    // - Preprečuje, da se začetna fraza ne ponovi pri zaporednih citatih.
    function generateQuotes(beginnings, middles, endings) {
      const pool = generateUniquePool(beginnings, middles, endings);
      const usage = {};
      pool.forEach(quote => usage[quote] = 0);

      const quotes = [];
      const totalQuotes = 365;

      for (let i = 0; i < totalQuotes; i++) {
        let candidates = pool.filter(q => {
          if (i > 0) {
            const prevBeginning = quotes[i - 1].split(', ')[0];
            const currentBeginning = q.split(', ')[0];
            return prevBeginning !== currentBeginning;
          }
          return true;
        });
        if (candidates.length === 0) {
          candidates = pool.slice();
        }
        const minUsage = Math.min(...candidates.map(q => usage[q]));
        const leastUsedCandidates = candidates.filter(q => usage[q] === minUsage);
        const selectedQuote = getRandom(leastUsedCandidates);
        usage[selectedQuote]++;
        quotes.push(selectedQuote);
      }
      return quotes;
    }

    // Dodatne fraze za večjo raznolikost:

    // Motivational
    const motivationalBeginnings = [
      "Push beyond your limits",
      "Embrace the challenge",
      "Seize the day",
      "Transform your dreams",
      "Rise to greatness",
      "Unlock your potential",
      "Overcome your fears"
    ];
    const motivationalMiddles = [
      "and pursue excellence",
      "while conquering adversity",
      "and ignite your passion",
      "as you overcome obstacles",
      "with relentless determination",
      "with unwavering focus",
      "by breaking the mold"
    ];
    const motivationalEndings = [
      "for success is yours.",
      "because your potential is limitless.",
      "as every step counts.",
      "and make each moment matter.",
      "for greatness awaits you.",
      "because every moment counts.",
      "for a brighter tomorrow awaits."
    ];

    // Personalized
    const personalizedBeginnings = [
      "Your story is unique",
      "Express your individuality",
      "Embrace your authenticity",
      "Celebrate your uniqueness",
      "Craft your personal legacy",
      "Stand in your truth",
      "Cherish your inner light"
    ];
    const personalizedMiddles = [
      "with every heartfelt moment",
      "as you share your truth",
      "by embracing your inner self",
      "and let your voice be heard",
      "with genuine passion",
      "with every brave step",
      "as your heart leads the way"
    ];
    const personalizedEndings = [
      "because you are one of a kind.",
      "for your uniqueness inspires others.",
      "as your individuality shines through.",
      "because your journey is personal.",
      "and every experience matters.",
      "because your soul is remarkable.",
      "as your presence inspires."
    ];

    // Pregenerated
    const pregeneratedBeginnings = [
      "Here is a curated thought",
      "A ready-made inspiration",
      "Instant wisdom for you",
      "A spark of preselected brilliance",
      "Quick inspiration",
      "Here's a nugget of wisdom",
      "An instant dose of insight"
    ];
    const pregeneratedMiddles = [
      "designed to uplift your spirit",
      "crafted to fuel your day",
      "set to brighten your path",
      "intended to inspire instant action",
      "ready to empower your mindset",
      "designed for immediate impact",
      "engineered to motivate"
    ];
    const pregeneratedEndings = [
      "because sometimes, a little push is all you need.",
      "as preselected wisdom makes your day easier.",
      "for quick inspiration is just a moment away.",
      "so let this thought guide you.",
      "for a spark of wisdom can change everything.",
      "because sometimes, the simplest words empower.",
      "as a swift reminder of strength."
    ];

    // Family
    const familyBeginnings = [
      "Family is the heart of life",
      "Cherish the bond of family",
      "Family is your anchor",
      "Embrace the love of family",
      "Celebrate the warmth of family",
      "Home is where love resides",
      "Family: your lifelong treasure"
    ];
    const familyMiddles = [
      "and nurture every moment",
      "as you build lasting memories",
      "because love grows with every shared smile",
      "for every hug matters",
      "since family is everything",
      "binding hearts together",
      "cherishing every shared smile"
    ];
    const familyEndings = [
      "for family stands by you always.",
      "because together, you overcome all.",
      "and every moment is a treasure.",
      "as family is the true wealth.",
      "because love is the strongest bond.",
      "because family is forever.",
      "as every moment with family is a gift."
    ];

    // Creative
    const creativeBeginnings = [
      "Unleash your creativity",
      "Dive into the world of art",
      "Let your imagination run wild",
      "Explore the realm of ideas",
      "Ignite your creative spark",
      "Imagine beyond boundaries",
      "Craft your masterpiece"
    ];
    const creativeMiddles = [
      "and paint your dreams with passion",
      "as you sculpt a masterpiece of life",
      "by letting your vision guide you",
      "while transforming thoughts into art",
      "as every idea blossoms into beauty",
      "as your ideas take flight",
      "while forging new paths in art"
    ];
    const creativeEndings = [
      "for creativity is the soul's expression.",
      "because art is the language of the heart.",
      "as every stroke writes a new story.",
      "because your vision is unique.",
      "for every creation is a revelation.",
      "because creativity fuels the soul.",
      "for every spark ignites innovation."
    ];

    // Generiramo 365 citatov za vsako kategorijo
    const motivationalQuotes = generateQuotes(motivationalBeginnings, motivationalMiddles, motivationalEndings);
    const personalizedQuotes = generateQuotes(personalizedBeginnings, personalizedMiddles, personalizedEndings);
    const pregeneratedQuotes = generateQuotes(pregeneratedBeginnings, pregeneratedMiddles, pregeneratedEndings);
    const familyQuotes = generateQuotes(familyBeginnings, familyMiddles, familyEndings);
    const creativeQuotes = generateQuotes(creativeBeginnings, creativeMiddles, creativeEndings);

    // Sestavimo celoten JSON objekt z vsemi kategorijami
    const outputObj = {
      "motivational": motivationalQuotes,
      "personalized": personalizedQuotes,
      "pregenerated": pregeneratedQuotes,
      "family": familyQuotes,
      "creative": creativeQuotes
    };

    document.getElementById("generateAll").addEventListener("click", function() {
      document.getElementById("output").textContent = JSON.stringify(outputObj, null, 2);
    });
  </script>
</body>
</html>
