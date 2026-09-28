/* ============================================================
   THEMES — the six pairs, as palettes the whole site can wear.

   Each screenshot gives two colours: a saturated one and a
   ground. The site needs three roles -- ink (the dark ground),
   paper (the light ground) and accent (the only saturated
   colour). So for every pair, the two given colours are assigned
   to whichever roles they actually fit by lightness, and the
   third is DERIVED from the pair rather than invented: it takes
   the hue of the brand colour and is pushed to the lightness the
   missing role needs.

   Nothing here is a hex I chose for taste. Every value is either
   one the owner supplied or a computed relative of one.
   ============================================================ */

function hexToRgb(hex){
  let h = hex.replace('#','');
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
function rgbToHsl(r,g,b){
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b), l=(max+min)/2;
  if(max===min) return [0,0,l];
  const d=max-min, s=l>0.5 ? d/(2-max-min) : d/(max+min);
  let h;
  if(max===r) h=((g-b)/d+(g<b?6:0));
  else if(max===g) h=(b-r)/d+2;
  else h=(r-g)/d+4;
  return [h*60, s, l];
}
function hslToHex(h,s,l){
  h=((h%360)+360)%360;
  const c=(1-Math.abs(2*l-1))*s, x=c*(1-Math.abs(((h/60)%2)-1)), m=l-c/2;
  let v;
  if(h<60)v=[c,x,0]; else if(h<120)v=[x,c,0]; else if(h<180)v=[0,c,x];
  else if(h<240)v=[0,x,c]; else if(h<300)v=[x,0,c]; else v=[c,0,x];
  return '#'+v.map(n=>Math.round((n+m)*255).toString(16).padStart(2,'0')).join('');
}
const hsl = hex => rgbToHsl(...hexToRgb(hex));

/* Build a palette from the supplied pair.
     brand  the saturated colour from the card
     ground the other colour from the card
   Whichever of the two is dark becomes ink, whichever is light
   becomes paper, and the missing one is derived from `brand`. */
function palette({id, name, brand, ground, accent}){
  const [bh, bs, bl] = hsl(brand);
  const [gh, gs, gl] = hsl(ground);

  let ink, paper;
  if (gl < 0.4){
    /* the ground is the dark one: it is the ink, and paper is derived */
    ink = ground; paper = hslToHex(bh, Math.min(bs*0.10, 0.10), 0.965);
  } else if (bl < 0.34){
    /* both given colours are usable as grounds -- the brand is dark
       enough to be the ink itself, so use it rather than an
       approximation of it (Emerald Ink is exactly this case) */
    ink = brand; paper = ground;
  } else {
    paper = ground; ink = hslToHex(bh, Math.min(bs*0.55, 0.55), 0.085);
  }

  /* The accent is the brand colour unless it is too dark to sit
     as a fill under dark type, in which case it is the same hue
     lifted to a usable lightness. */
  const acc = accent || (bl < 0.30 ? hslToHex(bh, bs, 0.38) : brand);

  const [ih, is] = hsl(ink);
  const [ph, ps] = hsl(paper);
  const [ah, as] = hsl(acc);

  return {
    id, name, ink, paper, accent: acc,
    source: { brand, ground },
    families: {
      ink:    { h: ih, s: Math.min(is, 0.45) },
      paper:  { h: ph, s: Math.min(ps, 0.30) },
      accent: { h: ah, s: Math.max(as, 0.55) }
    },
    keep: [ink, paper, acc].map(c => c.toLowerCase())
  };
}

export const THEMES = [
  palette({ id:'signal-blue',  name:'Signal Blue / Porcelain',      brand:'#0057FF', ground:'#F8F7F4' }),
  palette({ id:'royal-iris',   name:'Butter Yellow / Royal Iris',   brand:'#FFF275', ground:'#3A0CA3' }),
  palette({ id:'emerald-ink',  name:'Emerald Ink / Champagne',      brand:'#064E3B', ground:'#F8E7C9', accent:'#0B7A5C' }),
  palette({ id:'dragonfruit',  name:'Dragonfruit / Night Violet',   brand:'#FF4696', ground:'#1E1033' }),
  palette({ id:'ultra-violet', name:'Ultra Violet / Soft Apricot',  brand:'#6A00F4', ground:'#FFD6A5' }),
  palette({ id:'lime-spark',   name:'Lime Spark / Graphite',        brand:'#B6FF2E', ground:'#23262F' })
];

/* The token block that rethemes the site. Appended after every
   other sheet, so it settles --ink, --paper and the accent roles
   the components read from. Values are literal, and each is in
   the palette's `keep` list, so the remap leaves them alone. */
export function tokenBlock(t){
  return `
/* ${t.name} */
:root{
  --ink:${t.ink};--ink-2:${t.ink};--ink-3:${t.ink};
  --paper:${t.paper};
  --hivis:${t.accent};--hivis-deep:${t.accent};
  --accent:${t.accent};
  --surface:${t.paper};
  --ex-paper:${t.paper};
}
:root[data-theme="dark"]{--paper:${t.paper};--accent:${t.accent}}
body{background:${t.paper}}
.en-closing{
  background:radial-gradient(118% 120% at 86% 10%,${t.accent}2b,transparent 62%),
             linear-gradient(158deg,${t.ink} 0%,${t.ink} 68%)!important;
}
.sg-field,.ex-hero,.en-hero{--ink-fieldbg:${t.ink}}
`;
}
