import clr
clr.AddReference('System.Drawing')
from System.Drawing import Bitmap, Color, ImageFormat

img_path = 'img/rocky-404.jpg'
out_path = 'img/rocky-404.png'

# Load image
bmp = Bitmap(img_path)

# Make black transparent
bmp.MakeTransparent(Color.Black)

# Save as PNG
bmp.Save(out_path, ImageFormat.Png)
