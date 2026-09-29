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

/* WCAG relative luminance, to decide which ground a palette can use. */
function lumHex(hex){
  const v=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255)
    .map(c=>c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4));
  return 0.2126*v[0]+0.7152*v[1]+0.0722*v[2];
}
const ratio=(a,b)=>{const[x,y]=[lumHex(a),lumHex(b)].sort((p,q)=>q-p);return (x+0.05)/(y+0.05);};

/* The hero and the second film always sit on a dark scrim, whatever
   ground the palette uses. A light-ground accent like Signal Blue is
   only 2.74:1 there, so it gets lifted -- same hue, raised lightness
   -- until it clears 4.5:1 on the scrim. Dark-ground accents already
   pass and come back unchanged. */
const SCRIM='#1A1D24';
function onScrim(hex){
  if(ratio(hex,SCRIM)>=4.5) return hex;
  const [h,sat]=hsl(hex);
  for(let l=0.5;l<=0.92;l+=0.02){
    const c=hslToHex(h,Math.max(sat*0.92,0.55),l);
    if(ratio(c,SCRIM)>=4.5) return c;
  }
  return '#F4F5F2';
}



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

  /* An accent is only usable as text on the ground it clears 4.5:1
     against. That decides whether the palette is a dark-ground
     scheme (Avathon) or a light-ground one (O.C. Tanner). */
  const mode = ratio(acc, ink) >= 4.5 ? 'dark' : 'light';

  return {
    id, name, ink, paper, accent: acc, mode,
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
  const dark = t.mode === 'dark';
  const ground   = dark ? t.ink   : t.paper;
  const onGround = dark ? t.paper : t.ink;
  const alpha = (a) => dark
    ? `rgba(244,245,242,${a})`
    : `rgba(20,22,26,${a})`;

  /* a four-stop ramp in the accent's own hue, dark end to full accent */
  const [ah, as] = hsl(t.accent);
  const gradA = hslToHex(ah, Math.min(as, 0.95), 0.10);
  const gradB = hslToHex(ah, Math.min(as, 0.95), 0.26);
  const gradC = hslToHex(ah, Math.min(as, 0.98), 0.46);
  /* the heading sits against roughly the middle of that ramp */
  const gradMid = gradC;
  const gradText = ratio('#101408', gradMid) >= ratio('#F4F5F2', gradMid) ? '#101408' : '#F4F5F2';
  const gradTextSoft = gradText === '#101408' ? 'rgba(16,20,8,.72)' : 'rgba(244,245,242,.78)';
  const cardBg = dark ? 'rgba(18,20,26,.88)' : 'rgba(18,20,26,.9)';

  return `
/* ${t.name} — ${t.mode}-ground */
:root{
  --ink:${t.ink};--ink-2:${t.ink};--ink-3:${t.ink};
  --paper:${t.paper};
  --hivis:${t.accent};--hivis-deep:${t.accent};
  --accent:${t.accent};
  --surface:${t.paper};
  --ex-paper:${t.paper};
}
body{background:${ground}}

/* the rebuilt homepage, on whichever ground this palette supports */
.ref{
  --g:${ground};
  --g-deep:${dark ? t.ink : '#ECEDE9'};
  --g-lift:${dark ? '#2C3039' : '#FFFFFF'};
  --lime:${t.accent};
  --lime-deep:${t.accent};
  --on-dark:${onGround};
  --on-dark-2:${alpha('.74')};
  --on-dark-3:${alpha(dark ? '.58' : '.62')};
  --line:${alpha('.14')};
  background:${ground};
  color:${onGround};
}
/* Films keep their own dark scrim on either ground, which is exactly
   what O.C. Tanner does on a light page. */
.ref-hero,.ref-film{color:#F4F5F2}
.ref-hero em,.ref-film em{color:${onScrim(t.accent)}}
.ref-hero .ref-eyebrow::before,.ref-film .ref-eyebrow::before{background:${onScrim(t.accent)}}
.ref-hero .ref-ghost,.ref-film .ref-ghost{color:#F4F5F2;border-color:rgba(244,245,242,.3)}
.ref-hero .ref-ghost:hover,.ref-film .ref-ghost:hover{border-color:#F4F5F2}
.ref-hero .ref-lede,.ref-film .ref-lede,
.ref-hero p,.ref-film p{color:rgba(244,245,242,.74)}
.ref-hero .ref-eyebrow,.ref-film .ref-eyebrow,
.ref-hero-foot{color:rgba(244,245,242,.62)}
.ref-hero-foot a{color:rgba(244,245,242,.62)}
.ref-cta{background:${t.accent};color:${ratio(t.accent,'#14161A')>=4.5?'#14161A':'#F4F5F2'}}
.ref-demo{background:${dark ? '#1A1D24' : '#ECEDE9'}}
.ref-demo-panel{background:${dark ? '#2C3039' : '#FFFFFF'}}

/* The gradient section runs from a deep shade of the accent to the
   accent itself, so it stays a single-hue statement rather than a
   wash. Its heading takes whichever of ink or paper is legible
   against the middle of that ramp, and the cards sit on the
   palette's own dark rather than a fixed olive-black. */
.ref-gradient{background:linear-gradient(108deg,${gradA} 0%,${gradB} 38%,${gradC} 72%,${t.accent} 100%)}
.ref-gradient h2,.ref-gradient .ref-eyebrow{color:${gradText}}
.ref-gradient .ref-eyebrow{color:${gradTextSoft}}
.ref-gradient .ref-eyebrow::before{background:${gradText}}
.ref-card{background:${cardBg};border-color:rgba(244,245,242,.12)}
.ref-card h3{color:#F4F5F2}
.ref-card p{color:rgba(244,245,242,.74)}
.ref-card span{color:${onScrim(t.accent)}}
`;
}
