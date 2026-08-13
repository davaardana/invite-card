from PIL import Image, ImageFilter

def process_heart_image_hd(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        r, g, b, a = item
        
        # Strictly identify red heart pixels vs grey/white halo background
        # Red pixels have high R relative to G and B, and G/B are not too bright
        is_red = (r > 100) and (r - g > 30) and (r - b > 30)
        
        if is_red:
            # Calculate alpha based on red dominance so soft edges fade cleanly to 100% transparent
            diff = (r - max(g, b))
            alpha_val = min(255, int(diff * 2.5))
            newData.append((r, g, b, alpha_val))
        else:
            # Complete transparent pixel for background
            newData.append((0, 0, 0, 0))

    img.putdata(newData)
    img.save(output_path, "PNG")
    print("HD background removal completed!")

if __name__ == "__main__":
    src = r"c:\Users\acer\Documents\bila\stippled_red_heart.png"
    dest = r"c:\Users\acer\Documents\bila\stippled_red_heart.png"
    process_heart_image_hd(src, dest)
