# Plampilot
An innovative solution that redefines traditional navigation, allowing users to control their devices effortlessly through natural hand gestures. This cutting-edge technology can be seamlessly integrated by downloading the Chrome extension, PLampilot.

## Requirements
#### To run the program, the following libraries are required:<br>
  - OpenCV<br>
  - Mediapipe<br>
  - PyAutoGUI<br>
 
#### You can install these libraries using pip:<br>
  -  `pip install opencv-python mediapipe pyautogui`<br>
#### Or you can use the following command using pip to avoid any library version issue:<br>
  - `pip install -r requirements.txt`

## How to Run
You can downlaod the chrom extension with the name of  name PlamPilot or install the required libraries, run the `app.py` file in a Python environment with a webcam. The program will start capturing video from the webcam, and the mouse cursor can be controlled using the following hand gestures:

  - **Cursor moving**: Raise all fingers together and move your hand to move the cursor and control it.<br><br>

  - **Cursor freezing**: Close your thumb and Raise all other fingers together freeze the cursor and prevent it from moving.<br><br>

  - **Drag and drop**: Close your hand into a fist and move it around to drag and drop objects.<br><br>

  - **Right-click**: Raise your index finger while keeping the other fingers closed.<br><br>

  - **Left-click**: Raise your middle finger while keeping the other fingers closed.<br><br

  - **Double-click**: Raise your index and middle finger while keeping the other fingers closed.<br><br>

  - **Scroll up**: Move your index and middle finger towards the screen.<br><br>

  - **Scroll down**: Move your index and middle finger away from the screen.<br><br>

  - **Zoom in**: Pinch your index finger and thumb together.<br><br>

  - **Zoom out**: Spread your index finger and thumb apart.<br><br>


## Limitations
The program currently only supports controlling a single mouse cursor, and it may not work well in low-light conditions. It also doesn't support handling gestures of more than one hand, however this is easy to overcome, may be in comming commits of this project.

## License

This project is licensed under the Apache License 2.0. The Apache License 2.0 is a permissive license that allows you to freely use, modify, distribute, and sell the software.<br>

Feel free to use, modify and distribute the code as you see fit under the terms of the Apache License 2.0. For more information, please refer to the LICENSE file in the root of the project directory.
