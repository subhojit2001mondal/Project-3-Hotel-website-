import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

const WIDTH = 1024;
const HEIGHT = 1024;
const CX = WIDTH / 2;
const CY = HEIGHT / 2;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// Enable high quality image rendering
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

// -------------------------------------------------------------
// 1. BACKGROUND: Deep Emerald Forest Green Radial Circle
// -------------------------------------------------------------
const R_OUTER = 475;

// Outer shadow behind the entire medallion
ctx.save();
ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
ctx.shadowBlur = 30;
ctx.shadowOffsetY = 15;
ctx.beginPath();
ctx.arc(CX, CY, R_OUTER, 0, Math.PI * 2);
ctx.fillStyle = '#02130a';
ctx.fill();
ctx.restore();

// Deep Forest Green Radial Gradient
const bgGrad = ctx.createRadialGradient(CX - 30, CY - 50, 40, CX, CY, R_OUTER);
bgGrad.addColorStop(0, '#134e2c');    // rich emerald green light
bgGrad.addColorStop(0.35, '#0b381e'); // deep forest green
bgGrad.addColorStop(0.7, '#052312');  // dark jade
bgGrad.addColorStop(1, '#02140a');    // deep midnight green edge

ctx.beginPath();
ctx.arc(CX, CY, R_OUTER, 0, Math.PI * 2);
ctx.fillStyle = bgGrad;
ctx.fill();

// -------------------------------------------------------------
// 2. METALLIC GOLD OUTER DOUBLE RIMS (3D Bevel)
// -------------------------------------------------------------
function createGoldLinearGradient(x1, y1, x2, y2) {
  const g = ctx.createLinearGradient(x1, y1, x2, y2);
  g.addColorStop(0.00, '#fff4b8'); // Specular light highlight
  g.addColorStop(0.15, '#e8be48'); // Rich warm gold
  g.addColorStop(0.32, '#a5741e'); // Deep bronze shade
  g.addColorStop(0.50, '#fdf1ad'); // Bright reflective band
  g.addColorStop(0.70, '#c7922d'); // Warm gold midtone
  g.addColorStop(0.88, '#8e6114'); // Dark shadow depth
  g.addColorStop(1.00, '#ffec9e'); // Edge gleam
  return g;
}

const goldOuter = createGoldLinearGradient(100, 80, 924, 944);
const goldInner = createGoldLinearGradient(924, 80, 100, 944);

// Outer Thick Beveled Ring
ctx.save();
ctx.lineWidth = 14;
ctx.strokeStyle = goldOuter;
ctx.beginPath();
ctx.arc(CX, CY, 465, 0, Math.PI * 2);
ctx.stroke();

// Subtle highlight ridge on outer ring
ctx.lineWidth = 2.5;
ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
ctx.beginPath();
ctx.arc(CX, CY, 470, -Math.PI * 0.8, Math.PI * 0.1);
ctx.stroke();

// Dark groove separator
ctx.lineWidth = 4;
ctx.strokeStyle = '#021209';
ctx.beginPath();
ctx.arc(CX, CY, 452, 0, Math.PI * 2);
ctx.stroke();

// Inner Delicate Gold Ring
ctx.lineWidth = 5;
ctx.strokeStyle = goldInner;
ctx.beginPath();
ctx.arc(CX, CY, 444, 0, Math.PI * 2);
ctx.stroke();

// Inset Hairline Accent
ctx.lineWidth = 1.5;
ctx.strokeStyle = 'rgba(253, 241, 173, 0.6)';
ctx.beginPath();
ctx.arc(CX, CY, 436, 0, Math.PI * 2);
ctx.stroke();
ctx.restore();

// -------------------------------------------------------------
// 3. THE ICONIC GOLDEN "P" MONOGRAM WITH BUILDINGS & LEAVES
// -------------------------------------------------------------
ctx.save();

// Soft drop shadow for 3D depth of monogram
ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
ctx.shadowBlur = 18;
ctx.shadowOffsetY = 8;

const goldP = createGoldLinearGradient(250, 120, 800, 600);

// --- A. Modern High-Rise Buildings Inside the Loop ---
ctx.save();
ctx.shadowColor = 'transparent'; // No double shadow on fine building lines

