#!/usr/bin/python
# coding=UTF-8

from Adafruit_PWM_Servo_Driver import PWM
import time

# Initialise the PWM device using the default address
#pwm = PWM(0x40)
# Note if you'd like more debug output you can instead run:
pwm = PWM(0x40, debug=True)

# HITEC HS-5645MG 300Hz
#CHANNEL_LEFT_ARM = 0
#SERVO_MIN_LEFT_ARM = 1000  # Min pulse length out of 4096 POSITION BASSE
#SERVO_MIDDLE_LEFT_ARM = 1500  # Middle pulse length out of 4096
#SERVO_MAX_LEFT_ARM = 2900  # Max pulse length out of 4096 POSITION HAUTE

# HITEC HS-5645MG 60Hz
#CHANNEL_LEFT_ARM = 0
#SERVO_MIN_LEFT_ARM = 200  # Min pulse length out of 4096 POSITION BASSE
#SERVO_MIDDLE_LEFT_ARM = 375  # Middle pulse length out of 4096
#SERVO_MAX_LEFT_ARM = 550  # Max pulse length out of 4096 POSITION HAUTE

# HITEC HS-5645MG 50Hz LEFT ARM
CHANNEL_LEFT_ARM = 0
SERVO_MIN_LEFT_ARM = 165  # Min pulse length out of 4096 POSITION BASSE
SERVO_MIDDLE_LEFT_ARM = 305  # Middle pulse length out of 4096
SERVO_MAX_LEFT_ARM = 450  # Max pulse length out of 4096 POSITION HAUTE

# HITEC HS-5645MG 50Hz HEAD
CHANNEL_HEAD = 2
SERVO_MIN_HEAD = 180  # Min pulse length out of 4096 POSITION BASSE
SERVO_MIDDLE_HEAD = 325  # Middle pulse length out of 4096
SERVO_MAX_HEAD = 450  # Max pulse length out of 4096 POSITION HAUTE

# TOWER PRO MG 90 60Hz
#CHANNEL_LEFT_HAND = 1
#SERVO_MIN_LEFT_HAND = 150  # Min pulse length out of 4096 POSITION BASSE
#SERVO_MIDDLE_LEFT_HAND = 370  # Middle pulse length out of 4096
#SERVO_MAX_LEFT_HAND = 590  # Max pulse length out of 4096 POSITION HAUTE

# TOWER PRO MG 90 50Hz
#CHANNEL_LEFT_HAND = 1
#SERVO_MIN_LEFT_HAND = 115  # Min pulse length out of 4096 POSITION BASSE
#SERVO_MIDDLE_LEFT_HAND = 300  # Middle pulse length out of 4096
#SERVO_MAX_LEFT_HAND = 490  # Max pulse length out of 4096 POSITION HAUTE

# TOWER PRO MG 92B 50Hz
CHANNEL_LEFT_HAND = 1
SERVO_MIN_LEFT_HAND = 150  # Min pulse length out of 4096 POSITION BASSE
SERVO_MIDDLE_LEFT_HAND = 320  # Middle pulse length out of 4096
SERVO_MAX_LEFT_HAND = 490  # Max pulse length out of 4096 POSITION HAUTE

pwm.setPWMFreq(50) # Set frequency to 50Hz

def upAndDownLeftArm(sleep = 2):
  #pwm.setPWMFreq(300) 
  pwm.setPWM(CHANNEL_LEFT_ARM, 0, SERVO_MIDDLE_LEFT_ARM)
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_LEFT_ARM, 0, SERVO_MAX_LEFT_ARM)
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_LEFT_ARM, 0, SERVO_MIDDLE_LEFT_ARM)
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_LEFT_ARM, 0, SERVO_MIN_LEFT_ARM)
  time.sleep(sleep)

def leftAndRightLeftHand(sleep = 2):
  #pwm.setPWMFreq(60) 
  pwm.setPWM(CHANNEL_LEFT_HAND, 0, SERVO_MIN_LEFT_HAND)
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_LEFT_HAND, 0, SERVO_MAX_LEFT_HAND)
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_LEFT_HAND, 0, SERVO_MIDDLE_LEFT_HAND)
  time.sleep(sleep)

def leftAndRightHead(sleep = 2):
  #pwm.setPWMFreq(300) 
  pwm.setPWM(CHANNEL_HEAD, 0, SERVO_MAX_HEAD)
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_HEAD, 0, SERVO_MIDDLE_HEAD)
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_HEAD, 0, SERVO_MIN_HEAD)
  time.sleep(sleep)
  pwm.setPWM(CHANNEL_HEAD, 0, SERVO_MIDDLE_HEAD)
  time.sleep(sleep)

# Tourne la main puis leve le bras...
leftAndRightLeftHand()
#time.sleep(2)
#upAndDownLeftArm()

#Tourne la tete
time.sleep(2)
leftAndRightHead()

#Pour positionner precisement le bras ou la main
#pwm.setPWM(CHANNEL_HEAD, 0, 325)

#for num in range(servoMin, servoMax):
#  pulselen = ((num * (servoMax - servoMin)) / 180) + servoMin
#  pwm.setPWM(0, 0, pulselen)

#while (True):
  # Change speed of continuous servo on channel O
  #upAndDownLeftArm()
  #time.sleep(4)
  #leftAndRightLeftHand()
  #pwm.setPWM(1, 0, servoMin)
  #time.sleep(2)
  #pwm.setPWM(1, 0, servoMax)
  #time.sleep(2)
  #pwm.setPWM(1, 0, servoMiddle)
  #time.sleep(2)