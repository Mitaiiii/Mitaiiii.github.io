const caseItem = {
  copy: (keyword, title, body) => ({ kind: "copy", keyword, title, body }),
  image: (src, alt, fit = "natural") => ({ kind: "image", src, alt, fit }),
  video: (src, title) => ({ kind: "video", src, title }),
  split: (left, right) => ({ layout: "split", left, right }),
  full: (content) => ({ layout: "full", content })
};

const workImage = (name, alt, fit) => caseItem.image(`assets/works/${name}`, alt, fit);

function standardCaseBlocks(project) {
  const blocks = project.sections.map((section, index) => caseItem.split(
    caseItem.copy(`${String(index + 1).padStart(2, "0")} / ${project.keyword || project.category}`, section.title, /^https?:\/\//.test(section.text)
      ? `<p><a class="document-link" href="${section.text}" target="_blank" rel="noopener noreferrer">Open project</a></p>`
      : `<p>${section.text}</p>`),
    caseItem.image(project.images[Math.min(index + 1, project.images.length - 1)], `${project.title} study ${index + 1}`)
  ));
  const used = new Set([project.images[0], ...project.sections.map((_, index) => project.images[Math.min(index + 1, project.images.length - 1)])]);
  for (const src of project.images.slice(1)) {
    if (!used.has(src)) blocks.push(caseItem.full(caseItem.image(src, `${project.title} project image`)));
  }
  if (project.concepts) {
    for (let i = 0; i < project.concepts.length; i += 2) {
      const left = caseItem.image(project.concepts[i], `${project.title} concept ${i + 1}`);
      const right = project.concepts[i + 1] && caseItem.image(project.concepts[i + 1], `${project.title} concept ${i + 2}`);
      blocks.push(right ? caseItem.split(left, right) : caseItem.full(left));
    }
  }
  return blocks;
}