// Building 1 (Left - medium angled roof)
const b1Grad = ctx.createLinearGradient(500, 200, 560, 360);
b1Grad.addColorStop(0, '#fcf0ab');
b1Grad.addColorStop(1, '#9e7021');

ctx.beginPath();
ctx.moveTo(500, 350);
ctx.lineTo(500, 235);
ctx.lineTo(555, 200);
ctx.lineTo(555, 350);
ctx.closePath();
ctx.strokeStyle = goldP;
ctx.lineWidth = 4;
ctx.stroke();

// Windows for Building 1 (vertical dashed lines)
ctx.beginPath();
ctx.setLineDash([8, 8]);
ctx.lineWidth = 2.5;
ctx.strokeStyle = '#fae388';
ctx.moveTo(518, 245);
ctx.lineTo(518, 345);
ctx.moveTo(538, 232);
ctx.lineTo(538, 345);
ctx.stroke();
ctx.setLineDash([]); // Reset

// Building 2 (Center - Tallest Skyscraper with Angled Peak)
ctx.beginPath();
ctx.moveTo(555, 355);
ctx.lineTo(555, 195);
ctx.lineTo(615, 145);
ctx.lineTo(615, 355);
ctx.closePath();
ctx.strokeStyle = goldP;
ctx.lineWidth = 4.5;
ctx.stroke();

// Windows for Building 2
ctx.beginPath();
ctx.setLineDash([9, 7]);
ctx.lineWidth = 3;
ctx.strokeStyle = '#fff2b3';
ctx.moveTo(575, 195);
ctx.lineTo(575, 350);
ctx.moveTo(595, 178);
ctx.lineTo(595, 350);
ctx.stroke();
ctx.setLineDash([]);

// Building 3 (Right - Tiered Tower)
ctx.beginPath();
ctx.moveTo(615, 360);
ctx.lineTo(615, 230);
ctx.lineTo(665, 260);
ctx.lineTo(665, 365);
ctx.closePath();
ctx.strokeStyle = goldP;
ctx.lineWidth = 4;
ctx.stroke();

// Windows for Building 3
ctx.beginPath();
ctx.setLineDash([8, 8]);
ctx.lineWidth = 2.5;
ctx.strokeStyle = '#fae388';
ctx.moveTo(632, 245);
ctx.lineTo(632, 355);
ctx.moveTo(650, 258);
ctx.lineTo(650, 355);
ctx.stroke();
ctx.setLineDash([]);
ctx.restore();

// --- B. The Grand "P" Sculpted Body & Ribbons ---
ctx.fillStyle = goldP;
ctx.strokeStyle = '#fffae0';
ctx.lineWidth = 1.5;

// Main Stem and Serifs of "P"
ctx.beginPath();
// Top serif bar
ctx.moveTo(320, 140);
ctx.lineTo(415, 140);
ctx.lineTo(415, 155);
// Inner bracket to stem
ctx.quadraticCurveTo(400, 160, 395, 185);
ctx.lineTo(395, 520);
// Bottom right junction
ctx.lineTo(410, 530);
ctx.lineTo(410, 545);
// Bottom serif base
ctx.lineTo(315, 545);
ctx.lineTo(315, 530);
ctx.lineTo(345, 520);
// Upward left stem
ctx.lineTo(345, 185);
ctx.quadraticCurveTo(340, 160, 320, 155);
ctx.closePath();
ctx.fill();
ctx.stroke();

// Top Arch & Outer Bowl of "P"
ctx.beginPath();
ctx.moveTo(395, 155);
// Top curve of loop
ctx.bezierCurveTo(460, 125, 680, 120, 740, 220);
// Right outer curve of loop
ctx.bezierCurveTo(795, 310, 745, 415, 630, 425);
// Sweeping lower ribbon tapering under
ctx.bezierCurveTo(550, 430, 450, 380, 395, 320);
// Inner lower contour of ribbon
ctx.bezierCurveTo(440, 350, 540, 385, 615, 375);
// Inner arch returning up
ctx.bezierCurveTo(695, 360, 725, 290, 680, 220);
ctx.bezierCurveTo(635, 155, 480, 165, 395, 195);
ctx.closePath();
ctx.fill();
ctx.stroke();

