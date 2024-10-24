import cv2
import numpy as np

def detect_hand(frame):
    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Apply Gaussian blur to reduce noise
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Threshold the image to get binary image
    _, thresh = cv2.threshold(blur, 70, 255, cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
    
    # Find contours
    contours, _ = cv2.findContours(thresh.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    # Find the largest contour (hand)
    if len(contours) > 0:
        max_contour = max(contours, key=cv2.contourArea)
        
        # Approximate the contour to a polygon
        epsilon = 0.0005 * cv2.arcLength(max_contour, True)
        approx = cv2.approxPolyDP(max_contour, epsilon, True)
        
        # Convex hull around hand
        hull = cv2.convexHull(approx, returnPoints=False)
        
        # Draw contours and hull
        defects = cv2.convexityDefects(approx, hull)
        
        # Use defects to determine hand gesture (you can add your unique ideas here)
        if defects is not None:
            count_defects = 0
            for i in range(defects.shape[0]):
                s, e, f, _ = defects[i, 0]
                start = tuple(approx[s][0])
                end = tuple(approx[e][0])
                far = tuple(approx[f][0])
                cv2.line(frame, start, end, [0, 255, 0], 2)
                cv2.circle(frame, far, 5, [0, 0, 255], -1)
                
                # Convert far point to integers
                far = (int(far[0]), int(far[1]))
                
                # Check pointPolygonTest
                d = cv2.pointPolygonTest(max_contour, far, True)
                if d > 0:
                    count_defects += 1
            if count_defects == 1:
                cv2.putText(frame, "This is 2", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 2, (0,0,255), 2)
            else:
                cv2.putText(frame, "This is not 2", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 2, (0,0,255), 2)

    return frame

cap = cv2.VideoCapture(0)

while(True):
    ret, frame = cap.read()
    if ret:
        frame = detect_hand(frame)
        cv2.imshow('Hand Gesture Recognition', frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()