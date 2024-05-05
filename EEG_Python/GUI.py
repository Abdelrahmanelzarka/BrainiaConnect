import time
from tkinter import Tk, Label, Canvas


characters = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ./,")

char_width = 90
char_height = 90
margin_x = 45
margin_y = 75

current_index = 0
selected = ""
flag = 0

def main():
  # Function to update selected character display
  def update_selected(txt):
    selected_label.config(text=f"Selected: {txt}")

  # Function to handle character selection on Enter
  # def on_enter(event):
  #   global selected
  #   if(characters[current_index - 1] == ','): selected += ', '
  #   elif(characters[current_index - 1] == '/'): selected = selected[:-1]
  #   else: selected += characters[current_index-1]
  #   update_selected(selected)
  #   reset()

  # Function to reset from the beginning
  def reset():
    global current_index
    current_index = 0
    canvas.delete("all")
    draw_characters()

  # Function to highlight the current character
  def highlight_character():
    global current_index, flag
    canvas.delete("highlight")  # Clear any previous highlights
    x = margin_x + (current_index % 10) * (char_width + margin_x)
    y = margin_y + int(current_index / 10) * (char_height + margin_y)
    if flag == 1:
      canvas.create_rectangle(x, y, x + char_width, y + char_height, fill="green", tags="highlight")
      canvas.create_text(x + char_width / 2, y + char_height / 2, text=characters[current_index], font=("Arial", 16))
    if flag == 1:
      window.after(500, highlight_character)
      current_index = (current_index + 1) % len(characters)
    else:
      window.after(500, highlight_character)
    flag = not flag

  # Function to draw a character on the canvas
  def draw_char(char, x, y):
    canvas.create_rectangle(x, y, x + char_width, y + char_height, fill="white")
    canvas.create_text(x + char_width/ 2, y + char_height / 2, text=char, font=("Arial", 16))

  def draw_characters():
    for i in range(4):
      for j in range(10):
        char_index = i * 10 + j
        x = margin_x + j * (char_width + margin_x)
        y = margin_y + i * (char_height + margin_y)
        draw_char(characters[char_index], x, y)

  # Initialize Tkinter window
  window = Tk()
  window.title("BraniaConnect")

  # Create label for selected character
  selected_label = Label(window, text="Selected: ", font=("Arial", 14))
  selected_label.grid(row=0, column=0)

  # Create canvas for character grid
  canvas = Canvas(window, width=1390, height=815, background='black')
  canvas.grid(row=1, column=0, columnspan=8)

  draw_characters()

  highlight_character()

  # Bind Enter key press to button click
  # window.bind("<Return>", on_enter)

  window.after(10000, window.destroy)
  window.mainloop()


if __name__ == '__main__':
    main()