const caseStudyBlocks = {
  underwater: (project) => {
    const I = (name, alt, fit) => workImage(`underwater-${name}.jpg`, alt, fit);
    const C = caseItem.copy;
    const S = caseItem.split;
    const F = caseItem.full;
    return [
      S(caseItem.video("https://www.youtube.com/embed/GjxquZoUKTQ", "Underwater project video"), C("Project", "Worldbuilding in Svalbard", `<p>UNDERWATER is an atmospheric worldbuilding and environmental design showcase built inside Unreal Engine 5. Set in Svalbard, the project follows a survival narrative where players venture from a weathered, elevated arctic research facility into an abandoned sub-glacial mine to retrieve lost cultural archives.</p><p>This final eight-week Art Direction module was made through a co-design pipeline with BA students.</p>`)),
      S(C("My Role", "Art Direction & Production", `<p><strong>Shader Development:</strong> I built a sea material with Unreal's Single Layer Water shading model, tested Versicolor mushroom textures in Blender with distorted Wave Nodes and ColorRamps, and combined Parallax Occlusion Mapping with sine-wave functions to give crystalline fungi depth and a breathing motion.</p><p><strong>Terrain & Level Design:</strong> I iterated the arctic terrain across three phases, balancing geological detail with walkable player paths.</p><p><strong>Architectural & Visual Logic:</strong> I remodeled structures from real Svalbard engineering, including elevated buildings that resist snow accumulation, and used vermilion as a clear visual guide.</p>`), I("cover", "Underwater project cover", "cover")),
      S(C("01 / Concept", "Organic Landmasses", `<p>My first direction drew on the rich colors and geological layers of natural salt lakes. I embedded giant fungal landmasses in collapsed glacial gaps, using living color against ice-blue canyons to suggest environmental degradation and guide the player.</p>`), I("env-concept-1", "Underwater environment concept")),
      S(I("env-concept-2", "Underwater environment concept variation"), I("concept-design", "Underwater concept design board")),
      S(C("02 / Terrain", "2D Noise", `<p>In Blender, I combined a 2D Noise texture with a Distortion node to test the technical approach. The first result looked like dry land with puddles, rather than distinct landmasses in a vast ocean.</p>`), I("noise", "Underwater 2D noise terrain test")),
      S(I("voronoi-3d", "Underwater Voronoi terrain"), C("02 / Terrain", "Voronoi Smoothing", `<p>I moved to the distance factor of a Voronoi texture to make the generated rings less random and jagged. The terrain still needed a clearer distinction between land and open water.</p>`)),
      S(C("02 / Terrain", "Custom Heightmap", `<p>A hand-drawn heightmap gave the best balance: a large, readable gameplay surface with organic detail along its margins.</p>`), I("heightmap-final", "Underwater final heightmap")),
      S(I("emission-final", "Underwater glowing fungi"), C("02 / Terrain", "Bioluminescence", `<p>Inspired by natural bioluminescent dinoflagellates, I applied an emissive texture map to bring fluorescent fungi into the dark environment.</p>`)),
      S(C("03 / Mountains", "Walkable Slopes", `<p>The lower mountain edges have gentle slopes that signal where players can move without climbing gear.</p>`), I("mountain-2", "Underwater near-ground mountain", "cover")),
      S(I("mountain-1", "Distant Svalbard mountain", "cover"), C("03 / Mountains", "Distant Horizon", `<p>Sharp ridges and steep cliffs, designed with GAEA, define the boundary of the arctic world.</p>`)),
      F(I("final-1", "Final Underwater landscape at night")),
      S(C("04 / Materials", "Ocean Texture", `<p>I balanced light absorption and surface roughness with Unreal's Single Layer Water material, giving shallow zones natural reflections and cold water a translucent, refractive feel.</p>`), I("final-2", "Underwater ocean material", "cover")),
      S(I("mushrooms", "Underwater mushroom material"), C("04 / Materials", "Versicolor Mushroom", `<p>Instead of a conventional cap and stem, I looked to Trametes versicolor. Crystalline forms and Parallax Occlusion Mapping create optical depth within the material.</p>`)),
      S(C("05 / Architecture", "Bunker Iteration", `<p>My first metal-and-glass sci-fi cabin did not fit the environment or project logic, so I revisited the structure using real polar research stations as reference.</p>`), I("bunker-model", "Early Underwater bunker model")),
      S(I("bunker-after", "Reworked Underwater research station", "cover"), C("05 / Architecture", "Polar Research Station", `<p>I remade the bunker with fluorescent blue lights, elevated supports and the compact feel of a Scandinavian research station.</p>`)),
      F(I("ocean-wide", "Final Underwater exterior scene")),
      S(C("05 / Architecture", "Work and Private Life", `<p>The bunker interior drew on my compact student dorm, where work and private life share one room. I wanted it to show a workaholic who neglects their own well-being.</p><p>Opened, empty food cans crowd the desk. Two low wooden shelves make a makeshift bed, with finished soda cans scattered beside it.</p>`), workImage("underwater-private-life.png", "Underwater bunker interior and private workspace", "cover")),
      S(I("vault-entrance", "Underwater vault entrance", "cover"), C("06 / Vault", "Cultural Archive", `<p>By using real Svalbard Global Seed Vault shapes with blue vermilion red and dark green colors, the vault is designed to guide the player clearly through the dark environment.</p>`)),
    ];
  },

  fyrmester: (project) => {
    const [cover, poster, concepts, ui, modeling, ocean, gameplayA, gameplayB] = project.images;
    const C = caseItem.copy;
    const I = caseItem.image;
    const S = caseItem.split;
    const F = caseItem.full;
    return [
      S(I(poster, "Fyrmester key art poster", "contain"), C("DADIU / Vertical Slice / 2026", "Visual Designer", `<p class="case-layout__meta">15-person team · 3-week sprint</p><p>Inspired by <em>The Lighthouse</em>, <em>Fyrmester: The Burden of Light</em> is a high-pressure maritime thriller set in 19th-century Denmark. A compact story and survival gameplay build on the strain of keeping the light burning.</p><p>I worked across concept art, interface design and 3D production, helping establish the visual direction while supporting the team's changing needs.</p>`)),
      S(C("01 / Visual Direction", "Character & Lighthouse Concept", `<p>Working from our Art Director's clay-like brief, I explored a textured, hand-painted look for the characters and world, with <em>Disco Elysium</em> as one influence.</p><p>Danish coastal lighthouses informed the tower's tapered silhouette. White, bright azure and deep navy keep it distinct against the sea.</p>`), I(concepts, "Original Fyrmester character and lighthouse concepts above research references")),
      S(I(ui, "Fyrmester UI sketches, HUD exploration and menu"), C("02 / Interface", "UI Design", `<p>I took the concentric optics of a lighthouse Fresnel lens into the interface, using soft refraction and scattered light to connect the menus and HUD to the world.</p>`)),
      S(C("03 / Production", "3D Modeling", `<p>With three weeks to build the slice, I modeled and UV-unwrapped low-poly props directly from reference boards and art direction. The machinery and interior assets draw on 19th-century lighthouse equipment.</p>`), I(modeling, "Fyrmester low-poly machinery and interior models")),
      F(I(gameplayA, "Fyrmester lighthouse interior in game")),
      F(I(gameplayB, "Fyrmester machinery and character in game")),
      S(I(ocean, "Fyrmester ocean shader at night", "cover"), C("04 / Materials", "Ocean Shader", `<p>I collaborated with our Lead Programmer on the ocean shader. I made custom normal maps in Blender with soft-edged Voronoi textures to give the stylized water a more natural sense of movement.</p>`))
    ];
  },


  "run-auroch": (project) => {
    const C = caseItem.copy;
    const I = (name, alt) => workImage(`auroch-${name}.jpg`, alt);
    const S = caseItem.split;
    const F = caseItem.full;
    return [
      S(C("01 / Museum Game", "The Challenge", `<p>Visitors often face cognitive overload from the sheer amount of museum data and struggle to see its relevance today. We wanted to answer the question: why should I care about a big cow from 8,000 years ago?</p><p>To build cognitive and emotional engagement, we developed a player transformation matrix.</p><p>My contribution included animal character concepts and modelling, gameplay and cover design.</p>`), I("transformation", "Run Little Auroch player transformation matrix")),
      S(I("baby", "Juvenile auroch character concept"), C("02 / Character Design", "From Fossils to Form", `<p>I used real bone structures and scientific illustrations provided by the Danish National Museum. I reconstructed a juvenile calf and adult mother, mapping proportions and horn curvature from close evolutionary relatives and fossil records.</p>`)),
      S(C("02 / Character Design", "Mother & Calf", `<p>A cow's coat changes as it grows, but strongly different colors could mislead players. We chose related colors for both final models to keep the relationship clear.</p>`), I("mom", "Adult auroch character concept")),
      F(I("models", "Run Little Auroch final animal models")),
      S(I("dog", "Prehistoric dog model"), C("03 / Supporting Character", "The Dog", `<p>Based on Lasse's description of a dog resembling today's Siberian Husky, I reshaped a German Shepherd model provided by a teammate. I changed its proportions, muscle blocks and chest depth, then repainted the textures.</p>`)),
      F(I("poster", "Run Little Auroch final cover"))
    ];
  },

  "tea-horizon": (project) => {
    const C = caseItem.copy;
    const I = (number, alt) => workImage(`tea-${number}.jpg`, alt);
    const S = caseItem.split;
    const F = caseItem.full;
    return [
      S(C("01 / Project", "A Fictional Tea Ecology", `<p>As the Lead Designer and Art Director for this project, I led production from initial concept to final asset integration.</p><p><strong>Creative Direction & Game Design:</strong> I defined the worldbuilding and narrative framework, core game mechanics, numerical design and user research, connecting the cultural themes to the gameplay loop.</p><p><strong>Systemic Documentation:</strong> I authored the design documentation and interaction flows, linking the artistic direction to the game's systems.</p>`), I(2, "Tea Horizon game environment and tea garden path")),
      F(I(10, "Tea Horizon title artwork")),
      F(C("02 / Research", "Tea Culture in Yunnan", `<p>The project uses pixel art to depict tea garden ecology in Yunnan within a fictional world, incorporating architecture from the Bai, Tibetan and Yi communities. This board records research into tea varieties and growing regions.</p>`)),
      F(I(3, "Tea Horizon research board about tea varieties")),
      S(C("03 / Visual", "Color Palette", `<p>This board shows the color references used to distinguish the architectural and cultural influences in the game.</p>`), I(5, "Tea Horizon color studies for the game's communities")),
      S(I(6, "Tea Horizon Visual board showing the architecture and its references"), C("03 / Visual", "Architecture & Pixel Art", `<p><strong>Art Direction & Concept Art:</strong> I established the project's visual identity and drew architectural concepts inspired by Bai and Dai traditions, translating traditional motifs into functional game assets.</p><p>The Visual board places the building's roof, ornament and window references beside the pixel-art result.</p>`)),
      F(C("04 / Art & Design", "From References to Buildings", `<p><strong>Environmental & Architectural Production:</strong> I painted the primary buildings and environmental scenes, managing their composition to keep the world visually consistent.</p>`)),
      F(I(7, "Tea Horizon art and architecture concept board")),
      F(C("05 / Environment", "Tile-Based World", `<p><strong>Technical Art & Material Design:</strong> I developed tile-based textures and environment sprites, creating reusable maps that retained visual detail while meeting the game's performance constraints.</p>`)),
      F(I(8, "Tea Horizon environment tiles and map-planning board")),
      F(C("06 / Technical Art", "Materials & VFX Tests", `<p>I explored diffuse and normal-map approaches for the buildings and props. The normal-map tests were not used in the final game because of technical constraints, but the board records that material study alongside the finished assets.</p>`)),
      F(I(9, "Tea Horizon Technical VFX and normal-map experiments"))
    ];
  },

  croquis: (project) => {
    const C = caseItem.copy;
    const I = caseItem.image;
    const S = caseItem.split;
    const F = caseItem.full;
    const blocks = [
      F(C("01 / Practice", "Figure Drawing", `<p>${project.sections[0].text}</p><p>${project.sections[1].text}</p>`)),
      S(I(project.images[0], "Croquis horizontal drawing study"), I(project.images[9], "Croquis horizontal drawing study"))
    ];
    const portraits = project.images.filter((_, index) => index !== 0 && index !== 9);
    for (let i = 0; i < portraits.length; i += 2) {
      const left = I(portraits[i], `Croquis figure study ${i + 1}`);
      const right = portraits[i + 1] && I(portraits[i + 1], `Croquis figure study ${i + 2}`);
      blocks.push(right ? S(left, right) : F(left));
    }
    return blocks;
  },

  other: (project) => {
    const C = caseItem.copy;
    const I = caseItem.image;
    const S = caseItem.split;
    const F = caseItem.full;
    const a = project.images;
    return [
      S(C("01 / BOF Music Covers", "Cover Archive", `<p>${project.intro}</p><p>${project.sections[0].text}</p><p>${project.sections[2].text}</p>`), I(a[0], "ADiOS music cover")),
      S(I(a[1], "Nomanda music cover"), I(a[5], "Phantoms music cover")),
      S(C("02 / Visual Archive", "Across Media", `<p>${project.sections[1].text}</p>`), I(a[2], "Hikvision EZVIZ IP figure")),
      S(I(a[3], "Return visual work"), I(a[4], "Additional visual archive work"))
    ];
  },

  skyward: (project) => {
    const C = caseItem.copy;
    const I = caseItem.image;
    const S = caseItem.split;
    const F = caseItem.full;
    const blocks = [
      S(C("01 / Project", "Skyward Legacy", `<p>${project.sections[0].text}</p>`), I(project.images[1], "Skyward Legacy project view")),
      S(I(project.images[2], "Skyward Legacy visual design"), C("02 / Visual Direction", "Fantasy Atmosphere", `<p>${project.sections[1].text}</p>`)),
      S(C("03 / My Contribution", "World, Interface & Presentation", `<p>${project.sections[2].text}</p>`), I(project.images[3], "Skyward Legacy interface exploration"))
    ];
    for (let i = 0; i < project.concepts.length; i += 2) {
      blocks.push(S(I(project.concepts[i], `Skyward Legacy concept ${i + 1}`), I(project.concepts[i + 1], `Skyward Legacy concept ${i + 2}`)));
    }
    for (const [index, src] of project.images.slice(4).entries()) {
      blocks.push(F(I(src, `Skyward Legacy project image ${index + 5}`)));
    }
    return blocks;
  },

  embrace: (project) => {
    const blocks = [caseItem.full(caseItem.copy("01 / Product Design", "EmbraceNest", `<p>${project.intro}</p>${project.sections.map((section) => `<p><strong>${section.title}:</strong> ${section.text}</p>`).join("")}`))];
    for (const [index, src] of project.images.slice(1).entries()) {
      blocks.push(caseItem.full(caseItem.image(src, `EmbraceNest presentation slide ${index + 2}`, "contain")));
    }
    return blocks;
  }
};

function getCaseBlocks(project) {
  return (caseStudyBlocks[project.id] || standardCaseBlocks)(project);
}
