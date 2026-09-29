import fs from 'node:fs/promises';

// Public-domain Natural Earth 1:110m land. No location represents a customer.
const land=JSON.parse(await fs.readFile(new URL('./data/ne_110m_land.geojson',import.meta.url),'utf8'));
const rings=land.features.flatMap(f=>f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates);
function inside(x,y,ring){let yes=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])yes=!yes}return yes}
const polys=rings.map(r=>({r,minX:Math.min(...r[0].map(p=>p[0])),maxX:Math.max(...r[0].map(p=>p[0])),minY:Math.min(...r[0].map(p=>p[1])),maxY:Math.max(...r[0].map(p=>p[1]))}));
const isLand=(x,y)=>polys.some(p=>x>=p.minX&&x<=p.maxX&&y>=p.minY&&y<=p.maxY&&inside(x,y,p.r[0])&&!p.r.slice(1).some(r=>inside(x,y,r)));
const rad=Math.PI/180;
const points=[];
for(let lat=-76;lat<83;lat+=1.45){const step=1.45/Math.cos(lat*rad);for(let lon=-180;lon<180;lon+=step){const solid=isLand(lon,lat);if(!solid&&Math.round((lat+76)/1.45)%2)continue;if(!solid&&Math.round((lon+180)/step)%2)continue;const a=lat*rad,b=lon*rad;points.push([Math.cos(a)*Math.sin(b),Math.sin(a),Math.cos(a)*Math.cos(b),solid?1:0].map(n=>Number(n.toFixed(5))))}}
await fs.writeFile(new URL('../assets/globe-data.json',import.meta.url),JSON.stringify(points.flat()));
// Use exactly the same geometry for first paint, no JavaScript and no WebGL.
function project([x,y,z],yaw=-.95){const xx=x*Math.cos(yaw)+z*Math.sin(yaw),zz=z*Math.cos(yaw)-x*Math.sin(yaw);return [xx,y*Math.cos(.17)-zz*Math.sin(.17),y*Math.sin(.17)+zz*Math.cos(.17)]}
const dots=points.map(p=>{const [x,y,z]=project(p);if(z<0)return '';return `<circle cx="${(500+x*380).toFixed(1)}" cy="${(500-y*380).toFixed(1)}" r="${p[3]?1.35:.7}" fill="${p[3]?'#f4f1ea':'#6c7275'}" opacity="${((p[3]?.25:.1)+z*(p[3]?.65:.25)).toFixed(2)}"/>`}).join('');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a"><stop offset=".79" stop-color="#ffd400" stop-opacity="0"/><stop offset=".9" stop-color="#ffd400" stop-opacity=".1"/><stop offset=".96" stop-color="#ffd400" stop-opacity=".3"/><stop offset="1" stop-color="#ffd400" stop-opacity="0"/></radialGradient><radialGradient id="b" cx=".7" cy=".18" r=".85"><stop stop-color="#34321d"/><stop offset=".65" stop-color="#0e1820"/><stop offset="1" stop-color="#080e13"/></radialGradient><linearGradient id="c" x2=".4" y2="1"><stop stop-color="#ffd400"/><stop offset=".5" stop-color="#f4f1ea" stop-opacity=".2"/><stop offset="1" stop-color="#f4f1ea" stop-opacity=".6"/></linearGradient></defs><circle cx="500" cy="500" r="418" fill="url(#a)"/><circle cx="500" cy="500" r="380" fill="url(#b)" stroke="url(#c)" stroke-width="2"/>${dots}<g fill="none" stroke="#ffd400" stroke-width="1.3" opacity=".6"><path d="M283 250Q780 58 804 467"/><path d="M427 401Q825 213 701 745"/><path d="M283 250Q52 578 516 719"/></g><g fill="#ffd400"><circle cx="283" cy="250" r="4"/><circle cx="804" cy="467" r="4"/><circle cx="427" cy="401" r="4"/><circle cx="701" cy="745" r="4"/></g></svg>`;
await fs.writeFile(new URL('../assets/images/business-globe.svg',import.meta.url),svg);
console.log(`Globe: ${points.length} points, self-hosted data and SVG fallback.`);