// Lower Crescent Wave of the "P" Bowl
ctx.beginPath();
ctx.moveTo(395, 360);
ctx.bezierCurveTo(470, 420, 580, 470, 685, 430);
ctx.bezierCurveTo(600, 490, 470, 470, 395, 410);
ctx.closePath();
ctx.fill();
ctx.stroke();

// Inner highlight ribbon swoop
const ribbonGrad = ctx.createLinearGradient(400, 280, 650, 450);
ribbonGrad.addColorStop(0, '#fff4b8');
ribbonGrad.addColorStop(0.5, '#e5b746');
ribbonGrad.addColorStop(1, '#9a6c1a');

ctx.beginPath();
ctx.moveTo(395, 260);
ctx.bezierCurveTo(470, 310, 580, 380, 670, 520);
ctx.bezierCurveTo(590, 460, 490, 370, 395, 310);
ctx.closePath();
ctx.fillStyle = ribbonGrad;
ctx.fill();

// --- C. Three Botanical Laurel Leaves ---
function drawLeaf(baseX, baseY, tipX, tipY, ctrl1X, ctrl1Y, ctrl2X, ctrl2Y) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(baseX, baseY);
  ctx.bezierCurveTo(ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, tipX, tipY);
  ctx.bezierCurveTo(ctrl2X + (baseX - ctrl1X) * 0.4, ctrl2Y + (baseY - ctrl1Y) * 0.4, ctrl1X * 0.9, ctrl1Y * 1.1, baseX, baseY);
  ctx.closePath();
  ctx.fillStyle = goldP;
  ctx.fill();
  ctx.strokeStyle = '#fff5be';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // Central Midrib Vein
  ctx.beginPath();
  ctx.moveTo(baseX, baseY);
  ctx.quadraticCurveTo((baseX + tipX) / 2, (baseY + tipY) / 2, tipX, tipY);
  ctx.strokeStyle = '#052613';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

// Leaf 1: Top-left leaf pointing up & left
drawLeaf(375, 410, 305, 340, 325, 395, 300, 360);

// Leaf 2: Middle leaf pointing left
drawLeaf(375, 435, 280, 420, 315, 405, 285, 415);

// Leaf 3: Lower-left leaf pointing down & left
drawLeaf(375, 455, 325, 515, 335, 475, 315, 500);

// Leaf connection stem
ctx.beginPath();
ctx.moveTo(375, 400);
ctx.quadraticCurveTo(385, 440, 375, 470);
ctx.strokeStyle = goldP;
ctx.lineWidth = 5;
ctx.stroke();

ctx.restore(); // End of Monogram shadow save

// -------------------------------------------------------------
// 4. "PARIJAI" TYPOGRAPHY (Grand Roman Serif 3D Gold)
// -------------------------------------------------------------
ctx.save();
ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
ctx.shadowBlur = 16;
ctx.shadowOffsetY = 8;

const goldText = createGoldLinearGradient(200, 630, 824, 710);
ctx.fillStyle = goldText;
ctx.textAlign = 'center';
ctx.textBaseline = 'alphabetic';

// Use regal serif styling
ctx.font = 'bold 118px "Cinzel", "Times New Roman", "Playfair Display", Georgia, serif';

// Letter spacing simulation
const word = 'PARIJAI';
const startY = 705;

// Draw text with bevel stroke
ctx.fillText(word, CX, startY);

// Highlight overlay stroke for 3D bevel sheen
ctx.lineWidth = 2;
ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
ctx.strokeText(word, CX, startY - 2);

ctx.restore();

// -------------------------------------------------------------
// 5. "— GROUP OF HOTELS —"
// -------------------------------------------------------------
ctx.save();
ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
ctx.shadowBlur = 10;
ctx.shadowOffsetY = 4;

const subtitleY = 768;
const goldSub = createGoldLinearGradient(160, subtitleY, 864, subtitleY);
ctx.fillStyle = goldSub;
ctx.strokeStyle = goldSub;

// Left Rule Line
ctx.lineWidth = 4;
ctx.lineCap = 'round';
ctx.beginPath();
ctx.moveTo(170, subtitleY - 6);
ctx.lineTo(250, subtitleY - 6);
ctx.stroke();

// Subtitle Text
ctx.font = 'bold 27px "Plus Jakarta Sans", "Montserrat", Arial, sans-serif';
ctx.textAlign = 'center';
ctx.letterSpacing = '10px';
ctx.fillText('GROUP OF HOTELS', CX, subtitleY);

