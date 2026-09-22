import math
import random

width = 300
height = 300
num_nodes = 40
connection_radius = 85

random.seed(42) # For reproducibility and good layout

nodes = []
for i in range(num_nodes):
    nodes.append((random.uniform(0, width), random.uniform(0, height)))

svg_paths = []

for i in range(num_nodes):
    x1, y1 = nodes[i]
    for j in range(i + 1, num_nodes):
        x2, y2 = nodes[j]
        
        # Check all 9 wrap-around positions to find the shortest distance
        min_dist = float('inf')
        best_x2, best_y2 = x2, y2
        
        for dx in [-width, 0, width]:
            for dy in [-height, 0, height]:
                nx2 = x2 + dx
                ny2 = y2 + dy
                dist = math.hypot(x1 - nx2, y1 - ny2)
                if dist < min_dist:
                    min_dist = dist
                    best_x2 = nx2
                    best_y2 = ny2
        
        if min_dist < connection_radius:
            # We add the line. To make it truly seamless, if the line crosses a boundary, 
            # we should also draw it on the other side. 
            # The easiest way to make an SVG pattern seamless is to just render 
            # 9 copies of the entire graph (a 3x3 grid) into a viewBox of the center tile.
            pass

# Better approach for seamless SVG: just draw the nodes and lines, and then <use> them in a 3x3 grid!
svg = f'''<svg xmlns='http://www.w3.org/2000/svg' width='{width}' height='{height}' viewBox='0 0 {width} {height}'>
  <defs>
    <g id='network'>
'''

for i in range(num_nodes):
    x1, y1 = nodes[i]
    # Draw node
    dur = random.uniform(2, 5)
    r = random.uniform(1.5, 3.5)
    svg += f"      <circle cx='{x1:.1f}' cy='{y1:.1f}' r='{r:.1f}' fill='#fa1144'>\n"
    svg += f"        <animate attributeName='opacity' values='0.3;1;0.3' dur='{dur:.1f}s' repeatCount='indefinite'/>\n"
    svg += f"      </circle>\n"
    
    for j in range(i + 1, num_nodes):
        x2, y2 = nodes[j]
        
        for dx in [-width, 0, width]:
            for dy in [-height, 0, height]:
                nx2 = x2 + dx
                ny2 = y2 + dy
                dist = math.hypot(x1 - nx2, y1 - ny2)
                if dist < connection_radius:
                    opacity = 1 - (dist / connection_radius)
                    # We can use opacity to fade out long lines
                    svg += f"      <line x1='{x1:.1f}' y1='{y1:.1f}' x2='{nx2:.1f}' y2='{ny2:.1f}' stroke='#fa1144' stroke-width='0.8' opacity='{opacity:.2f}'/>\n"

svg += '''    </g>
  </defs>
  <g opacity='0.25'>
    <use href='#network' x='-300' y='-300'/>
    <use href='#network' x='0' y='-300'/>
    <use href='#network' x='300' y='-300'/>
    <use href='#network' x='-300' y='0'/>
    <use href='#network' x='0' y='0'/>
    <use href='#network' x='300' y='0'/>
    <use href='#network' x='-300' y='300'/>
    <use href='#network' x='0' y='300'/>
    <use href='#network' x='300' y='300'/>
  </g>
</svg>'''

with open('img/bg/network.svg', 'w') as f:
    f.write(svg)