// Right Rule Line
ctx.beginPath();
ctx.moveTo(774, subtitleY - 6);
ctx.lineTo(854, subtitleY - 6);
ctx.stroke();
ctx.restore();

// -------------------------------------------------------------
// 6. BOTTOM ORNATE CREST & FLEUR-DE-LIS FLOURISH
// -------------------------------------------------------------
ctx.save();
ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
ctx.shadowBlur = 12;
ctx.shadowOffsetY = 5;

const crestY = 828;
const goldCrest = createGoldLinearGradient(CX - 150, crestY, CX + 150, crestY + 40);
ctx.fillStyle = goldCrest;
ctx.strokeStyle = goldCrest;

// Center Fleur-de-lis Crest
ctx.beginPath();
// Central upright petal
ctx.moveTo(CX, crestY - 32);
ctx.bezierCurveTo(CX - 10, crestY - 14, CX - 8, crestY - 4, CX, crestY + 6);
ctx.bezierCurveTo(CX + 8, crestY - 4, CX + 10, crestY - 14, CX, crestY - 32);
ctx.fill();

// Left curving petal
ctx.beginPath();
ctx.moveTo(CX, crestY + 2);
ctx.bezierCurveTo(CX - 18, crestY - 6, CX - 32, crestY - 20, CX - 28, crestY - 26);
ctx.bezierCurveTo(CX - 24, crestY - 16, CX - 14, crestY - 4, CX, crestY + 2);
ctx.fill();

// Right curving petal
ctx.beginPath();
ctx.moveTo(CX, crestY + 2);
ctx.bezierCurveTo(CX + 18, crestY - 6, CX + 32, crestY - 20, CX + 28, crestY - 26);
ctx.bezierCurveTo(CX + 24, crestY - 16, CX + 14, crestY - 4, CX, crestY + 2);
ctx.fill();

// Middle horizontal band ring
ctx.beginPath();
ctx.roundRect(CX - 14, crestY + 4, 28, 6, 3);
ctx.fill();

// Bottom drop finial point
ctx.beginPath();
ctx.moveTo(CX, crestY + 11);
ctx.lineTo(CX - 6, crestY + 17);
ctx.lineTo(CX, crestY + 24);
ctx.lineTo(CX + 6, crestY + 17);
ctx.closePath();
ctx.fill();

// Left Flourish Tendril
ctx.lineWidth = 3.5;
ctx.beginPath();
ctx.moveTo(CX - 40, crestY + 7);
ctx.lineTo(CX - 190, crestY + 7);
ctx.stroke();

// Left diamond accent
ctx.beginPath();
ctx.moveTo(CX - 110, crestY + 2);
ctx.lineTo(CX - 103, crestY + 7);
ctx.lineTo(CX - 110, crestY + 12);
ctx.lineTo(CX - 117, crestY + 7);
ctx.closePath();
ctx.fill();

// Right Flourish Tendril
ctx.beginPath();
ctx.moveTo(CX + 40, crestY + 7);
ctx.lineTo(CX + 190, crestY + 7);
ctx.stroke();

// Right diamond accent
ctx.beginPath();
ctx.moveTo(CX + 110, crestY + 2);
ctx.lineTo(CX + 117, crestY + 7);
ctx.lineTo(CX + 110, crestY + 12);
ctx.lineTo(CX + 103, crestY + 7);
ctx.closePath();
ctx.fill();

ctx.restore();

// -------------------------------------------------------------
// SAVE TO PUBLIC AND ASSETS
// -------------------------------------------------------------
const outBuffer = canvas.toBuffer('image/png');

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'parijai-logo.png'), outBuffer);
console.log('Successfully generated public/parijai-logo.png, size:', outBuffer.length, 'bytes');

// Also write a JPEG version matching the user's uploaded name
const jpegBuffer = canvas.toBuffer('image/jpeg');
fs.writeFileSync(path.join(publicDir, 'business-logo.jpeg'), jpegBuffer);
fs.writeFileSync(path.join(publicDir, 'business logo.jpeg'), jpegBuffer);
console.log('Successfully generated public/business-logo.jpeg and public/business logo.jpeg');
